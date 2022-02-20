const initState = {
  business: {
    name: "",
    business_id: 1,
    business_reviews: [],
  },
  token: null,
  profile: {},
};

const businessReducer = (state = initState, action) => {
  switch (action.type) {
    // case 'ADD_REVIEW':
    //     return {
    //         ...state,
    //         reviewList: [
    //             ...state.reviewList,
    //             action.payload
    //         ]
    //     }
    case "SET_BUSINESS_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_BUSINESS_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_BUSINESS":
      return {
        ...state,
        business: action.payload,
      };
    default:
      return state;
  }
};

export default businessReducer;
