// importing the required modules
import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';


export default class DrawerToggler extends Component {


  toggleDrawer=()=>this.props.navigation.toggleDrawer()


  render(){
  return (
    <View style={{'flexDirection':'row'}}>
      <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <Image source={require('../assets/images/menu.png')}
          style={{width:25,height:25,marginLeft:20}}/>
      </TouchableOpacity>
    </View>
  );
}
}
