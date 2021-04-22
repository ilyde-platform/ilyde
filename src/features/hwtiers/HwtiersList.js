import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import TableCozy from '../../components/TableCozy';
import { selectAllHwtiers } from './hwtiersSlice';
import _ from "lodash";

export function HwtiersList(props) {
  const hwtiers = useSelector(selectAllHwtiers);

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
    },
    {
      id: "cores",
      headerText: "CPUs",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "memory",
      headerText: "RAM",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "gpu",
      headerText: "GPUs",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "deployment",
      headerText: "Deployment Tier",
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
        data={hwtiers.map((hw) => {
          return {
            id: hw.id,
            name: _.capitalize(hw.name),
            deployment: hw.deployment ? "yes" : "No",
            cores: hw.cores + "m",
            memory: hw.memory + "Mb",
            gpu: hw.gpu + "Mb"
          }
        })}
        options={tableOptions}
      />
    </Fragment>
  );
}

export function HwtiersListExtended(props) {
  const hwtiers = useSelector(selectAllHwtiers);

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
    },
    {
      id: "cores",
      headerText: "CPUs",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "memory",
      headerText: "RAM",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "gpu",
      headerText: "GPUs",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "instancegroup",
      headerText: "Instance Group",
      type: "text",
      sortable: true,
      style: "normal",
    },
    {
      id: "deployment",
      headerText: "Deployment Tier",
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
        data={hwtiers.map((hw) => {
          return {
            id: hw.id,
            name: _.capitalize(hw.name),
            deployment: hw.deployment ? "yes" : "No",
            cores: hw.cores + "m",
            memory: hw.memory + "Mb",
            gpu: hw.gpu + "Mb",
            instancegroup: hw.instancegroup
          }
        })}
        options={tableOptions}
      />
    </Fragment>
  );
}
