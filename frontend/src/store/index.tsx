import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ProductState } from './ducks/products/types';

import rootReducer from './ducks/rooReducer';
import rootSaga from './ducks/rootSaga';

export interface AplicationState {
  products: ProductState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<AplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;