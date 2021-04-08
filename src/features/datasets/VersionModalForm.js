import React, { Fragment, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal  from '../../components/Modal';
import { DatasetsApi } from '../../services/ilyde';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';


export function VersionModalForm({datasetId, handleModalCancel, handleFormSubmitted}) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(files.concat(acceptedFiles));
  }, [files]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const filesPreview = files.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
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
      <section>
        <div {...getRootProps()}>
           <input {...getInputProps()} />
             {
               isDragActive ?
                 <p>Drop the files here ...</p> :
                 <p>Drag & drop some files here, or click to select files</p>
             }
        </div>
        <hr/>
        <aside>
          <h4>Files</h4>
          <ul>{filesPreview}</ul>
        </aside>
        <button className="secondary" onClick={handleModalCancel}>Cancel</button>
        <button type="button" className="primary" onClick={handleCreateVersion}>Create Version</button>
      </section>
    </Modal>
  );
}
