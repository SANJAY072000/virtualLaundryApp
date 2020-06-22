// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';


export default class UploadImage extends Component {


  render(){
    return(
      <View style={styles.container}>
      <Text>Welcome to UploadImage</Text>
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
