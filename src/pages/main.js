import React, { Component } from 'react'
import { View, Text, TextInput, Button, FlatList, CheckBox } from 'react-native'
import moment from 'moment'

export default class Main extends Component {
  static navigationOptions = {
    headerTitleStyle: { textAlign: 'center' },
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
    console.tron.log(items)
  }

  // renderItem = ({ item, index }) => {
  //   return (
  //     <View>
  //       <CheckBox value={false} onChange={(e) => this.handleUpdate(index, e.target.checked)}/>
  //       <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "" }}>
  //         {item.title + '\nData de inicio: ' 
  //         + moment(item.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a") 
  //         + '\nData de término: ' 
  //         + moment(item.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
  //       </Text>
  //     </View>
  //   )
  // }

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
                <View>
                  <CheckBox value={item.done} onChange={() => this.handleUpdate(index, !item.done)}/>
                  <Text style={{ textDecorationLine: item.done === true ? 'line-through' : "none" }}>
                    {item.title + '\nData de inicio: ' 
                    + moment(item.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a") 
                    + '\nData de término: ' 
                    + moment(item.endDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </Text>
                  <Text>{JSON.stringify(item, 2, 2)}</Text>
                </View>
              )
            }}
          />
      </View>
    );
  }
}