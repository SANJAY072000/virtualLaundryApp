// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';


export default class  extends Component {


  componentDidMount(){
    Alert.alert('No Access to Camera','You cannot take photo',[{
      text:'Cancel',
      onPress:()=>this.props.navigation.navigate('UploadImageScreen')
    }]);
  }


  render(){
    return(
      <View style={styles.container}>
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
