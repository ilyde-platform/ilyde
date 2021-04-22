import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { selectAllDatasets } from './datasetsSlice';
import Icon  from '../../components/Icon';
import { DatasetModalForm } from './DatasetModalForm';


export function DatasetsSharedList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const datasets = useSelector(selectAllDatasets);
  const [modalOpen, setModalOpen] = useState(false);

  const title = "Shared Datasets";
  const goToDataset = (d) => {
    history.push(`/datasets/${d.id}`);
  }

  const options = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: goToDataset,
  };
  const columns = [
    {
      id: "name",
      headerText: "Name",
      sortable: true,
      type: "text",
      style: "normal",
    },{
      id: "description",
      headerText: "",
      sortable: false,
      type: "text",
      style: "small-grey",
    },{
      id: "version",
      headerText: "Version",
      type: "text",
      sortable: true,
      style: "normal",
    }
  ]

  let tableOptions = options;
  const tableColumns = columns;

  useEffect(() => {
    dispatch(setContentTitle({title: title, subtitle: datasets.length + ' items'}));
  }, [datasets, title]);

  /*useEffect(() => {
    let mounted = true;
    const apiConfig = getIlydeApiConfiguration();
    const datasetsApi = new DatasetsApi(apiConfig);
    const body = {"query":{"scope": "Global", "project": ""}};
    datasetsApi.listDatasets(body).then((result) => {
      console.log(result.data);
      setDatasets(result.data);
    });

    return () => {
      mounted = false;
    }
  }, []);*/

  const datasetFormModal = (
    <DatasetModalForm handleModalCancel={() => setModalOpen(false)} handleFormSubmitted={() => setModalOpen(false)}>
    </DatasetModalForm>);

  return  (
    <Fragment>
      {modalOpen && datasetFormModal}
      <section className="content">
        <div className="d-flex justify-content-between">
          <div className="ml-auto">
            <button type="button" className="primary" onClick={() => setModalOpen(true)}>+Dataset</button>
          </div>
        </div>
      </section>
      <hr/>
      <TableCozy
        columns={tableColumns}
        data={datasets}
        options={tableOptions}
      />
    </Fragment>
  );
}
