/**
 * Root saga for all launches related requests
 */

import { all } from "redux-saga/effects";

import { watchLoadLaunches } from "./launches";

export function* rootSaga() {
  yield all([watchLoadLaunches()]);
}
