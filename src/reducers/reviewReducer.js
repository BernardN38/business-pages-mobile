const initState = {
    reviewList: [
     
    ]
}

const reviewReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                ...state,
                reviewList: [
                    ...state.reviewList,
                    action.payload
                ]
            }
        case 'REMOVE_REVIEW':
            return {
                ...state,
                reviewList: action.payload
            }
        case 'SET_REVIEWS':
            return {
                reviewList: [...action.payload]
            }
        default:
            return state
    }
}

export default reviewReducer;