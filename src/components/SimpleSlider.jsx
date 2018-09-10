import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {}
};

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.progress
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.progress !== prevProps.progress) {
      this.setState({ value: this.props.progress });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    const position = Math.floor((this.props.duration * value) / 100);
    this.props.onChangePosition(position);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Slider
          value={this.state.value}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSlider);
