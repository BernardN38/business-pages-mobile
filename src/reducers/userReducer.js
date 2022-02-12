const initState = {
    user: {}
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer;