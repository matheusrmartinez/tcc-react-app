import CircularProgress from '@material-ui/core/CircularProgress';
import { StyleRules, withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles: StyleRules = {
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  }
};

interface IProps {
  classes: any;
  size?: number;
}

const Loader = ({ classes, size }: IProps) => (
  <div className={classes.root}>
    <CircularProgress size={size ? size : 50} />
  </div>
);

export default withStyles(styles)(Loader);
