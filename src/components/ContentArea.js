import TableCozy from './TableCozy';

function ContentArea () {
  
  const tableOptions = {
    // "icon": null,
    "defaultSortCol": "project_status",
    "defaultSortDir": "asc",
    "onRowClick": (d) => {
      alert("clicked "+ d[Object.keys(d)[0]]);
    },
  };

  const tableColumns = [
    {
      "id": "project_name",
      "text": "Name",
      "sortable": true,
    }, {
      "id": "project_description",
      "text": "",
      "sortable": false,
    }, {
      "id": "project_status",
      "text": "Status",
      "sortable": true,
    }, {
      "id": "project_type",
      "text": "Type",
      "sortable": true,
    }, {
      "id": "project_visibility",
      "text": "Visibility",
      "sortable": true,
    },
  ];

  const tableData = [
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
    {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": (<span className="status-green">Open</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": (<span className="status-green">Suspended</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": (<span className="status-green">Closed</span>),
      "project_type": "Generic",
      "project_visibility": "Public",
    },
  ];

  return (
    <div className="content-area">
      <div className="content">
        <TableCozy columns={tableColumns} data={tableData} options={tableOptions} />
      </div>
    </div>
  );
}

export default ContentArea;
