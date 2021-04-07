import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import TableCozy from '../../components/TableCozy';
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { selectAllDatasets } from './datasetsSlice';
import Modal from '../../components/Modal';

export function DatasetsSharedList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const datasets = useSelector(selectAllDatasets);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("-----", datasets);

  const title = "Shared Datasets";
  const goToDataset = (d) => {
    history.push(`/datasets/${d.id}`);
  }
  const handleClickDelete = (d) => {
    alert("clicked delete "+ d.id);
  }

  const options = {
    defaultSortCol: "create_at",
    defaultSortDir: "desc",
    onRowClick: goToDataset,
  };
  const columns = [
    {
      headerText: "Name",
      id: "name",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      headerText: "",
      id: "description",
      sortable: false,
      style: "small-grey",
      type: "text",
    },{
      headerText: "Version",
      id: "version",
      sortable: true,
      style: "normal",
      type: "text",
    },{
      buttonText: "Delete",
      headerText: "",
      id: "button_start",
      onButtonClick: handleClickDelete,
      sortable: false,
      style: "primary",
      type: "button",
    }
  ];

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

  return  (
    <Fragment>
      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)} title="New dataset">
          {/*
          <section>
            <p>
              Description of lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Mauris sed turpis sed ipsum vehicula bibendum imperdiet in orci. 
              In vel vestibulum nisi. Donec sagittis nunc id erat aliquam blandit.
            </p>
          </section>
          */}
          <section>
            <form>
              <div className="input-row">
                <label>
                  Label
                  <input type="text" name="name-a" id="name-a" />
                </label>
              </div>
              <div className="input-row">
                <label>
                  Label
                  <input type="text" name="name-b" id="name-b" />
                </label>
              </div>
              <hr />
              <div className="buttons-wrapper">
                <button className="secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <input type="submit" className="primary" value="Submit" />
              </div>
            </form>
          </section>
        </Modal>
      )}
      <section className="d-flex justify-content-end mt-4">
        <button type="button" className="primary" onClick={() => setModalOpen(true)}>New Dataset</button>
      </section>
      {/*
      <section className="content">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div className="ml-auto">
                <button type="button" className="primary" onClick={() => setModalOpen(true)}>New Dataset</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}
      <hr/>
      <TableCozy
        columns={tableColumns}
        data={datasets}
        options={tableOptions}
      />
    </Fragment>
  );
}
