// importing the required modules
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';


// importing the screens
import HomeScreen from './screens/home/HomeScreen';
import AccountScreen from './screens/auth/AccountScreen';
import CreateAccountScreen from './screens/auth/CreateAccountScreen';
import LoginAccountScreen from './screens/auth/LoginAccountScreen';


// importing the store
import Store from './redux/store/Store';


// creating the navigation stack
const Stack=createStackNavigator();


export default class App extends Component {


  render(){
    return(
      <Provider store={Store}>
      <NavigationContainer>
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
      </NavigationContainer>
      </Provider>
    );
  }
}
