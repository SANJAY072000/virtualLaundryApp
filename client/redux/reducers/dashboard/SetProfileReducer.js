// configuring the initial state
let ProfileInitialState={
  userProfile:{}
};


// creating the SetProfileReducer function
const SetProfileReducer=(state=ProfileInitialState,action)=>{
  switch(action.type){
    case 'GET_PROFILE':
    return {
      ...state,
      userProfile:action.userProfile
    };
    default: return {...state};
  }
}


// exporting the function
export default SetProfileReducer;
