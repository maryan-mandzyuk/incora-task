const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '84ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));