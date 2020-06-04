// importing the required modules
import React,{Component} from 'react';
import {Image,StyleSheet,Text} from 'react-native';
import {DeckSwiper,Card,CardItem,Body,View,Button,Icon} from 'native-base';


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
      <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')}
      style={{height:200,width:100}}/>
      <View style={styles.titleContainer}>
      <Text style={styles.title1}>Welcome to Cleanly</Text>
      <Button rounded style={styles.button}>
      <Text style={styles.title2}>Virtualize your laundry</Text>
      <Icon name='arrow-forward'/>
      </Button>
      </View>
      </View>
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
  container:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  titleContainer:{
    justifyContent:'space-around'
  },
  title1:{
    fontWeight:'bold',
    fontSize:25,
    marginVertical:25
  },
  button:{
    marginHorizontal:15,
    backgroundColor:'#7612cc'
  },
  title2:{
    marginLeft:20,
    color:'#fff',
    fontSize:13
  },
  icon:{
    fontSize:30
  },
  title3:{
    fontWeight:'bold'
  }
}
