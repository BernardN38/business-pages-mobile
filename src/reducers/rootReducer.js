import businessReducer from './businessReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer'
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    business: businessReducer,
    reviews:reviewReducer,
    user:userReducer
})

export default rootReducer