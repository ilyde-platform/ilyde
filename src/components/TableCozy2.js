/**
 * Creates a table
 *
 * @param {[]} columns - Array of objects defining each column (id, headerText, sortable, defaultSort)
 * @param {[]} data - Array of objects having as properties the column ids defined in previous parameter
 * @param {Object} propOptions - Options object (icon, defaultSortCol, defaultSortDir, onRowClick)
 *
 * NB: EITHER the rows are clickable    > options.onRowClick
 *     OR     the row contains buttons  > columns[n].type = "button", columns[n].onButtonClick
 *
 *     if both are present the buttons will prevail.

Example of props

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
......      type: "button",
    }
  ]
 */

import React, { useEffect, useState } from 'react';
import _ from "lodash";
import rarr from '../assets/images/rarr.svg';


const RowButton = ({text, style, callback}) => {
  const className = `button${style ? ` ${style} ml-3` : "ml3"}`;
  return (
    <a className={className} data-type="table" onClick={callback}>
      {text}
    </a>
  );
}


const TableCozy2 = ({columns, data, options}) => {

  const defaultOptions = {
    "icon": null,
    "defaultSortCol": columns[0].id,
    "defaultSortDir": "asc",
    "onRowClick": null,
  };
  options = Object.assign(defaultOptions, options);
  const [sortCol, setSortCol] = useState(options.defaultSortCol);
  const [sortDir, setSortDir] = useState(options.defaultSortDir);

  if (data.length === 0) {
    return (
      <div className="font-m">No items</div>
    );
  }

  const hasRowCallback = (typeof options.onRowClick === "function") ? true : false;
  const btnCols = columns.filter(col => col.type === "button");
  let buttonsAreValid = btnCols.length > 0;
  btnCols.forEach(btnCol => {
    if (btnCol.onButtonClick && typeof btnCol.onButtonClick !== "function") {
      throw `Button in column '${btnCol.id}' is missing a valid onButtonClick function`;
      buttonsAreValid = false;
    }
  });
  const textCols = columns.filter(col => col.type === "text");

  const rowsClickable = hasRowCallback && !buttonsAreValid;
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
        { textCols.map((col, i) => {
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
              <span>{col.headerText}</span>
            </div>
          );
        })}
        {buttonsAreValid &&
        <div key="actions"
            className="cell"
            onClick={null}>
          <span></span>
        </div>}
      </header>
      { sortedData.map((d, i) => {
        const rowClassName = "data-row" + (rowsClickable ? " clickable" : "");
        const rowCallback = rowsClickable
          ? () => {
            options.onRowClick(d);
          }
          : null;
        return (
          <div key={i}
            className={rowClassName}
            onClick={rowCallback}
          >
            { textCols.map((col, j) => {
              const cell = d[col.id];
              return (
                <div className="cell" data-style={col.style} key={j}>
                  {cell}
                </div>
              );
            })}
            {buttonsAreValid && (
              <div className="cell arrow" key="actions">
                {btnCols.map((col, j) => {
                  const buttonCallback = () => {
                    col.onButtonClick(d);
                  }
                  return (<RowButton key={j} text={col.buttonText} style={col.style} callback={buttonCallback} />);
                })
                }
              </div>
            )}
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

export default TableCozy2;
