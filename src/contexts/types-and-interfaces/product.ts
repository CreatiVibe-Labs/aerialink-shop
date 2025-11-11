export interface Translation {
  name: string;
  short_description: string | null;
  description: string | null;
  user_instruction: string | null;
}

export interface Translations {
  en: Translation;
  jp: Translation;
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface CategoryTranslations {
  en: { name: string };
  jp: { name: string };
}

export interface Category {
  id: number;
  translations: CategoryTranslations;
}

export interface Reviews {
  id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    name: string;
  };
}
export interface ProductAttribute {
  attribute_name: string;
  attribute_value: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: string;
  stock: number;
  attributes: ProductAttribute[];
}

export interface CategoryTranslation {
  name: string;
}

export interface Category {
  id: number;
  image: string;
  translations: {
    en: CategoryTranslation;
    jp: CategoryTranslation;
  };
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}
export interface Product {
  id: number;
  status: boolean;
  slug: string;
  title_en: boolean;
  title_jp: boolean;
  average_rating: number;
  reviews: Reviews[];
  images: ProductImage[];
  categories: Category[];
  variants: ProductVariant[];
  created_at : string
}

export interface Meta {
  current_page: number;
  last_page: number;
  total: number;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    meta: Meta;
  };
}
