// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import Dashboard from '../../components/auth/Dashboard';


export default class DashboardScreen extends Component {


  render(){
    return(
      <Container>
      <Dashboard navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
