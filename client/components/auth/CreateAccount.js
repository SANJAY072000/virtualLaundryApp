// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {Content, Form, Item, Input, Label, Button} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';


// importing the backend configuring
import backendUrlConfig from '../../setup/BackendUrl';


const url=backendUrlConfig.url;


// importing the actions
import AccountFormAction from '../../redux/actions/auth/AccountFormAction';


class CreateAccount extends Component {


  saveData=(inputName,text)=>this.props.setAccountData(inputName,text)


  createAccount=()=>{
    let {customerName, customerEmail, customerPassword}=this.props.accountData;
    if(customerName===''||customerEmail===''||customerPassword==='')
    Alert.alert('Please fill all the fields','',[{
      text:'Cancel',
      onPress:()=>this.props.navigation.navigate('CreateAccountScreen')
    }]);
    else{
      if(customerPassword.length<8)
      Alert.alert('Password must be atleast 8 characters long','',[{
        text:'Cancel',
        onPress:()=>this.props.navigation.navigate('CreateAccountScreen')
      }]);
      else{
        axios({
          url:`${url}/api/auth/customer/register`,
          method:'POST',
          data:this.props.accountData
        })
        .then(res=>{
          if(res.data.customerAlreadyRegistered==='Customer is already registered')
          Alert.alert('You are already registered','',[{
            text:'Login',
            onPress:()=>this.props.navigation.navigate('LoginAccountScreen')
          }]);
          else this.props.navigation.navigate('LoginAccountScreen');
        })
        .catch(err=>console.log(err));
      }
    }



  }


  render(){
    return(
      <Content>
      <View style={styles.logo}>
      <Image source={require('../../assets/images/logo.png')}
      style={{height:250,width:200}}/>
      </View>
      <Form style={styles.form}>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Customer Name</Label>
          <Input onChangeText={text=>this.saveData('CUSTOMER_NAME',text)}/>
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Customer Email</Label>
          <Input onChangeText={text=>this.saveData('CUSTOMER_EMAIL',text)}/>
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Customer Password</Label>
          <Input onChangeText={text=>this.saveData('CUSTOMER_PASSWORD',text)}/>
        </Item>
      </Form>
      <Button rounded bordered style={[styles.button1,styles.logo]}
      onPress={this.createAccount.bind(this)}>
      <Text style={styles.title1}>Create Account</Text>
      </Button>
        </Content>
    );
  }
}


// configuring state to props method
mapStateToProps=state=>({accountData:state.AccountFormReducer});


// configuring dispatch to props method
mapDispatchToProps=dispatch=>({
  setAccountData:(inputName,text)=>dispatch(AccountFormAction(inputName,text))
});


// exporting the component
export default connect(mapStateToProps,mapDispatchToProps)(CreateAccount);







// creating the stylings
const styles=StyleSheet.create({
logo:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center'
},
form:{
  margin:5,
  marginTop:-60
},
item:{
  marginVertical:30
},
label:{
  fontWeight:'bold',
  fontSize:14
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
