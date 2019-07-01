import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, CheckBox, StyleSheet, TouchableHighlight } from 'react-native'
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
          //style={{ width: 230}} 
        />
        <Button 
          onPress={this.handleChange} 
          type="solid"
          title="Adicionar"
          color='#008080' 
        />
          <FlatList
            keyExtractor={item => item.title}
            data={items}
            extraData={this.state}
            renderItem = {({ item, index }) => {
              return (
                <TouchableHighlight onPress={() => this.handleUpdate(index, !item.done)}>
                  <View style={styles.content}>
                    <View style={styles.contentTitleView}>
                      <CheckBox 
                        checked containerStyle={{backgroundColor: '#008080'}}
                        value={item.done} 
                        onChange={() => this.handleUpdate(index, !item.done)}
                      />
                      <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "none", ...styles.title }}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.contentDatesView}>
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
                </TouchableHighlight>
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
    marginVertical: 5,
    marginHorizontal: 5,
    borderStyle: 'solid',
    backgroundColor: '#f5f5f5'
  },
  contentTitleView: {
    flex:1/4,
    flexDirection:'row',
    justifyContent:'center',
  },
  contentDatesView: {
    flex:3/4,
    paddingLeft: 6,
    paddingBottom: 3,
    flexDirection:'column',
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