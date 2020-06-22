// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
  AsyncStorage, ActivityIndicator, Image, Dimensions} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {Content, Button} from 'native-base';


let loader=true;


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
    <View style={styles.containerLoader}>
    <ActivityIndicator size='large' color='#7612cc'/>
    </View>
  );
    return(
      <Content>
      <View style={styles.container}>
      <TouchableOpacity
        onPress={()=>this.props.navigation.navigate('UploadImageScreen')}>
      <Image source={{uri:this.props.userProfile.customerImage}}
         style={styles.image}/>
      </TouchableOpacity>
      <Text style={styles.name}>
      {this.props.userProfile.customerId.customerName}
      </Text>
      </View>
      <View style={{marginTop:70}}>
      <Button rounded bordered style={[styles.button1,styles.alignh]}>
      <Text style={styles.title1}>Place Order</Text>
      </Button>
      <View style={styles.alignh}>
      <Text style={{fontWeight:'bold'}}>Or</Text>
      </View>
      <Button rounded bordered style={[styles.button2,styles.alignh]}>
      <Text style={styles.title2}>Buy Plan</Text>
      </Button>
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
    alignItems:'center',
    backgroundColor:'#F5BCBA'
  },
  containerLoader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:250,
    height:250,
    marginVertical:25
  },
  name:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
    backgroundColor:'#EA7773',
    color:'#fff',
    paddingHorizontal:20,
    paddingVertical:10,
    width:Dimensions.get('window').width
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
