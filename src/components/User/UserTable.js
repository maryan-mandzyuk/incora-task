import React, { useEffect } from 'react';
import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { fetchUsers } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { UserItem } from './UserItem';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable = ({ fetchUsers, userData }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!userData || userData.loading) {
    return (<CircularProgress />)
  }
  const tableTitles = ['Nickname', 'Email', 'Website', 'Actions'];
  const tableHeadRows = (
    <>
      <TableCell>Name</TableCell>
      {tableTitles.map((title) => <TableCell align="right">{title}</TableCell>)}
    </>
  )
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadRows}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData &&
            userData.users && userData.users.map((user) => (
              <UserItem user={user} />
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