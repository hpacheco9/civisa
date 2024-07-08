import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateInput from './pages/data_hora.js';
import Perguntas from './pages/Inquerito.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF', // Set header background color
        },
        cardStyle: {
          backgroundColor: '#FFFFFF', // Set screen background color
        },
      }}>
        <Stack.Screen
          name="Data e Hora"
          component={DateInput}
          options={{
            title: 'Data e Hora', // Set screen title
            headerTitleStyle: {
              fontWeight: 'bold', // Set title font weight
              color: '#000000', // Set title text color
            },
          }}
        />
        <Stack.Screen
          name="Perguntas"
          component={Perguntas}
          options={{
            title: 'Perguntas', // Set screen title
            headerTitleStyle: {
              fontWeight: 'bold', // Set title font weight
              color: '#000000', // Set title text color
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
