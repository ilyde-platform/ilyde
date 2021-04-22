import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  useHistory
} from "react-router-dom";
import { selectAllIdes } from './idesSlice';
import Jupyter from '../../assets/images/Jupyter.svg';
import JupyterLab from '../../assets/images/JupyterLab.svg';
import Vscode from '../../assets/images/Vscode.svg';
import RStudio from '../../assets/images/RStudio.svg';


export function IdeList(props) {
  const ides = useSelector(selectAllIdes);

  const mappings = {
    'Jupyter': { icon: Jupyter },
      'JupyterLab': { icon: JupyterLab },
      'Vscode': { icon: Vscode },
      'RStudio': { icon: RStudio }
  }

  const ideToHtml = (ide) => {
    return (
      <div className="col col-md-3" key={ide.id}>
        <img src={mappings[ide.name]["icon"]} className="img-thumbnail" alt={ide.title} width="150px" height="150px"/>
      </div>
    )
  }
  return  (
    <Fragment>
      <section className="content">
        <div className="row">
          {ides.map((ide) => {
            return ideToHtml(ide);
            })
          }
        </div>
      </section>
    </Fragment>
  );
}
