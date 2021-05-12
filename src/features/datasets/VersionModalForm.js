import React, { Fragment, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal  from '../../components/Modal';
import { DatasetsApi } from '../../services/ilyde';
import { formatBytes } from './DatasetDetail';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';


export function VersionModalForm({datasetId, handleModalCancel, handleFormSubmitted}) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(files.concat(acceptedFiles));
  }, [files]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const filesPreview = files.map(file => (
    <li key={file.name}>
      <span className="mr-2">{file.name}</span>
       -
      <span className="ml-2">{formatBytes(file.size)}</span>
    </li>
  ));

  const handleCreateVersion = (event) => {
    if (files.length){
      const apiConfig = getIlydeApiConfiguration();
      const datasetsApi = new DatasetsApi(apiConfig);
      datasetsApi.createDatasetVersion(files, datasetId).then((response) => {
        setFiles([]);
        handleFormSubmitted(response.data);
      });
    }
  }

  return (
    <Modal closeModal={handleModalCancel} title="Upload Files">
      <div {...getRootProps()}>
         <input {...getInputProps()} />
           {
             isDragActive ?
               <p>Drop the files here ...</p> :
               <p>Drag and drop some files here, or click to select files</p>
           }
      </div>
      <hr/>
      <div>
        <ul>{filesPreview}</ul>
      </div>
      <div className="mb-5"></div>
      <div className="buttons-wrapper">
        <button className="secondary" onClick={handleModalCancel}>Cancel</button>
        <button type="button" className="primary" onClick={handleCreateVersion}>Upload</button>
      </div>
    </Modal>
  );
}
