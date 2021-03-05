export enum ProductsTypes {
  PRODUCTS_REQUEST = '@products/REQUEST',
  PRODUCTS_REQUEST_SUCCESS = '@products/REQUEST_SUCCESS',
  PRODUCTS_REQUEST_FAILURE = '@products/REQUEST_FAILURE',
  PRODUCTS_REQUEST_ADD = '@products/REQUEST_ADD',
  PRODUCTS_REQUEST_ADD_SUCCESS = '@products/REQUEST_ADD_SUCCESS',
  PRODUCTS_SELECTED_EDIT = '@products/SELECTED_EDIT',
  PRODUCTS_REQUEST_EDIT = '@products/REQUEST_EDIT',
  PRODUCTS_REQUEST_EDIT_SUCCESS = '@products/REQUEST_EDIT_SUCCESS',
  PRODUCTS_REQUEST_DELETE = '@products/REQUEST_DELETE',
  PRODUCTS_REQUEST_DELETE_SUCCESS = '@products/REQUEST_DELETE_SUCCESS',
  PRODUCTS_SEARCH = '@products/SEARCH',
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  expiration_date: string;
  expiration_date_formatted: string;
  photo_name: string;
  photo_url: string;
  photo: Blob | File;
}

export interface ProductState {
  readonly data: Product[];
  readonly dataFilter: Product[];
  readonly loading: boolean;
  readonly error: boolean;
  readonly productSelected: Product | undefined | null;
}