// importing the required modules
import React,{Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing the screens
import HomeScreen from './screens/home/HomeScreen';

// creating the navigation stack
const Stack=createStackNavigator();

export default class App extends Component {
  render(){
    return(
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

        </Stack.Navigator>


      </NavigationContainer>
    );
  }
}
