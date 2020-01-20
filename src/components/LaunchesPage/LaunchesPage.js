/**
 * Saga style Launches Page component which uses redux to dispatch
 * the api request
 *
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextFilter from "components/TextFilter";
import LaunchCard from "components/LaunchCard/";
import Loading from "components/Loading";

const styles = {
  layout: {
    width: "auto",
    marginLeft: "2vmin",
    marginRight: "2vmin"
  },
  button: {
    margin: "5px"
  }
};

function LaunchesPage(props) {
  const {
    launches,
    dispatchLoadLaunches,
    error,
    loading,
    // Limit launches loaded to default of 6
    // This will also indicate "Load More" button to load 6 more launches
    limit = 6
  } = props;

  const [textFilter, setTextFilter] = useState("");
  const [offset, setOffset] = useState(0);

  // Load launches on mount
  useEffect(() => {
    loadLaunches();
    // Explictly ensuring this only gets run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Loads launches. After first call it loads 6 more
   *
   * @param {Object} params optionally override params offset and limit
   */
  const loadLaunches = (params = {}) => {
    // Increase offset
    setOffset(offset + limit);
    // Dispatch load event
    dispatchLoadLaunches({ params: { offset, limit, ...params } });
  };

  /** Load More button event handler */
  const onLoadMore = () => {
    loadLaunches();
  };

  /** Filter launches based on available filters */
  const launchFilter = launch => {
    let { details, mission_name, launch_year } = launch;

    // Default to empty string if null
    details = details || "";

    return (
      mission_name.toLowerCase().includes(textFilter) ||
      launch_year.includes(textFilter) ||
      details.toLowerCase().includes(textFilter)
    );
  };

  const onFilterChange = event => {
    setTextFilter(event.target.value);
  };

  const { classes } = props;

  if (error) {
    return <Typography component="p">{error.message}</Typography>;
  }

  return (
    <div className={classes.layout}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {loading && <Loading />}
          <TextFilter
            label="Filter launches"
            onChange={e => onFilterChange(e)}
          />
        </Grid>

        {launches.filter(launchFilter).map(launch => (
          <LaunchCard {...launch} key={launch.flight_number} />
        ))}

        <Grid item xs={12}>
          <Button
            disabled={loading}
            variant="outlined"
            className={classes.button}
            onClick={onLoadMore}>
            Load More
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

LaunchesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LaunchesPage);
