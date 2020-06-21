// importing the required modules
import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';


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
        itemStyle:{marginVertical:15}
      }}>
      <Drawer.Screen name="DashboardStack"
        options={{drawerLabel:'Dashboard'}} component={DashboardStack}/>
      <Drawer.Screen name="Logout"
        options={{drawerLabel:'Logout'}} component={Logout}/>
    </Drawer.Navigator>
    );
  }
}
