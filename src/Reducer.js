
const Reducer = (state, action) => {
  switch (action.type) {

    /**
     * payload: {string} id
     */
    case 'SET_CONTENT_ID':
      return {
        ...state,
        contentId: action.payload
      };

    /**
     * payload: {object} properties: id, level
     */
    case 'SET_SIDEBAR_SELECTION':
      const newState = (action.payload.level === 1) ? {
          "level1": action.payload.id,
          "level2": null,
        } : {
          "level2": action.payload.id,
        };
      return {
        ...state,
        sidebarSelection: newState
      };

    default:
      return state;
  }
};

export default Reducer;