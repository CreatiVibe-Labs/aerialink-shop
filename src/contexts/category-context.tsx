"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Meta, Product } from "./types-and-interfaces/product";
import api from "@/lib/api";

interface Category {
  id: number;
  translations: { en: { name: string }; jp: { name: string } };
}

interface State {
  categories: Category[];
  catLoading: boolean;

  allProducts: Product[];
  allMeta: Meta | null;
  allLoading: boolean;

  filteredProducts: Product[];
  filteredMeta: Meta | null;
  filterLoading: boolean;

  selectedCategory: number | null;
  selectedSort: string;
}

type Action =
  | { type: "CAT_START" }
  | { type: "CAT_SUCCESS"; payload: Category[] }
  | { type: "FETCH_ALL_START" }
  | { type: "FETCH_ALL_SUCCESS"; payload: { products: Product[]; meta: Meta } }
  | {
      type: "SET_FILTERS";
      payload: { category?: number | null; sort?: string };
    }
  | { type: "SORT_PRODUCTS" }
  | { type: "FILTER_LOADING_START" }
  | { type: "FILTER_LOADING_END" }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = {
  categories: [],
  catLoading: true,

  allProducts: [],
  allMeta: null,
  allLoading: true,

  filteredProducts: [],
  filteredMeta: null,
  filterLoading: false,

  selectedCategory: null,
  selectedSort: "latest",
};

interface CategoryContextValue {
  state: State;
  setCategory: (id: number | null) => void;
  setSort: (sort: string) => void;
  loadMore: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextValue>({
  state: initialState,
  setCategory: () => {},
  setSort: () => {},
  loadMore: async () => {},
});

function categoryReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CAT_START":
      return { ...state, catLoading: true };

    case "CAT_SUCCESS":
      return { ...state, catLoading: false, categories: action.payload };

    case "FETCH_ALL_START":
      return { ...state, allLoading: true };

    case "FETCH_ALL_SUCCESS":
      return {
        ...state,
        allLoading: false,
        allProducts: action.payload.products,
        allMeta: action.payload.meta,
        filteredProducts: action.payload.products,
        filteredMeta: action.payload.meta,
      };

    case "SET_FILTERS":
      return {
        ...state,
        selectedCategory: action.payload.category ?? state.selectedCategory,
        selectedSort: action.payload.sort ?? state.selectedSort,
      };

    case "FILTER_LOADING_START":
      return { ...state, filterLoading: true };

    case "FILTER_LOADING_END":
      return { ...state, filterLoading: false };

    case "SORT_PRODUCTS": {
      const sorted = [...state.filteredProducts]; // ✅ use const instead of let

      switch (state.selectedSort) {
        case "price_low":
          sorted.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case "price_high":
          sorted.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        default:
          sorted.sort(
            (a, b) =>
              new Date(b.created_at as any).getTime() -
              new Date(a.created_at).getTime()
          );
      }

      return {
        ...state,
        filteredProducts: sorted,
        filteredMeta: {
          ...state.allMeta!,
          total: sorted.length,
          current_page: 1,
          last_page: 1,
        },
      };
    }

    case "FETCH_ERROR":
      return { ...state, allLoading: false, filterLoading: false };

    default:
      return state;
  }
}

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = async () => {
    dispatch({ type: "CAT_START" });
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );

      let cats: any = [];

      if (res.data?.data?.categories) cats = res.data.data.categories;
      else if (res.data?.categories) cats = res.data.categories;
      else if (Array.isArray(res.data)) cats = res.data;
      else if (res.data?.data) cats = res.data.data;

      if (!Array.isArray(cats)) cats = [];

      dispatch({ type: "CAT_SUCCESS", payload: cats });
    } catch (err: any) {
      console.error("Categories error:", err);
      dispatch({ type: "CAT_SUCCESS", payload: [] });
    }
  };

  const fetchAllProducts = async (
    categoryId: number | null = null,
    page = 1,
    append = false
  ) => {
    dispatch({ type: "FETCH_ALL_START" });
    dispatch({ type: "FILTER_LOADING_START" });
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`;
      if (categoryId && categoryId !== null) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${categoryId}`;
      }

      const res = await api.get(url);
      const data = res.data.data || res.data;

      const payload = {
        products: append
          ? [...state.allProducts, ...data.products]
          : data.products,
        meta: data.meta,
      };

      dispatch({ type: "FETCH_ALL_SUCCESS", payload });
    } catch (err: any) {
      console.error("Products error:", err);
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch products" });
    } finally {
      dispatch({ type: "FILTER_LOADING_END" });
    }
  };

  const loadMore = async () => {
    if (state.allMeta && state.allMeta.current_page < state.allMeta.last_page) {
      await fetchAllProducts(
        state.selectedCategory,
        state.allMeta.current_page + 1,
        true
      );
    }
  };

  const setCategory = async (id: number | null) => {
    dispatch({ type: "SET_FILTERS", payload: { category: id } });
    if (id == null) {
      await fetchAllProducts(null, 1);
    } else {
      await fetchAllProducts(id, 1);
    }
  };

  const setSort = (sort: string) => {
    dispatch({ type: "SET_FILTERS", payload: { sort } });
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts(null, 1);
  }, []);

  useEffect(() => {
    if (!state.allLoading && state.filteredProducts.length > 0) {
      const timer = setTimeout(() => dispatch({ type: "SORT_PRODUCTS" }), 100);
      return () => clearTimeout(timer);
    }
  }, [state.selectedSort, state.filteredProducts, state.allLoading]);

  return (
    <CategoryContext.Provider value={{ state, setCategory, setSort, loadMore }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useCategory must be used within CategoryProvider");
  return context;
};
