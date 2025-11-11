"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Meta, Product, ProductResponse } from "./types-and-interfaces/product";
import api from "@/lib/api";

/* -------------------------------------------------
   1. STATE & ACTION TYPES
------------------------------------------------- */
interface State {
  products: Product[];
  meta: Meta | null;
  loading: boolean;
  error: string | null;

  // ---- single product ----
  product: Product | null;
  productLoading: boolean;
  productError: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { products: Product[]; meta: Meta } }
  | { type: "FETCH_ERROR"; payload: string }
  // ---- single product actions ----
  | { type: "FETCH_PRODUCT_START" }
  | { type: "FETCH_PRODUCT_SUCCESS"; payload: Product }
  | { type: "FETCH_PRODUCT_ERROR"; payload: string };

const initialState: State = {
  products: [],
  meta: null,
  loading: true,
  error: null,

  product: null,
  productLoading: false,
  productError: null,
};

/* -------------------------------------------------
   2. CONTEXT
------------------------------------------------- */
interface ProductContextValue {
  state: State;
  fetchProducts: (page?: number) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextValue>({
  state: initialState,
  fetchProducts: async () => {},
  fetchProduct: async () => {},
});

/* -------------------------------------------------
   3. REDUCER
------------------------------------------------- */
function productReducer(state: State, action: Action): State {
  switch (action.type) {
    // ----- LIST -----
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        meta: action.payload.meta,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    // ----- SINGLE -----
    case "FETCH_PRODUCT_START":
      return {
        ...state,
        productLoading: true,
        productError: null,
        product: null,
      };
    case "FETCH_PRODUCT_SUCCESS":
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case "FETCH_PRODUCT_ERROR":
      return {
        ...state,
        productLoading: false,
        productError: action.payload,
      };

    default:
      return state;
  }
}

/* -------------------------------------------------
   4. PROVIDER
------------------------------------------------- */
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // ---- LIST ----
  const fetchProducts = async (page = 1) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`
      );
      if (res.status !== 200) throw new Error(`HTTP error ${res.status}`);
      const data: ProductResponse = res.data;

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          products: data.data.products,
          meta: data.data.meta,
        },
      });
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // ---- SINGLE ----
  // Inside ProductProvider component
  const fetchProduct = useCallback(async (id: string) => {
    dispatch({ type: "FETCH_PRODUCT_START" });
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${id}`
      );
      if (res.status !== 200) throw new Error(`HTTP error ${res.status}`);
      const product: Product = res.data.data.product;

      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: product });
    } catch (err: any) {
      dispatch({ type: "FETCH_PRODUCT_ERROR", payload: err.message });
    }
  }, []); // <-- memoized

  // Load the list on mount (keep your original behaviour)
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ state, fetchProducts, fetchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

/* -------------------------------------------------
   5. HOOK
------------------------------------------------- */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within ProductProvider");
  return context;
};
