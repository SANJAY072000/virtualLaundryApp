// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class Dashboard extends Component {


  render(){
    return(
      <View style={styles.container}>
      <Text>Welcome to Dashboard</Text>
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
