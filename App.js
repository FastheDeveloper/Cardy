import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PreApprovalScreen from './src/Screens/FirstP';
import FirstPage from './src/Screens/FirstPage';
import { NavigationContainer } from '@react-navigation/native';
import Second from './src/Screens/SecondP';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='second' component={Second}/>
      <Stack.Screen name='first' component={PreApprovalScreen}/>
    </Stack.Navigator>
      {/* <PreApprovalScreen /> */} 
       
     
      <StatusBar style="auto" />
  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
