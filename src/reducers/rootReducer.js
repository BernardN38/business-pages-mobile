import businessReducer from './businessReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    business: businessReducer,
    reviews:reviewReducer,
    user:userReducer,
    login:loginReducer,
    auth:authReducer
})

export default rootReducer