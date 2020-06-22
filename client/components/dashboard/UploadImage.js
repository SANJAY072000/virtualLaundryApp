// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import {Content, Button} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
// import * as firebase from 'firebase';


// configuring firebase
const firebaseConfig=require('../../setup/Config');
// firebase.initializeApp(firebaseConfig);


export default class UploadImage extends Component {


  chooseImage=async ()=>{
    console.log('Choose Image');
    let result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if(!result.cancelled){

    }
  }


  render(){
    return(
      <Content>
      <View style={styles.logo}>
      <Image source={require('../../assets/images/logo.png')}
      style={{height:250,width:200}}/>
      </View>
      <View>
      <Button rounded bordered style={[styles.button1,styles.alignh]}
        onPress={this.chooseImage.bind(this)}>
      <Text style={styles.title1}>Choose Image</Text>
      </Button>
      </View>
      </Content>
  );
  }
}


// creating the stylings
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  alignh:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  button1:{
    marginHorizontal:40,
    marginVertical:25,
    backgroundColor:'#6e6ceb'
  },
  title1:{
    color:'#fff',
    fontWeight:'bold'
  }
});
