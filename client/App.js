// importing the required modules
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {AsyncStorage} from 'react-native';


// importing the stacks
import NonAuth from './navigation/nonauth/NonAuth';
import Auth from './navigation/auth/Auth';


let token='';


// importing the store
import Store from './redux/store/Store';


export default class App extends Component {


  render(){
    AsyncStorage.getItem('token')
    .then(v=>{
      token=v;
      this.forceUpdate();
    })
    .catch(err=>console.log(err));
    return(
      <Provider store={Store}>
      <NavigationContainer>
        {token===null?(
          <NonAuth/>
        ):(
          <Auth/>
      )}
      </NavigationContainer>
      </Provider>
    );
  }
}
