/**
 * Creates a table
 *
 * @param {[]} columns - Array of objects defining each column (id, text, sortable, defaultSort)
 * @param {[]} data - Array of objects having as properties the column ids defined in previous parameter
 * @param {Object} propOptions - Options object (icon, defaultSortCol, defaultSortDir, onRowClick)
 *
 */

import React, { useEffect, useState } from 'react';
import _ from "lodash";
import rarr from '../assets/images/rarr.svg';

const TableCozy = ({columns, data, options}) => {

  const defaultOptions = {
    "icon": null,
    "defaultSortCol": columns[0].id,
    "defaultSortDir": "asc",
    "onRowClick": null,
  };
  options = Object.assign(defaultOptions, options);
  const [sortCol, setSortCol] = useState(options.defaultSortCol);
  const [sortDir, setSortDir] = useState(options.defaultSortDir);
  const rowsClickable = (typeof options.onRowClick === "function") ? true : false;
  const sortedData = _.orderBy(data, [sortCol], [sortDir]);
  const handleSortClick = (id) => {
    if (sortCol !== id) {
      setSortCol(id);
      setSortDir("asc");
    } else {
      setSortDir((sortDir === "asc") ? "desc" : "asc");
    }
  }

  return (
    <div className="ilyde_component-table-cozy">
      <header>
        { columns.map((col, i) => {
          let className = "cell";
          if (col.sortable) {
            className += " sortable"
          };
          if (col.sortable && (col.id === sortCol)) {
            className += (sortDir === "asc") ? " sorted-asc" : " sorted-desc";
          };
          const callback = (col.sortable) ? () => { handleSortClick(col.id); } : null;
          return (
            <div key={col.id}
              className={className}
              onClick={callback}
            >
              <span>{col.text}</span>
            </div>
          );
        })}
      </header>
      { sortedData.map((d, i) => {
        const rowClassName = "data-row" + (rowsClickable ? " clickable" : "");
        const callback = (options.onRowClick)
          ? () => {
            options.onRowClick(d);
          }
          : null;
        return (
          <div key={i}
            className={rowClassName}
            onClick={callback}
          >
            { columns.map((col, j) => {
              const cell = d[col.id];
              return (
                <div className="cell" data-style={col.style} key={j}>
                  {cell}
                </div>
              );
            })}
            { rowsClickable && (
              <div className="cell arrow" key={"arrow"}>
                <img src={rarr} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TableCozy;
