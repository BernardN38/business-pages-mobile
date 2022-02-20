const initState = {
    authMode:null
  }
  
  const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_AUTH_MODE':
            return {
                ...state,
                authMode: action.payload
            }
        default:
            return state
    }
  }
  
  export default authReducer;