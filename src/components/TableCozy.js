/**
 * Creates a table
 *
 * @param {[]} columns - Array of objects defining each column (id, text, sortable, defaultSort)
 * @param {[]} data - Array of objects having as properties the column ids defined in previous parameter
 * @param {Object} propOptions - Options object (icon, defaultSortCol, defaultSortDir, onRowClick)
 *
 * @example
 *
 *     foo('hello')
 */

// import { IsEmpty, Map } from "react-lodash"
import rarr from '../assets/images/rarr.svg';

function TableCozy ({columns, data, options}) {
  const defaultOptions = {
    "icon": null,
    "defaultSortCol": columns[0].id,
    "defaultSortDir": "asc",
    "onRowClick": null,
  };
  options = Object.assign(defaultOptions, options);
  const rowsClickable = (typeof options.onRowClick === "function") ? true : false;

  // const sortedData = 

  // if (rowsClickable) {
  //   columns.push({

  //   });
  // }

  return (
    <div className="ilyde_component-table-cozy">
      <header>
        { columns.map((col, i) => {
          const className = "cell" + (col.sortable ? " sortable" : "");
          return (
            <div className={className} key={col.id}>
              {col.text}
            </div>
          );
        })}
      </header>
      { data.map((d, i) => {
        const rowClassName = "data-row" + (rowsClickable ? " clickable" : "");
        const callback = (options.onRowClick) ? () => { options.onRowClick(d); } : null;
        return (
          <div key={i}
            className={rowClassName} 
            onClick={callback}
          >
            { columns.map((col, j) => {
              const cell = d[col.id];
              return (
                <div className="cell" key={j}>
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
