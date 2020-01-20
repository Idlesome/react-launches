/**
 * Launches reducer for managing state changes to launches
 */

const initialState = {
  payload: [],
  error: null,
  loading: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOAD_LAUNCHES_START":
      return {
        ...state,
        loading: true
      };
    case "LOAD_LAUNCHES_SUCCESS":
      return {
        ...state,
        // Concatenate launches onto the end of current state
        payload: [...state.payload, ...action.payload],
        loading: false
      };
    // Reset state
    case "LOAD_LAUNCHES_FAILED":
      return {
        // With a view to prevent overwriting other state in this reducer
        ...state,
        error: action.error || {}
      };
    case "LOAD_LAUNCHES_CANCEL":
      return {
        // With a view to prevent overwriting other state in this reducer
        ...initialState
      };
    default:
      return state;
  }
}
