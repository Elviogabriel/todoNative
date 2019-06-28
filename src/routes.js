import { createStackNavigator } from 'react-navigation'
import Main from './pages/main'

export default createStackNavigator({
  Main
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#add8e6'
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: { 
      textAlign: 'center',
      flex: 1,
    },
  }
});