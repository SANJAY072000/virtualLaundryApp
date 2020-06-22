// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
  AsyncStorage, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {Content} from 'native-base';


let loader;


// importing the backend configuring
import backendUrlConfig from '../../setup/BackendUrl';


const url=backendUrlConfig.url;


// importing the actions
import SetProfileAction from '../../redux/actions/dashboard/SetProfileAction';


class Dashboard extends Component {


  componentDidMount(){
  this.props.navigation.addListener('focus',()=>{
    let token;
    loader=true;
    this.forceUpdate();
    AsyncStorage.getItem('token')
    .then(res=>this.getUserProfile(res))
    .catch(err=>console.log(err));
  });
  }


  getUserProfile=token=>{
  axios({
  url:`${url}/api/customers/profile/getProfile`,
  headers:{
    Authorization:token
  }
  })
  .then(res=>{
    this.props.setUserProfile('GET_PROFILE',res.data);
    loader=false;
    this.forceUpdate();
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
      <View style={styles.container}>
      <TouchableOpacity style={{overflow:'hidden'}}>
      <Image source={{uri:this.props.userProfile.customerImage}}
         style={styles.image}/>
      </TouchableOpacity>
      <Text style={styles.name}>
      {this.props.userProfile.customerId.customerName}
      </Text>
      </View>
      </Content>
    );
  }
}


// configuring state to props method
mapStateToProps=state=>({userProfile:state.SetProfileReducer.userProfile});


// configuring dispatch to props method
mapDispatchToProps=dispatch=>({
  setUserProfile:(inputName,userProfile)=>
  dispatch(SetProfileAction(inputName,userProfile))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);



// creating the stylings
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:200,
    height:200,
    marginVertical:25
  },
  name:{
    fontWeight:'bold',
    fontSize:20,
    color:'#EA7773'
  }
});
