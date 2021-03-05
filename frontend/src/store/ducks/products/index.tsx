import { Reducer } from 'redux';
import { ProductState, ProductsTypes } from './types';

const INITIAL_STATE: ProductState = {
  data: [],
  dataFilter: [],
  loading: false,
  error: false,
  productSelected: null,
};

const reducer: Reducer<ProductState>  = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsTypes.PRODUCTS_REQUEST: {
      return { ...state, loading: true };
    }
    case ProductsTypes.PRODUCTS_REQUEST_SUCCESS: {
      return { ...state, data: action.payload.data, dataFilter: action.payload.data, loading: false };
    }
    case ProductsTypes.PRODUCTS_REQUEST_FAILURE: {
      return { ...state, loading: false, error: true };
    }
    case ProductsTypes.PRODUCTS_REQUEST_ADD: {
      return { ...state, loading: true };
    }
    case ProductsTypes.PRODUCTS_REQUEST_ADD_SUCCESS: {
      const newProduct = action.payload.product;

      return { ...state, data: [...state.data, newProduct],  dataFilter: [...state.data, newProduct], loading: false };
    }
    case ProductsTypes.PRODUCTS_SELECTED_EDIT: {
      const selected = state.data.find(product => product._id === action.payload.id);

      return { ...state, productSelected: selected };
    }
    case ProductsTypes.PRODUCTS_REQUEST_EDIT: {
      return { ...state, loading: true };
    }
    case ProductsTypes.PRODUCTS_REQUEST_EDIT_SUCCESS: {
      const newData = state.data;
      const productIndex = state.data.findIndex(product => product._id === action.payload.product._id);
      newData[productIndex] = action.payload.product;

      return { ...state, data: newData, dataFilter: newData, loading: false, productSelected: action.payload.product};
    }
    case ProductsTypes.PRODUCTS_REQUEST_DELETE: {
      return { ...state, loading: true };
    }
    case ProductsTypes.PRODUCTS_REQUEST_DELETE_SUCCESS: {
      const newData = state.data.filter(product => product._id !== action.payload.id);

      return { ...state, data: newData, dataFilter: newData, loading: false };
    }
    case ProductsTypes.PRODUCTS_SEARCH: {
      const productsFiltered = state.dataFilter.filter((product) => {
        const itemData = `${product.name.toUpperCase()} ${product.description.toUpperCase()}`;
        const textData = action.payload.term.toUpperCase();
        return itemData.includes(textData);
      });

      return { ...state, data: productsFiltered };
    }
    default:
      return state;
  }
}

export default reducer;
