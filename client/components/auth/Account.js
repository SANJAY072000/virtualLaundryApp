// importing the required modules
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Button} from 'native-base';


// importing the components



export default class Account extends Component {


  render(){
    return(
      <View>
      <Image source={require('../../assets/images/auth/authb.png')}
      style={styles.authb}/>
      <Button rounded bordered style={[styles.button1,styles.alignh]}
      onPress={()=>this.props.navigation.navigate('CreateAccountScreen')}>
      <Text style={styles.title1}>Create Account</Text>
      </Button>
      <View style={styles.alignh}>
      <Text style={{fontWeight:'bold'}}>Or</Text>
      </View>
      <Button rounded bordered style={[styles.button2,styles.alignh]}
      onPress={()=>this.props.navigation.navigate('HomeScreen')}>
      <Text style={styles.title2}>Login</Text>
      </Button>
      </View>
    );
  }
}


// creating the stylings
const styles=StyleSheet.create({
  alignh:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  authb:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height-300
  },
  button1:{
    marginHorizontal:40,
    marginVertical:25,
    backgroundColor:'#6e6ceb'
  },
  title1:{
    color:'#fff',
    fontWeight:'bold'
  },
  title2:{
    color:'#6e6ceb',
    fontWeight:'bold'
  },
  button2:{
    marginHorizontal:40,
    marginVertical:20,
    borderColor:'#6129ea'
  }
});
