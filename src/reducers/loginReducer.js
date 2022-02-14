const initState = {
    loginSuccess: false
  }
  
  const loginReducer = (state = initState, action) => {
    switch (action.type) {
        
        case 'SET_LOGIN_SUCCESS':
            return {
                ...state,
                loginSuccess: action.payload
            }
        default:
            return state
    }
  }
  
  export default loginReducer;