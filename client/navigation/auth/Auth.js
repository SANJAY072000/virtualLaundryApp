// importing the required modules
import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image} from 'react-native';


// creating the navigation drawer
const Drawer=createDrawerNavigator();


// importing the components
import Logout from '../../components/auth/Logout';


// importing the drawer screens stack
import DashboardStack from '../drawerscreenstack/DashboardStack';


export default class Auth extends Component {
  render(){
    return(
      <Drawer.Navigator drawerContentOptions={{
        activeTintColor:'#6e6ceb',
        itemStyle:{marginVertical:15},
        labelStyle:{fontWeight:'bold'},
        contentContainerStyle:{marginTop:60}
      }}>
      <Drawer.Screen name="DashboardStack"
        options={{drawerLabel:'Dashboard',
        drawerIcon:()=>
        <Image source={require('../../assets/images/dashboard/dashboard.png')}
        style={{width:25,height:25,marginRight:-25}}/>}}
        component={DashboardStack}/>
      <Drawer.Screen name="Logout"
        options={{
        drawerLabel:'Logout',
        drawerIcon:()=>
        <Image source={require('../../assets/images/dashboard/logout.png')}
        style={{width:25,height:25,marginRight:-25}}/>}} component={Logout}/>
    </Drawer.Navigator>
    );
  }
}
