// importing the required modules
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerToggler from '../DrawerToggler';


// creating the navigation stack
const Stack=createStackNavigator();


// importing the screens
import DashboardScreen from '../../screens/dashboard/DashboardScreen';


export default class DashboardStack extends Component {
  render(){
    return(
      <Stack.Navigator screenOptions={{
        headerLeft:()=><DrawerToggler navigation={this.props.navigation}/>,
        headerTintColor:'#fff',
        headerStyle:{
          backgroundColor:'#7612cc'
        }
        }}>
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            title:'Dashboard'
          }}
        />
      </Stack.Navigator>
    );
  }
}
