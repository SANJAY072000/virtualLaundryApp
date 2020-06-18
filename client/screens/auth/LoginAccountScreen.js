// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import LoginAccount from '../../components/auth/LoginAccount';


export default class LoginAccountScreen extends Component {


  render(){
    return(
      <Container>
      <LoginAccount navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
