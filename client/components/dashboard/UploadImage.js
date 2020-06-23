// importing the required modules
import React, {Component} from 'react';
import {View, StyleSheet, Text,
  Image, Alert, AsyncStorage,
  ActivityIndicator, TouchableOpacity} from 'react-native';
import {Content, Button} from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../setup/Config.js';
import {Camera} from 'expo-camera';
import {connect} from 'react-redux';
import {Entypo} from '@expo/vector-icons';


// importing the components
import NoCapture from './NoCapture';


// importing the actions
import SetProfileAction from '../../redux/actions/dashboard/SetProfileAction';


let loader=false,token,isCamera=false;
console.ignoredYellowBox=[
    'Setting a timer'
]


// importing the backend configuring
import backendUrlConfig from '../../setup/BackendUrl';


const url=backendUrlConfig.url;


class UploadImage extends Component {


  componentDidMount(){
  this.props.navigation.addListener('focus',()=>{
  AsyncStorage.getItem('token')
  .then(res=>{
    token=res;
    loader=false;
    isCamera=false;
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


  openCamera=()=>{
    isCamera=true;
    this.forceUpdate();
    let cameraState={
      permission:null,
      type:Camera.Constants.Type.back
    };
    this.props.setCameraState('SET_CAMERA',cameraState);
    Camera.requestPermissionsAsync()
    .then(res=>{
    cameraState={
      permission:(res.status==='granted'),
      type:Camera.Constants.Type.back
    };
    this.props.setCameraState('SET_CAMERA',cameraState);
    })
    .catch(err=>console.log(err));
  }


  takePhoto=()=>{
    if(this.camera){
      this.camera.takePictureAsync()
      .then(result=>{
        let uri=result.uri;
        fetch(uri)
        .then(response=>{
          response.blob()
          .then(blob=>{
          let stref=firebase.storage().ref(`customerImages/${Date.now()}`);
          stref.put(blob)
          .then(snapshot=>{
          stref.getDownloadURL()
          .then(downloadUrl=>{
            loader=true;
            isCamera=false;
            this.forceUpdate();
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
      })
      .catch(err=>console.log(err));
    }
  }


  flipCamera=()=>{
    this.props.setCameraState('SET_CAMERA',{
      permission:this.props.cameraState.permission,
      type:((this.props.cameraState.type===Camera.Constants.Type.back)?
      Camera.Constants.Type.front:Camera.Constants.Type.back)
    });
  }


  render(){
  if(isCamera){
  if(this.props.cameraState.permission===null)
  return(
    <View style={styles.container}>
    </View>
  );
  else if(this.props.cameraState.permission===false)
  return <NoCapture navigation={this.props.navigation}/>
  else return(
    <View style={{flex:1}}>
      <Camera style={{flex:9}}
      type={this.props.cameraState.type} ref={ref=>this.camera=ref}>
      </Camera>
      <View style={{flex:1}}>
      <View style={{flexDirection:'row',flex:1}}>
      <TouchableOpacity style={styles.button3}
      onPress={this.takePhoto.bind(this)}>
      <View>
      <Entypo name='camera' color='#fff' size={20}/>
      <Text style={styles.title1}>Capture Photo</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button4}
      onPress={this.flipCamera.bind(this)}>
      <View>
      <Entypo name='popup' color='#fff' size={20}/>
      <Text style={styles.title1}>Flip Camera</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
  else if(loader)
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
      <Text style={styles.title1}>Choose Photo</Text>
      </Button>
      <View style={styles.alignh}>
      <Text style={{fontWeight:'bold'}}>Or</Text>
      </View>
      <Button rounded bordered style={[styles.button2,styles.alignh]}
      onPress={this.openCamera.bind(this)}>
      <Text style={styles.title2}>Capture Photo</Text>
      </Button>
      </View>
      </Content>
  );
  }
}


// configuring state to props method
mapStateToProps=state=>({cameraState:state.SetProfileReducer.cameraState});


// configuring dispatch to props method
mapDispatchToProps=dispatch=>({
  setCameraState:(inputName,cameraState)=>
  dispatch(SetProfileAction(inputName,cameraState))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(UploadImage);


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
  button3:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#D63031'
  },
  button4:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#2475B0'
  },
  title1:{
    color:'#fff',
    fontWeight:'bold'
  },
  title2:{
    color:'#6e6ceb',
    fontWeight:'bold'
  },
  button2:{
    marginHorizontal:40,
    marginVertical:20,
    borderColor:'#6129ea'
  }
});
