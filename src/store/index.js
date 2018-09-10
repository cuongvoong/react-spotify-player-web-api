import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";

const initialState = {};

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : [])
];
// if (process.env.NODE_ENV !== "production") {
//   middleware.push(createLogger());
// }

const store = createStore(rootReducer, initialState, compose(...middleware));

export default store;
