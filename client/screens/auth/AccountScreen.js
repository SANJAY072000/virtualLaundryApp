// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import Account from '../../components/auth/Account';


export default class AccountScreen extends Component {


  render(){
    return(
      <Container>
      <Account navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
