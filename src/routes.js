import { createStackNavigator } from 'react-navigation'
import Main from './pages/main'

export default createStackNavigator({
  Main
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f5f5f5'
    },
    headerTintColor: '#000',
    headerTitleStyle: { 
      textAlign: 'center',
      flex: 1,
    },
  }
});