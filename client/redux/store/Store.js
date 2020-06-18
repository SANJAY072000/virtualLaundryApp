// importing the required modules
import {createStore} from 'redux';


// importing the combined reducer
import Reducer from '../reducers/CombineReducers';


// configuring the store
const store=createStore(Reducer);


// exporting the store
export default store;
