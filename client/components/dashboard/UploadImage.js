// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, Text,
  Image, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import {Content, Button} from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../setup/Config.js';


let loader=false,token;
console.ignoredYellowBox=[
    'Setting a timer'
]


// importing the backend configuring
import backendUrlConfig from '../../setup/BackendUrl';


const url=backendUrlConfig.url;


export default class UploadImage extends Component {


  componentDidMount(){
  this.props.navigation.addListener('focus',()=>{
  AsyncStorage.getItem('token')
  .then(res=>{
    token=res;
    loader=false;
    this.forceUpdate();
  })
  .catch(err=>console.log(err));
});
  }


  chooseImage=()=>{
    let result=ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    .then(result=>{
    if(!result.cancelled){
    let uri=result.uri,ext=uri.split('/').reverse()[0].split('.').reverse()[0];
    if(ext==='jpg'||ext==='jpeg'||ext==='png'){
      fetch(uri)
      .then(response=>{
        response.blob()
        .then(blob=>{
        loader=true;
        this.forceUpdate();
        let stref=firebase.storage().ref(`customerImages/${Date.now()}`);
        stref.put(blob)
        .then(snapshot=>{
        stref.getDownloadURL()
        .then(downloadUrl=>{
        axios({
          url:`${url}/api/customers/profile/updateProfile`,
          method:'POST',
          data:{
            customerImage:downloadUrl
          },
          headers:{
            Authorization:token
          }
        })
        .then(res=>this.props.navigation.navigate('DashboardScreen'))
        .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
        }
        else{
        Alert.alert(`.${ext} cannot be uploaded`,
          'Only .jpg and .png images are allowed',[{
          text:'Cancel',
          onPress:()=>this.props.navigation.navigate('UploadImageScreen')
        }]);
        }
      }
    })
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
