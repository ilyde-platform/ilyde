
export const contents = {

	projects: {
		title: "Projects",
		table: {
			options: {
		    // icon: null,
		    defaultSortCol: "create_at",
		    defaultSortDir: "desc",
		    onRowClick: (d) => {},
		  },
			columns: [
		    {
		      id: "project_name",
		      text: "Name",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_description",
		      text: "",
		      sortable: false,
		      style: "small-grey",
		    }, {
		      id: "project_status",
		      text: "Status",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_type",
		      text: "Type",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_visibility",
		      text: "Visibility",
		      sortable: true,
		      style: "normal",
		    },
		  ],
		  data: [
		    {
		      project_name: "Wine Quality",
		      project_description: "Progetto sulla qualità del vino",
		      project_status: "Open",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 14567,
		      project_status_value: "Open",
		    }, {
		      project_name: "Wine Quality",
		      project_description: "Progetto sulla qualità del vino",
		      project_status: "Open",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 14568,
		      project_status_value: "Open",
		    }, {
		      project_name: "Beer Quality",
		      project_description: "Progetto sulla qualità della birra",
		      project_status: "Suspended",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 14569,
		      project_status_value: "Suspended",
		    }, {
		      project_name: "Miso Quality",
		      project_description: "Progetto sulla qualità del miso",
		      project_status: "Closed",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 145610,
		      project_status_value: "Closed",
		    }, {
		      project_name: "Wine Quality",
		      project_description: "Progetto sulla qualità del vino",
		      project_status: "Open",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 7,
		      project_status_value: "Open",
		    }, {
		      project_name: "Beer Quality",
		      project_description: "Progetto sulla qualità della birra",
		      project_status: "Suspended",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 145611,
		      project_status_value: "Suspended",
		    }, {
		      project_name: "Miso Quality",
		      project_description: "Progetto sulla qualità del miso",
		      project_status: "Closed",
		      project_type: "Generic",
		      project_visibility: "Restrictedc",
		      id: 145612,
		      project_status_value: "Closed",
		    }, {
		      project_name: "Wine Quality",
		      project_description: "Progetto sulla qualità del vino",
		      project_status: "Open",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 145613,
		      project_status_value: "Open",
		    },
		  ],
  	},
  },

	archive: {
		title: "Archive",
		table: {
			options: {
		    // icon: null,
		    defaultSortCol: "project_visibility",
		    defaultSortDir: "desc",
		    onRowClick: (d) => {},
		  },
			columns: [
		    {
		      id: "project_name",
		      text: "Name",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_description",
		      text: "",
		      sortable: false,
		      style: "small-grey",
		    }, {
		      id: "project_status",
		      text: "Status",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_type",
		      text: "Type",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "project_visibility",
		      text: "Visibility",
		      sortable: true,
		      style: "normal",
		    },
		  ],
		  data: [
		    {
		      project_name: "Lorem ipsum",
		      project_description: "Progetto di prova",
		      project_status: "Closed",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 1,
		      project_status_value: "Closed",
		    }, {
		      project_name: "Dolor sit amet",
		      project_description: "Progetto di prova",
		      project_status: "Closed",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 2,
		      project_status_value: "Closed",
		    }, {
		      project_name: "Vestibulum sit amet pellentesque",
		      project_description: "Progetto di prova",
		      project_status: "Closed",
		      project_type: "Generic",
		      project_visibility: "Public",
		      id: 3,
		      project_status_value: "Closed",
		    },
		  ],
	  },
  },

	workspaces: {
		title: "Workspaces",
		table: {
			options: {
		    // icon: null,
		    onRowClick: (d) => {
		      alert("clicked "+ d.id +" "+ d[Object.keys(d)[0]]);
		    },
		  },
			columns: [
		    {
		      id: "ws_name",
		      text: "Name",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "ws_owner",
		      text: "Owner",
		      sortable: true,
		      style: "normal",
		    }, {
		      id: "ws_actions",
		      text: "Actions",
		      sortable: false,
		      style: "normal",
		    },
		  ],
		  data: [
		    {
		      id: 1,
		      ws_name: "Tony Vscode",
					ws_owner: "Tony",
					ws_actions: "Start — Stop",
		    }, {
		      id: 1,
		      ws_name: "Vscode",
					ws_owner: "Barbara",
					ws_actions: "Start — Stop",
		    }, {
		      id: 1,
		      ws_name: "Test 1",
					ws_owner: "Ausilia",
					ws_actions: "Start — Stop",
		    }, {
		      id: 1,
		      ws_name: "Tony Jupyter notebook",
					ws_owner: "Tony",
					ws_actions: "Start — Stop",
		    },
		  ],
	  },
  },
}
