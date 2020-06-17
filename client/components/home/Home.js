// importing the required modules
import React, {Component} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {DeckSwiper, Card, CardItem, Body, View, Button, Icon} from 'native-base';


// creating the deck
const cards=[{
  image: require('../../assets/images/banner/b1.png'),
  name:'Personalized Services',
  color:'#0A79DF'
},
{
  image: require('../../assets/images/banner/b2.png'),
  name:'Smooth Workflow',
  color:'#E71C23'
},
{
  image: require('../../assets/images/banner/b3.png'),
  name:'Digital Solutions',
  color:'#EA7773'
},
{
  image: require('../../assets/images/banner/b4.png'),
  name:'Open 24/7',
  color:'#7612cc'
}];


export default class Home extends Component {

  
  render(){
    return(
    <View>
    <DeckSwiper
      dataSource={cards}
      renderItem={item =>
        <Card style={{ elevation: 10 }}>
          <CardItem cardBody>
            <Image style={{ height: 300, flex: 1 }} source={item.image} />
          </CardItem>
          <CardItem>
              <Icon name="home" style={[styles.icon,{color:item.color}]}/>
              <Text style={[styles.title3,{color:item.color}]}>{item.name}</Text>
            </CardItem>
        </Card>
      }
    />
    </View>
    );
  }
}


// creating the stylings
const styles={
  icon:{
    fontSize:30
  },
  title3:{
    fontWeight:'bold'
  }
}
