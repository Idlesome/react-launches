/**
 * Launches container to manage redux state and actions
 */

import { connect } from "react-redux";

import { loadLaunchesStart } from "actions/";
import { getLaunches } from "selectors/launches";

import LaunchesPage from "components/LaunchesPage";

const mapStateToProps = state => ({
  launches: getLaunches(state),
  error: state.launches.error,
  loading:
    state.launches.loading === true ||
    // null indicates initial state
    state.launches.loading === null
});
const mapDispatchToProps = {
  dispatchLoadLaunches: loadLaunchesStart
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchesPage);
