import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams
} from "react-router-dom";
import { setContentTitle } from '../headerbar/headerbarSlice';
import { getIlydeApiConfiguration, capitalize } from '../../services/utils';
import { ModelapisApi } from '../../services/ilyde';
import { selectAllUsers } from '../users/usersSlice';
import _ from "lodash";


export function ModelapisDetail(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const {modelapisId} = useParams();
  const [modelapis, setModelapis] = useState({});
  const [invokeInput, setInvokeInput] = useState("{}");
  const [canInvoke, setCanInvoke] = useState(false);
  const [invokeOutput, setInvokeOutput] = useState("[]");

  const endpoint = `${window.location.origin}/modelapis/${modelapisId}/invocations`;
  const user = _.find(users, ["id", modelapis?.metadata?.owner]);

  useEffect(()=>{
    const apiConfig = getIlydeApiConfiguration();
    const modelapisApi = new ModelapisApi(apiConfig);

    modelapisApi.retrieveModelapi(modelapisId).then((response) => {
      setModelapis(response.data);
      if(response.data.state === 'RUNNING'){
        setCanInvoke(true);
      }
    });

    modelapisApi.signatureModelapi(modelapisId).then((response) => {
      if (!_.isEmpty(response.data)){
        const inputs = JSON.parse(response.data.inputs);
        const columns = inputs.map((c) => c.name);
        const signature = JSON.stringify({columns: columns, data: [[]]}, null, 4);
        setInvokeInput(signature);
      }

    });
  }, [modelapisId]);

  useEffect(() => {
    dispatch(setContentTitle({title: modelapis?.metadata?.name, subtitle: ""}));
  },[modelapis])

  const handleInvokeInputChange = (e) => {
    setInvokeInput(e.target.value);
  }

  const handleInvokeClick = () => {
    if (canInvoke){
      postData(endpoint, invokeInput).then(data => {
        setInvokeOutput(JSON.stringify(data));
      });
    }
  }

  return (
    <section className="content">
      <div className="input-row">
        <label>
          Endpoint
          <input
            type="text"
            readOnly
            value={endpoint}
          />
        </label>
      </div>
      <hr/>
      <div className="row">
        <div className="col col-md-4">
          <div>State: {modelapis?.state}</div>
          <div className="mb-2"></div>
          <div>Model: {modelapis?.spec?.model}</div>
          <div className="mb-2"></div>
          <div>Model stage: {modelapis?.spec?.stage}</div>
          <div className="mb-2"></div>
          <div>Model Version: {modelapis?.spec?.version}</div>
          <div className="mb-2"></div>
          <div>Created By: {_.capitalize(user.username)}</div>
          <div className="mb-2"></div>
          <div>Created At: {modelapis?.create_at}</div>
        </div>
        <div className="col col-md-8">
          Let's try!
          <div className="row">
            <div className="col col-md-6">
              <div className="input-row">
                <label>
                  Input
                  <textarea
                    type="text"
                    value={invokeInput}
                    onChange={handleInvokeInputChange}
                    cols="50"
                    rows="250"
                  >
                  </textarea>
                </label>
              </div>
              <div className="d-flex justify-content-between">
                <div className="ml-auto">
                  <button type="button" className="primary" onClick={handleInvokeClick}>Invoke</button>
                </div>
              </div>
            </div>
            <div className="col col-md-6">
              <div className="input-row">
                <label>
                  Output
                  <textarea
                    type="text"
                    value={invokeOutput}
                    readOnly
                    cols="50"
                    rows="150"
                  >
                  </textarea>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
     </section>
   );
}


async function postData(url = '', body = "{}") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: body
  });
  return response.json();
}
