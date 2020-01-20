/**
 * Actions for loading launches
 */

export const loadLaunchesStart = params => {
  return { type: "LOAD_LAUNCHES_START", ...params };
};
export const loadLaunchesSuccess = params => {
  return { type: "LOAD_LAUNCHES_SUCCESS", ...params };
};
export const loadLaunchesFailed = params => {
  return { type: "LOAD_LAUNCHES_FAILED", ...params };
};
export const loadLaunchesCancel = params => {
  return { type: "LOAD_LAUNCHES_CANCEL", ...params };
};
