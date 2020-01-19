/**
 * Functional component version of LaunchesContainer. Decided to go with
 * a class based component to support testing state and API calls from
 * within the component. Usually I would use redux sagas for API calls.
 *
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextFilter from "components/TextFilter";
import LaunchCard from "components/LaunchCard/";
import Loading from "components/Loading";

const SPACEWATCH_LAUNCHES_ENDPOINT = "https://api.spacexdata.com/v3/launches";

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

function LaunchesContainer(props) {
  const [loading, setLoading] = useState(null);
  const [launches, setLaunches] = useState([]);
  const [error, setError] = useState(null);
  const [textFilter, setTextFilter] = useState("");
  const [offset, setOffset] = useState(0);

  // Limit launches loaded to default of 6
  // This will also indicate "Load More" button to load 6 more launches
  const { limit = 6 } = props;

  // Load launches on mount
  useEffect(() => {
    loadLaunches();
    // Explictly ensuring this only gets run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLaunches = (params = {}) => {
    setLoading(true);
    axios
      .get(SPACEWATCH_LAUNCHES_ENDPOINT, {
        params: {
          limit,
          ...params
        }
      })
      .then(result => {
        // Append new data onto current data
        setLaunches(launches.concat(result.data));
        setLoading(false);
        // Increase offset
        setOffset(offset + limit);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const loadMore = () => {
    loadLaunches({ offset: offset + limit });
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
            onClick={loadMore}>
            Load More
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

LaunchesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LaunchesContainer);
