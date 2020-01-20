/**
 * Container, api manager and layout for displaying a list of SpaceX launches
 */

import React from "react";
import PropTypes from "prop-types";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TextFilter from "components/TextFilter";
import LaunchCard from "components/LaunchCard/";
import Loading from "components/Loading";

const SPACEWATCH_LAUNCHES_API = "https://api.spacexdata.com/v3/launches";

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

// Write tests, prop types, and document prop types
// and components
class LaunchesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      launches: [],
      error: null,
      textFilter: "",
      offset: 0
    };

    // Limit launches loaded to 6
    // This will also indicate "Load More" button to load 6 more launches
    this.limit = 6;
  }

  componentDidMount() {
    this.loadLaunches();
  }

  loadLaunches = (params = {}) => {
    this.setState(
      {
        loading: true
      },
      () => {
        axios
          .get(SPACEWATCH_LAUNCHES_API, {
            params: { limit: this.limit, ...params }
          })
          .then(result => {
            this.setState({
              // Append new data onto current data
              launches: this.state.launches.concat(result.data),
              loading: false,
              // Increase offset
              offset: this.state.offset + this.limit
            });
          })
          .catch(error =>
            this.setState({
              error,
              loading: false
            })
          );
      }
    );
  };

  loadMore = () => {
    this.loadLaunches({ offset: this.state.offset + this.limit });
  };

  /** Filter launches based on available filters */
  launchFilter = launch => {
    const { textFilter } = this.state;

    let { details, mission_name, launch_year } = launch;

    // Default to empty string if null
    details = details || "";

    return (
      mission_name.toLowerCase().includes(textFilter) ||
      launch_year.includes(textFilter) ||
      details.toLowerCase().includes(textFilter)
    );
  };

  onFilterChange = event => {
    this.setState({
      textFilter: event.target.value
    });
  };

  render() {
    const { loading, launches, error } = this.state;
    const { classes } = this.props;

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
              onChange={this.onFilterChange}
            />
          </Grid>

          {launches.filter(this.launchFilter).map(launch => (
            <LaunchCard {...launch} key={launch.flight_number} />
          ))}

          <Grid item xs={12}>
            <Button
              disabled={loading}
              variant="outlined"
              className={classes.button}
              onClick={this.loadMore}>
              Load More
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LaunchesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LaunchesPage);
