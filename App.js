import React from 'react';
import { NavigationContainer, Easing } from '@react-navigation/native';
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
          open: { animation: 'spring', config: { duration: 300 } },
          close: { animation: 'spring', config: { duration: 300 } },
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
        />
        <Stack.Screen
          name="RGPD"
          component={Rgpd}
        />
        <Stack.Screen
          name="Data e Hora"
          component={DateInput}
        />
        <Stack.Screen
          name="Perguntas"
          component={Perguntas}
        />
        <Stack.Screen
          name="Submeter"
          component={Submeter}
        />
        <Stack.Screen
          name="Result"
          component={Result}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
        />
        <Stack.Screen
          name="Mapa"
          component={Mapa}
        />
        <Stack.Screen
          name="Sismo"
          component={Sismo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
