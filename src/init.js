import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers/";
import rootSaga from "./sagas/";

const production = process.env.NODE_ENV === "production";

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = production
    ? compose(...enhancers)
    : devCompose(...enhancers);
  // : composeWithDevTools(...enhancers);

  const store = createStore(reducers, preloadedState, composedEnhancers);
  sagaMiddleware.run(rootSaga);

  // if (!production && module.hot) {
  // module.hot.accept("./reducers", () => store.replaceReducer(reducers));
  // }

  return store;
}
