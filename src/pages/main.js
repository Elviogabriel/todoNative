import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, CheckBox, StyleSheet } from 'react-native'
import moment from 'moment'

export default class Main extends Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center' },
    title: "ToDo List",
  }

  constructor() {
    super()
    this.state = {
      items: [],
      newItem: '',
    }
  }

  handleChange = () => {
    const { items, newItem } = this.state
    this.setState({ 
      items: [
        ...items,
          {
            title: newItem,
            done: false,
            startDate: moment(),
            endDate: null,
          }
      ],
      newItem: '',
    });
  };

  handleUpdate = (itemsSelected, status) => {
    const { items } = this.state
    this.setState({ 
      items: items.map((item, index) => ({
        ...item,
        done: index === itemsSelected ? status : item.done,
        endDate: index === itemsSelected ? status === true ? moment() : item.endDate : item.endDate,
      })),
    });
    //console.tron.log(items)
  }

  render() {
    const { items, newItem } = this.state;
    return (
      <View>
        <TextInput 
          value={newItem} 
          onChangeText={(newItem) => this.setState({newItem})}
          type="text" 
          placeholder="Adicionar a sua ToDo list" 
          style={{ width: 230}} />
        <Button 
          onPress={this.handleChange} 
          type="primary"
          title="Adiconar" 
        />
          <FlatList
            keyExtractor={item => item.title}
            data={items}
            extraData={this.state}
            renderItem = {({ item, index }) => {
              return (
                <View style={styles.content}>
                  <View style={styles.contentMainView}>
                    <CheckBox value={item.done} onChange={() => this.handleUpdate(index, !item.done)}/>
                    <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "none", ...styles.title }}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.contentSecondView}>
                    <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "none", ...styles.dates }}>
                      {'Data de inicio: ' 
                      + moment(item.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </Text>
                    <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "none", ...styles.dates }}>
                      {'Data de término: ' 
                      + moment(item.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </Text>
                    {/* <Text>{JSON.stringify(item, 2, 2)}</Text> */}
                  </View>
                </View>
              )
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    marginVertical: 10
  },
  contentMainView:{
    flex:1/4,
    flexDirection:'row',
    justifyContent:'center',
  },
  contentSecondView:{
    flex:3/4,
    //marginTop: 10,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent:'center'
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dates: {
    flex:1,
    fontSize: 16,
  }
})