// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet,
  AsyncStorage, ActivityIndicator} from 'react-native';
import {Content, Button} from 'native-base';


let loader=false;


export default class Dashboard extends Component {


  componentDidMount(){
    this.props.navigation.addListener('focus',()=>{
      loader=false;
      this.forceUpdate();
    });
  }


  logout=()=>{
    loader=true;
    this.forceUpdate();
    AsyncStorage.removeItem('token')
    .then(res=>console.log('Logged Out'))
    .catch(err=>console.log(err));
  }


  render(){
    if(loader)
    return(
      <View style={styles.container}>
      <ActivityIndicator size='large' color='#7612cc'/>
      </View>
  );
    return(
      <View style={styles.container}>
      <Button block danger onPress={this.logout.bind(this)} style={{margin:50}}>
      <Text style={{color:'#fff',fontWeight:'bold'}}>Logout</Text>
      </Button>
      </View>
    );
  }
}


// creating the stylings
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
