// importing the required modules
import React,{Component} from 'react';
import {Container} from 'native-base';
import {Audio} from 'expo-av';


// importing the components
import Home from '../../components/home/Home';


export default class HomeScreen extends Component {
constructor(props){
super(props);
this.state = {
  url:require('../../assets/audio/speech.mp3')
};
}

async componentDidMount(){
const obj=new Audio.Sound();
await obj.loadAsync(this.state.url);
await obj.playAsync()
.then(res=>{
  setInterval(()=>{
    obj.unloadAsync();
  },res.playableDurationMillis);
})
.catch(err=>console.log(err));
}

  render(){
    return(
      <Container>
        <Home/>
      </Container>
    );
  }
}
