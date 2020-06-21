// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';


let loader=true;


export default class Logout extends Component {


  componentDidMount(){
    this.props.navigation.addListener('focus',()=>{
      loader=true;
      this.forceUpdate();
      this.logout();
    });
  }


  logout=()=>{
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
