import React, { useEffect } from 'react';
import { Button, CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { fetchUsers } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable = ({ fetchUsers, userData }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!userData || userData.loading) {
    return (<CircularProgress />)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData &&
            userData.users && userData.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.website}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => history.push(`/posts/${user.id}`)} color="primary" variant="contained">
                    Posts
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    userData: user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable);