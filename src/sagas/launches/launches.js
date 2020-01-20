/**
 * Saga to watch for load launches actions and make request to Spacewatch API
 */

import { call, take, race, put, takeLeading } from "redux-saga/effects";

import { loadLaunchesSuccess, loadLaunchesFailed } from "actions/";

import spacexdata from "api/spacexdata";

export function* watchLoadLaunches() {
  // Only takes the first action and blocks until it is done
  yield takeLeading("LOAD_LAUNCHES_START", function*(action) {
    // Race between task completing and cancellation/failed
    yield race({
      task: call(loadLaunches, action),
      cancel: take([
        "LOAD_LAUNCHES_CANCEL",
        "LOAD_LAUNCHES_FAILED",
        "CANCEL_ALL"
      ])
    });
  });
}

export function* loadLaunches(action) {
  const { params } = action;

  try {
    const response = yield call(spacexdata.get, "launches", { params });

    yield put(loadLaunchesSuccess({ payload: response.data }));
  } catch (error) {
    yield put(
      loadLaunchesFailed({
        error: {
          message: error.message,
          status: error.response && error.response.status,
          statusText: error.response && error.response.statusText
        },
        ...action
      })
    );
  }
}
