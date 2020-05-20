import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './features/rootReducer';
import rootSaga from './features/rootSaga';
 
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware(), 
  sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
