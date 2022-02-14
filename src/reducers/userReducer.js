const initState = {
  user: {},
  userData: { score: 0, reviews: [] },
  rank: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_RANK":
      return {
        ...state,
        rank: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
