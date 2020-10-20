const searchReducer = (state = "IQ", action) => {
  switch (action.type) {
    case "search":
      return action.payload;
    default:
      return state;
  }
};
export default searchReducer;
