// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container} from 'native-base';


// importing the components
import UploadImage from '../../components/dashboard/UploadImage';


export default class UploadImageScreen extends Component {


  render(){
    return(
      <Container>
      <UploadImage navigation={this.props.navigation}/>
      </Container>
    );
  }
}


// creating the stylings
