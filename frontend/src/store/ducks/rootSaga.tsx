import { all, takeLatest } from 'redux-saga/effects';

import { ProductsTypes } from './products/types';
import { getProducts, newProduct, editProduct, deleteProduct } from './products/sagas';

export default function* rootSaga(): any {
  return yield all([
    takeLatest(ProductsTypes.PRODUCTS_REQUEST, getProducts),
    takeLatest<any>(ProductsTypes.PRODUCTS_REQUEST_ADD, newProduct),
    takeLatest<any>(ProductsTypes.PRODUCTS_REQUEST_EDIT, editProduct),
    takeLatest<any>(ProductsTypes.PRODUCTS_REQUEST_DELETE, deleteProduct),
  ]);
}