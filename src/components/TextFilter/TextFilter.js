/**
 * Basic material text input field that allows for customisation of
 * label and input change event
 */
import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  marginLeft: "2vmin",
  marginRight: "2vmin",
  width: 200
});

function TextFilter(props) {
  const { onChange, label } = props;

  const classes = useStyles();

  return (
    <TextField
      label={label}
      type="filter"
      className={classes.root}
      margin="normal"
      onChange={onChange}
    />
  );
}
TextFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default TextFilter;
