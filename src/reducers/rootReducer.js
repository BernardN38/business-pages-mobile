import businessReducer from './businessReducer';
import reviewReducer from './reviewReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    business: businessReducer,
    reviews:reviewReducer
})

export default rootReducer