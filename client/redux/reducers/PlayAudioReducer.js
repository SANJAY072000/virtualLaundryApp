// configuring the initial state
let PlayAudioState={
  url:{}
};


// creating the PlayAudioReducer function
const PlayAudioReducer=(state=PlayAudioState,action)=>{
  switch(action.type){
    case 'PLAY_AUDIO':
    return {
      ...state,
      url:action.url
    };
    default: return {...state};
  }
}


// exporting the function
export default PlayAudioReducer;
