const initState = {
  business: {
    business_id: 1
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
              business: action.payload
          }
      default:
          return state
  }
}

export default businessReducer;