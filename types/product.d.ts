interface GetProductById {
  code: string;
  errors: any[]; // Not documented
  product: Product;
  result: {
    id: string;
    lc_name: string;
    name: string;
  };
  status: string;
  warnings: any[];
}

interface Product {
  _id: string;
  _keywords: string[];
  allergens: string;
  allergens_from_ingredients: string;
  allergens_from_user: string;
  allergens_hierarchy: string[];
  allergens_tags: string[];
  brands: string;
  brands_tags: string[];
  creator: string;
  id: string;
  image_url: string;
  ingredients: IngredientGroup[];
  ingredients_original_tags: string[];
  ingredients_tags: string[];
  ingredients_text: string;
  ingredients_text_fr: string;
  lang: string;
  product_name: string;
  product_name_en: string;
  product_name_fr: string;
  removed_countries_tags: string[];
  selected_images: SelectedImage;
  traces: string;
  traces_from_ingredients: string;
  traces_tags: string[];
  unique_scans_n: number;
  unknown_ingredients_n: number;
}

interface IngredientGroup {
  id: string;
  ingredients: Ingredient[];
  percent_estimate: number;
  percent_max: number;
  percent_min: number;
  processing: number;
  text: string;
  vegan: string;
  vegetarian: string;
}

interface Ingredient {
  id: string;
  percent_estimate: number;
  percent_max: number;
  percent_min: number;
  text: string;
  vegan: string;
  vegetarian: string;
}

interface ImageSrcObj {
  en?: string;
  fr: string;
}

interface SelectedImage {
  front: {
    display: ImageSrcObj;
    small: ImageSrcObj;
    thumb: ImageSrcObj;
  }

  ingredients: {
    display: ImageSrcObj;
    small: ImageSrcObj;
    thumb: ImageSrcObj;
  }

  nutrition: {
    display: ImageSrcObj;
    small: ImageSrcObj;
    thumb: ImageSrcObj;
  }

  packaging: {
    display: ImageSrcObj;
    small: ImageSrcObj;
    thumb: ImageSrcObj;
  }
}