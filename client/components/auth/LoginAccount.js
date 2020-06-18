// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Content, Form, Item, Input, Label, Button} from 'native-base';


// importing the components



export default class LoginAccount extends Component {


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
          <Input />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Customer Password</Label>
          <Input />
        </Item>
      </Form>
      <Button rounded bordered style={[styles.button1,styles.logo]}
      onPress={()=>this.props.navigation.navigate('HomeScreen')}>
      <Text style={styles.title1}>Login</Text>
      </Button>
        </Content>
    );
  }
}


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
