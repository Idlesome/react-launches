import { expectSaga } from "redux-saga-test-plan";

import { loadLaunchesStart, loadLaunchesSuccess } from "actions/";
import { watchLoadLaunches } from "./launches";
import reducer from "reducers/";

import spacexdata from "api/spacexdata";

describe("Launches saga", () => {
  const mockData = {
    data: [{ test: "xyz" }]
  };

  const action = {
    params: {
      limit: 6,
      offset: 0
    }
  };
  const provide = {
    call(effect, next) {
      // Check for the API call to return fake value
      if (effect.fn === spacexdata.get) {
        return mockData;
      }

      // Allow Redux Saga to handle other `call` effects
      return next();
    }
  };

  it("sets state correctly through it's reducer", () => {
    return (
      expectSaga(watchLoadLaunches)
        .withReducer(reducer)
        .provide(provide)
        // Dispatch an initial start action
        .dispatch(loadLaunchesStart(action))
        .hasFinalState({
          launches: {
            payload: mockData.data,
            loading: false,
            error: null
          }
        })
        // Set run timeout because this saga is a watcher so it's
        // infinite
        .silentRun(200)
    );
  });

  it("responds with a success action when triggered", () => {
    return (
      expectSaga(watchLoadLaunches)
        .withReducer(reducer)
        .provide(provide)
        // Assert that we will get a success action back
        .put.actionType(loadLaunchesSuccess().type)
        // Dispatch an initial start action
        .dispatch(loadLaunchesStart(action))
        // Set run timeout because this saga is a watcher so it's
        // infinite
        .silentRun(200)
    );
  });
});
