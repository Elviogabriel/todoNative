import Reactotron from 'reactotron-react-native';

console.tron = Reactotron
.configure({host: '192.168.191.101', port: 9090})
.useReactNative()
.connect()