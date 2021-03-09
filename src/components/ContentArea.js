import TableCozy from './TableCozy';

function ContentArea () {
  
  const tableOptions = {
    // "icon": null,
    "defaultSortCol": "project_visibility",
    "defaultSortDir": "desc",
    "onRowClick": (d) => {
      alert("clicked "+ d.id +" "+ d[Object.keys(d)[0]]);
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
      "project_status": "Open",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 1,
      "project_status_value": "Open",
    }, {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": "Open",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 4,
      "project_status_value": "Open",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": "Suspended",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 5,
      "project_status_value": "Suspended",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": "Closed",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 6,
      "project_status_value": "Closed",
    }, {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": "Open",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 7,
      "project_status_value": "Open",
    }, {
      "project_name": "Beer Quality",
      "project_description": "Progetto sulla qualità della birra",
      "project_status": "Suspended",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 8,
      "project_status_value": "Suspended",
    }, {
      "project_name": "Miso Quality",
      "project_description": "Progetto sulla qualità del miso",
      "project_status": "Closed",
      "project_type": "Generic",
      "project_visibility": "Restrictedc",
      "id": 9,
      "project_status_value": "Closed",
    }, {
      "project_name": "Wine Quality",
      "project_description": "Progetto sulla qualità del vino",
      "project_status": "Open",
      "project_type": "Generic",
      "project_visibility": "Public",
      "id": 10,
      "project_status_value": "Open",
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
