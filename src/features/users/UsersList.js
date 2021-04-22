import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import TableCozy from '../../components/TableCozy';
import { selectAllUsers } from './usersSlice';
import _ from "lodash";

export function UsersList(props) {
  const users = useSelector(selectAllUsers);

  const options = {
    defaultSortCol: "name",
    defaultSortDir: "desc",
  };
  const columns = [
    {
      id: "username",
      headerText: "Username",
      sortable: true,
      type: "text",
      style: "normal",
    },
    {
      id: "first_name",
      headerText: "First Name",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "last_name",
      headerText: "Last Name",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "email",
      headerText: "Email",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "role",
      headerText: "Role",
      type: "text",
      sortable: true,
      style: "normal",
    }
  ]

  let tableOptions = options;
  const tableColumns = columns;

  return  (
    <Fragment>
      <TableCozy
        columns={tableColumns}
        data={users.map((u) => {
          return {
            id: u.id,
            username: u.username,
            first_name: _.capitalize(u?.first_name),
            last_name: _.capitalize(u?.last_name),
            email: u?.email,
            role: _.capitalize(u?.groups[0])
          }
        })}
        options={tableOptions}
      />
    </Fragment>
  );
}
