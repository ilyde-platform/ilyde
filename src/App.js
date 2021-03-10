/*----------------------------------
  
  TO DO 

  - add lodash & sort table data

  --------------------------------- */

import React, { useState } from 'react';
import Store from './Store'
import Sidebar from './components/Sidebar';
import Headerbar from './components/Headerbar';
import ContentArea from './components/ContentArea';
// import { contents } from './testContents.js';

function App() {
  
  // const defaultState = {
  //   "sidebarSelection": {
  //     "level1": "projects",
  //     "level2": null,
  //   },
  //   "contentId": "projects",
  // };
  // const [sidebarSelection, setSidebarSelection] = useState(defaultState.sidebarSelection);
  // const [contentId, setContentId] = useState(defaultState.contentId);
  // const contentData = contents[contentId];
  // const title = contentData ? contents[contentId].title : null;

  return (
    <Store>
      <div className="app">
        <Sidebar />
        <div className="ui-right">
          <Headerbar 
            showBackButton={true}
          />
          <ContentArea />
        </div>
      </div>
    </Store>
  );
}

export default App;
