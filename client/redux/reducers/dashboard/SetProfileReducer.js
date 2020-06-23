// configuring the initial state
let ProfileInitialState={
  userProfile:{},
  cameraState:{}
};


// creating the SetProfileReducer function
const SetProfileReducer=(state=ProfileInitialState,action)=>{
  switch(action.type){
    case 'GET_PROFILE':
    return {
      ...state,
      userProfile:action.userProfile
    };
    case 'SET_CAMERA':
    return {
      ...state,
      cameraState:action.userProfile
    };
    default: return {...state};
  }
}


// exporting the function
export default SetProfileReducer;
