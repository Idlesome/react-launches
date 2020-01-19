import React from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  flickerImg: {
    height: 240,
    backgroundSize: "contain",
    margin: "2vmin"
  },
  missionPatchImg: {
    height: 100,
    backgroundSize: "contain",
    margin: "2vmin"
  },
  noLaunchImgAvailable: {
    textAlign: "center"
  },
  noMissionPatchImgAvailable: {
    textAlign: "center"
  },
  layout: {
    width: "auto",
    marginLeft: "2vmin",
    marginRight: "2vmin"
  },
  filterLaunchField: {
    marginLeft: "2vmin",
    marginRight: "2vmin",
    width: 200
  },
  button: {
    margin: "5px"
  }
};

class Launches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      error: null,
      launchFilter: "",
      offset: 0
    };

    // Limit launches loaded to 6
    // This will also indicate "Load More" button to load 6 more launches
    this.limit = 6;
  }

  componentDidMount() {
    axios
      .get("https://api.spacexdata.com/v3/launches?limit=" + this.limit)
      .then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  handleChange = event => {
    this.setState({
      launchFilter: event.target.value
    });
  };

  // Event to load more launches
  loadMore = () => {
    axios
      .get(
        "https://api.spacexdata.com/v3/launches?limit=" +
          this.limit +
          "&offset=" +
          (this.state.offset + this.limit)
      )
      .then(result => {
        this.setState({
          // Append new data onto current data
          data: this.state.data.concat(result.data),
          isLoading: false,
          offset: this.state.offset + this.limit
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  };

  render() {
    const { isLoading, data, error, launchFilter } = this.state;
    const { classes } = this.props;

    if (error) {
      return <Typography component="p">{error.message}</Typography>;
    }

    if (isLoading) {
      return <Typography component="p">Loading</Typography>;
    }

    return (
      <div className={classes.layout}>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <TextField
              id="launch-filter"
              label="Filter launches"
              type="filter"
              className={classes.filterLaunchField}
              margin="normal"
              onChange={this.handleChange}
            />
          </Grid>

          {data
            .filter(launch => {
              let l = launch;
              if (l.details == null) {
                l.details = "";
              }
              return (
                l.mission_name.toLowerCase().includes(launchFilter) ||
                l.launch_year.includes(launchFilter) ||
                l.details.toLowerCase().includes(launchFilter)
              );
            })
            .map(launch => (
              <Grid item sm={4} xs={12} key={launch.flight_number}>
                <Card>
                  {launch.links.flickr_images.length > 0 ? (
                    <CardMedia
                      className={classes.flickerImg}
                      image={launch.links.flickr_images[0]}
                      title="Launch Image"
                    />
                  ) : (
                    <Typography
                      className={classes.noLaunchImgAvailable}
                      component="p">
                      No launch image available
                    </Typography>
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {launch.mission_name} - {launch.launch_year}
                    </Typography>
                    <Typography component="p">{launch.details}</Typography>
                  </CardContent>
                  {launch.links.mission_patch_small != null ? (
                    <CardMedia
                      className={classes.missionPatchImg}
                      image={launch.links.mission_patch_small}
                      title="Mission Patch"
                    />
                  ) : (
                    <Typography
                      className={classes.noMissionPatchImgAvailable}
                      component="p">
                      No mission patch image available
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}

          <Grid item xs={12}>
            <Button
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

Launches.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Launches);
