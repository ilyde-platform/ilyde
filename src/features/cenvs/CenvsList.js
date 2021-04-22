import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import TableCozy from '../../components/TableCozy';
import { selectAllCenvs } from './cenvsSlice';


export function CenvsList(props) {
  const cenvs = useSelector(selectAllCenvs);

  const options = {
    defaultSortCol: "name",
    defaultSortDir: "desc",
  };
  const columns = [
    {
      id: "name",
      headerText: "Name",
      sortable: true,
      type: "text",
      style: "normal",
    },{
      id: "deployment",
      headerText: "Deployment Only",
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
        data={cenvs.map((c) => {
          return {id: c.id, name: c.name, deployment: c.deployment ? "yes" : "No"}
        })}
        options={tableOptions}
      />
    </Fragment>
  );
}
