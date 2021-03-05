import { action } from 'typesafe-actions';
import { ProductsTypes, Product } from './types';

export const requestProducts = () => action(ProductsTypes.PRODUCTS_REQUEST);

export const successProducts = (data: Product[]) =>
  action(ProductsTypes.PRODUCTS_REQUEST_SUCCESS, { data });

export const failureProducts = () =>
  action(ProductsTypes.PRODUCTS_REQUEST_FAILURE);

export const productRequestAdd = (product: Product) =>
  action(ProductsTypes.PRODUCTS_REQUEST_ADD, { product });

export const productRequestAddSuccess = (product: Product) => 
  action(ProductsTypes.PRODUCTS_REQUEST_ADD_SUCCESS, { product });

export const productSelectedEdit = (id: string) =>
  action(ProductsTypes.PRODUCTS_SELECTED_EDIT, { id });

export const productRequestEdit = (id: string, product: Product) =>
  action(ProductsTypes.PRODUCTS_REQUEST_EDIT, { id, product });

export const productRequestEditSuccess = (product: Product) =>
  action(ProductsTypes.PRODUCTS_REQUEST_EDIT_SUCCESS, { product });

export const productRequestDelete = (id: string) =>
  action(ProductsTypes.PRODUCTS_REQUEST_DELETE, { id });

export const productRequestDeleteSuccess = (id: string) =>
  action(ProductsTypes.PRODUCTS_REQUEST_DELETE_SUCCESS, { id });

export const productSearch = (term: string) =>
  action(ProductsTypes.PRODUCTS_SEARCH, { term });