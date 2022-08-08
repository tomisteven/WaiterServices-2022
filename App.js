import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

//para las rutas de la aplicacion
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//components
import MesaList from './screens/Mesas/MesasList';
import MesaView from "./screens/Mesas/MesaView";
import Inicio from './screens/Inicio';

const Stack = createNativeStackNavigator();

function MySlack() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="inicio" options={{
        headerShown: false
      }} component={Inicio} />

      <Stack.Screen name="mesas" options={{
        headerShown: false
      }} component={MesaList} />
      
      <Stack.Screen options={{
        headerShown: false
      }} name="mesa individual" component={MesaView} />
      

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MySlack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
