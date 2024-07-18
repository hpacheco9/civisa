import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './pages/inicio.js';
import DateInput from './pages/data_hora.js';
import Perguntas from './pages/Inquerito.js';
import Submeter from './pages/submeter.js';
import Rgpd from './pages/consentimento.js';
import Result from './pages/result.js';
import Lista from './pages/lista.js';
import Mapa from './pages/mapa.js';
import Sismo from './pages/sismo.js';

const Stack = createStackNavigator();
const App = () => {
  return (

    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            title: 'Inicio',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="RGPD"
          component={Rgpd}
          options={{
            title: 'RGPD',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Data e Hora"
          component={DateInput}
          options={{
            title: 'Data e Hora',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Perguntas"
          component={Perguntas}
          options={{
            title: 'Perguntas',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Submeter"
          component={Submeter}
          options={{
            title: 'Submeter',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            title: 'Result',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{
            title: 'Result',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Mapa"
          component={Mapa}
          options={{
            title: 'Mapa',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="Sismo"
          component={Sismo}
          options={{
            title: 'Sismo',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#000000',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
