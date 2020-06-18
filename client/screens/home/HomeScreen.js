// importing the required modules
import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {Container, View, Button, Icon} from 'native-base';
import {Audio} from 'expo-av';
import {connect} from 'react-redux';


// importing the components
import Home from '../../components/home/Home';


// importing the actions
import PlayAudioAction from '../../redux/actions/playaudio/PlayAudioAction';


class HomeScreen extends Component {


async componentDidMount(){
await this.props.playaudio(require('../../assets/audio/speech.mp3'));
const obj=new Audio.Sound();
await obj.loadAsync(this.props.url);
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
      <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')}
      style={{height:200,width:100}}/>
      <View style={styles.titleContainer}>
      <Text style={styles.title1}>Welcome to Cleanly</Text>
      <Button rounded style={styles.button}
        onPress={()=>this.props.navigation.navigate('AccountScreen')}>
      <Text style={styles.title2}>Virtualize your Laundry</Text>
      <Icon name='arrow-forward'/>
      </Button>
      </View>
      </View>
      <Home/>
      </Container>
    );
  }
}


// configuring state to props method
function mapStateToProps(state){
  return {
    url:state.PlayAudioReducer.url
  };
}


// configuring dispatch to props method
function mapDispatchToProps(dispatch){
  return {
    playaudio:url=>dispatch(PlayAudioAction(url))
  };
}


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);


// creating the stylings
const styles={
  container:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  titleContainer:{
    justifyContent:'space-around'
  },
  title1:{
    fontWeight:'bold',
    fontSize:25,
    marginVertical:25
  },
  button:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#7612cc'
  },
  title2:{
    marginLeft:20,
    color:'#fff',
    fontSize:13,
    fontWeight:'bold'
  }
}
