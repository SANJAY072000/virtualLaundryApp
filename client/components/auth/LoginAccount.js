// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage, Alert} from 'react-native';
import {Content, Form, Item, Input, Label, Button} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';


// importing the backend configuring
import backendUrlConfig from '../../setup/BackendUrl';


const url=backendUrlConfig.url;


// importing the actions
import AccountFormAction from '../../redux/actions/auth/AccountFormAction';



class LoginAccount extends Component {


  saveData=(inputName,text)=>this.props.setAccountData(inputName,text)


  loginAccount=()=>{
    let {customerEmail, customerPassword}=this.props.accountData;
    if(customerEmail===''||customerPassword==='')
    Alert.alert('Please fill all the fields','',[{
      text:'Cancel',
      onPress:()=>this.props.navigation.navigate('LoginAccountScreen')
    }]);
    else{
    axios({
        url:`${url}/api/auth/customer/login`,
        method:'POST',
        data:this.props.accountData
      })
      .then(res=>{
        if(res.data.customerNotRegistered==='Customer is not registered')
        Alert.alert('You are not registered','',[{
          text:'Create Account',
          onPress:()=>{
          this.props.setAccountData('RESET','');
          this.props.navigation.replace('CreateAccountScreen');
        }
        },
        {
          text:'Cancel',
          onPress:()=>this.props.navigation.navigate('LoginAccountScreen')
        }]);
        else if(res.data.passwordIncorrect==='Password is incorrect')
        Alert.alert('Password is incorrect','',[{
          text:'Cancel',
          onPress:()=>this.props.navigation.navigate('LoginAccountScreen')
        }]);
        else{
        AsyncStorage.setItem('token',res.data.token)
        .then(()=>{
        this.props.setAccountData('RESET','');
        // this.props.navigation.popToTop();
        })
        .catch(err=>console.log(err));

        }

      })
      .catch(err=>console.log(err));
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
          <Label style={styles.label}>Customer Email</Label>
          <Input onChangeText={text=>this.saveData('CUSTOMER_EMAIL',text)}/>
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Customer Password</Label>
          <Input onChangeText={text=>this.saveData('CUSTOMER_PASSWORD',text)}/>
        </Item>
      </Form>
      <Button rounded bordered style={[styles.button1,styles.logo]}
      onPress={this.loginAccount.bind(this)}>
      <Text style={styles.title1}>Login</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(LoginAccount);


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
