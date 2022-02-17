const initState = {
  business: {
    name:'',
    business_id: 1,
    business_reviews:[]
  }
}

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
      // case 'REMOVE_REVIEW':
      //     return {
      //         ...state,
      //         reviewList: action.payload
      //     }
      case 'SET_BUSINESS':
          return {
            ...state,
              business: action.payload
          }
      default:
          return state
  }
}

export default businessReducer;