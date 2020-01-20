/**
 * Root saga for all sagas
 */

import { all } from "redux-saga/effects";

import * as launches from "./launches/";

export default function*() {
  yield all([launches.rootSaga()]);
}
