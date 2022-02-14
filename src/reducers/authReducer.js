const initState = {
    auth:{
        loggedIn: false
    }
  }
  
  const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state
    }
  }
  
  export default authReducer;