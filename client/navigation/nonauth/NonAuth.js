// importing the required modules
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';


// creating the navigation stack
const Stack=createStackNavigator();


// importing the screens
import HomeScreen from '../../screens/home/HomeScreen';
import AccountScreen from '../../screens/auth/AccountScreen';
import CreateAccountScreen from '../../screens/auth/CreateAccountScreen';
import LoginAccountScreen from '../../screens/auth/LoginAccountScreen';
import DashboardScreen from '../../screens/dashboard/DashboardScreen';


export default class NonAuth extends Component {
  render(){
    return(
      <Stack.Navigator screenOptions={{
        headerTintColor:'#fff',
        headerStyle:{
          backgroundColor:'#7612cc',
        }
      }}>
<Stack.Screen name='HomeScreen' component={HomeScreen} options={{
    title:'Cleanly'
  }}/>
<Stack.Screen name='AccountScreen' component={AccountScreen}
  options={{
    title:'Cleanly'
  }}/>
<Stack.Screen name='CreateAccountScreen' component={CreateAccountScreen}
  options={{
    title:'Create Account'
  }}/>
<Stack.Screen name='LoginAccountScreen' component={LoginAccountScreen}
  options={{
    title:'Login'
  }}/>
</Stack.Navigator>
    );
  }
}
