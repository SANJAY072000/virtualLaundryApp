// importing the required modules
import {combineReducers} from 'redux';


// importing the reducers
import PlayAudioReducer from './playaudio/PlayAudioReducer';
import AccountFormReducer from './auth/AccountFormReducer';
import SetProfileReducer from './dashboard/SetProfileReducer';


// exporting the combined reducer
export default combineReducers({
  PlayAudioReducer,AccountFormReducer,SetProfileReducer
});
