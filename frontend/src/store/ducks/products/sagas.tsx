import { call, put } from 'redux-saga/effects';
import { Product } from './types';
import {
   successProducts,
   failureProducts,
   productRequestAddSuccess,
   productRequestEditSuccess,
   productRequestDeleteSuccess,
} from './actions';
import api from '../../../services/api';

export function* getProducts() {
   try {
      const { data } = yield call(api.get, '/products');
      yield put(successProducts(data));
   } catch (e) {
      yield put(failureProducts());
   }
}

interface payloadProps {
   payload: {
      id: string | null;
      product: Product;
   };
}

export function* newProduct(props: payloadProps) {
   try {
      const { product } = props.payload;

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', String(product.price));
      formData.append('expiration_date', product.expiration_date);
      formData.append('photo', product.photo);

      const { data } = yield call(api.post, '/products', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
      yield put(productRequestAddSuccess(data));
   } catch (e) {
      yield put(failureProducts());
   }
}

export function* editProduct(props: payloadProps) {
   try {
      const { id, product } = props.payload;

      const { data } = yield call(api.put, `/products/${id}`, product);
      yield put(productRequestEditSuccess(data));
   } catch (e) {
      yield put(failureProducts());
   }
}

export function* deleteProduct(props: payloadProps) {
   try {
      const { id } = props.payload;

      yield call(api.delete, `/products/${id}`);
      yield put(productRequestDeleteSuccess(String(id)));
   } catch (e) {
      yield put(failureProducts());
   }
}