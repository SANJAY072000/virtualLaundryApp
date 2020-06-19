// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import Test from '../../components/auth/Test';


export default class TestScreen extends Component {


  render(){
    return(
      <Container>
      <Test navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
