// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import CreateAccount from '../../components/auth/CreateAccount';


export default class CreateAccountScreen extends Component {


  render(){
    return(
      <Container>
      <CreateAccount navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
