/**
 * A basic Card that displays SpaceX launch details including:
 * - Flickr launch image if available,
 * - Mission patch image,
 * - Mission name
 * - Launch year
 */
import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
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
  }
});

function LaunchCard(props) {
  const { links, mission_name, launch_year, details } = props;

  const classes = useStyles();

  return (
    <Grid item sm={4} xs={12}>
      <Card>
        {links.flickr_images.length > 0 ? (
          <CardMedia
            className={classes.flickerImg}
            image={links.flickr_images[0]}
            title="Launch Image"
          />
        ) : (
          <Typography className={classes.noLaunchImgAvailable} component="p">
            No launch image available
          </Typography>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {mission_name} - {launch_year}
          </Typography>
          <Typography component="p">{details}</Typography>
        </CardContent>
        {links.mission_patch_small !== null ? (
          <CardMedia
            className={classes.missionPatchImg}
            image={links.mission_patch_small}
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
  );
}
LaunchCard.propTypes = {
  /** links object from SpaceX API */
  links: PropTypes.shape({
    /** Mission patch image URL */
    mission_patch_small: PropTypes.string,
    /** Array of Flickr launch images URL. Only the first is used */
    flickr_images: PropTypes.array
  }),

  /** Mission name */
  mission_name: PropTypes.string.isRequired,
  /** Year of launch */
  launch_year: PropTypes.string.isRequired,
  /** Extra details of launch */
  details: PropTypes.string
};

export default LaunchCard;
