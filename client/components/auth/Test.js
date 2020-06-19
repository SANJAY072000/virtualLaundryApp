// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {Container} from 'native-base';


// importing the components


export default class Test extends Component {


  logout=()=>{
    AsyncStorage.removeItem('token')
    .then(res=>{
      AsyncStorage.getItem('token')
      .then(v=>{
        console.log(v);
      })
      .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
  }


  render(){
    return(
      <View>
      <Text onPress={this.logout.bind(this)}>Logout</Text>
      </View>
    );
  }
}


// creating the stylings
