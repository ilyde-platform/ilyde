import React, { useEffect, useContext, useState } from 'react';
import {Context} from '../Store';
import TableCozy from './TableCozy';
import { contents } from '../testContents.js';

function ContentArea () {

  let content;
  const [state, dispatch] = useContext(Context);
  const contentId = state.contentId;
  const contentData = contents.hasOwnProperty(contentId) ? contents[contentId] : null;
  if (!contentData) {
    content = (
      <span className="font-m">
        {`No content available named '${contentId}'`}
      </span>
    );
  } else {
    const table = contentData.hasOwnProperty("table") ? contentData.table : null;
    if (!table) { throw "Remember to fix this"; }
    const tableOptions = table.options;
    const tableColumns = table.columns;
    const tableData = table.data;
    content = (
      <TableCozy 
        columns={tableColumns}
        data={tableData}
        options={tableOptions}
      />
    );
  }

  return (
    <div className="content-area">
      <div className="content">
        {content}
      </div>
    </div>
  );
}

export default ContentArea;
