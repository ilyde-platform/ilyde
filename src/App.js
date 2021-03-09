/*----------------------------------
  
  TO DO 

  - add lodash & sort table data

  --------------------------------- */

import Sidebar from './components/Sidebar';
import Headerbar from './components/Headerbar';
import ContentArea from './components/ContentArea';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="ui-right">
        <Headerbar />
        <ContentArea />
      </div>
    </div>
  );
}

export default App;
