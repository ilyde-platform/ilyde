
export const contents = {

	/*
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
	*/
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
		      headerText: "Name",
		      id: "ws_name",
		      sortable: true,
		      style: "normal",
		      type: "text",
		    }, {
		      headerText: "Owner",
		      id: "ws_owner",
		      sortable: true,
		      style: "normal",
		      type: "text",
		    },{
		      buttonText: "Start",
		      headerText: "",
		      id: "button_start",
		      onButtonClick: (d) => {
			      alert("clicked start "+ d.id);
			    },
		      sortable: false,
		      style: "primary",
		      type: "button",
		    },{
		      buttonText: "Stop",
		      headerText: "",
		      id: "button_stop",
		      onButtonClick: (d) => {
			      alert("clicked stop "+ d.id);
			    },
		      sortable: false,
		      style: "primary",
		      type: "button",
		    },
		  ],
		  data: [
		    {
		      id: 12972092,
		      ws_name: "Tony Vscode",
					ws_owner: "Tony",
		    }, {
		      id: 39972092,
		      ws_name: "Vscode",
					ws_owner: "Barbara",
		    }, {
		      id: 23412423,
		      ws_name: "Test 1",
					ws_owner: "Ausilia",
		    }, {
		      id: 23523523,
		      ws_name: "Tony Jupyter notebook",
					ws_owner: "Tony",
		    },
		  ],
	  },
  },
}
