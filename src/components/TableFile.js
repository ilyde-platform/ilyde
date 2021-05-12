import React, { useState } from 'react';
import _ from "lodash";


const TableFile = ({columns, data, onRowClick}) => {
  if (data.length === 0) {
    return (
      <div className="font-m"></div>
    );
  }

  return (
    <div>
      <ul className="list-group list-group-flush">
      { data.map((d, i) => {
        const rowClassName = "list-group-item  align-items-center d-flex justify-content-start" + (d.is_dir ? " folder" : " file");
        return (
          <li key={i}
            className={rowClassName}
            onClick={() => onRowClick(d)}
          >
            { columns.map((col, j) => {
              const cell = d[col.id];
              if (!j){
                return (
                  <span key={j}>
                    {cell}
                  </span>
                );
              }
              else{
                return (
                  <span className="ml-auto" key={j}>
                    {cell}
                  </span>
                );
              }
            })}
          </li>
        );
      })}
      </ul>
    </div>
  );
}

export default TableFile;
