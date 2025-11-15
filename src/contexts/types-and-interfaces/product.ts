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

export interface Size {
  size_name: string;
  size_value: string;
  size_value_jp?: string;
}

export interface VariantSizes {
  Edoma: Size[];
  Danchima: Size[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: string;
  stock: number;
  attributes: ProductAttribute[];
  sizes: VariantSizes;
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

export interface Colors {
  hex_code: string;
  id: number;
  name_en: string;
  name_jp: string;
}

export interface Product {
  id: number;
  status: boolean;
  slug: string;
  title_en: boolean;
  title_jp: boolean;
  net_weight_en: string;
  net_weight_jp: string;
  packing_en: string;
  packing_jp: string;
  packing_remarks_en: string;
  packing_remarks_jp: string;
  harmful_content_en: string;
  harmful_content_jp: string;
  usage_information_en: string;
  usage_information_jp: string;
  average_rating: number;
  reviews: Reviews[];
  images: ProductImage[];
  categories: Category[];
  variants: ProductVariant[];
  color: Colors;
  created_at : string;
  detailed_description_en: string;
  detailed_description_jp: string;
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
