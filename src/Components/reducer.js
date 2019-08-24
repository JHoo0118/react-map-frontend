export default function reducer(state, { type, payload }) {
  switch (type) {
    case "CREATE_DRAFT":
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload
      };
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null
      };
    case "HANDLE_TOGGLE_BUTTON":
      return {
        ...state,
        isOpened: !state.isOpened
      };
    case "ALWAYS_TRUE":
      return {
        ...state,
        isOpened: true
      };
    default:
      return state;
  }
}
