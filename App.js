import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "./pages/inicio.js";
import DateInput from "./pages/data_hora.js";
import Perguntas from "./pages/Inquerito.js";
import Submeter from "./pages/submeter.js";
import Rgpd from "./pages/consentimento.js";
import Lista from "./pages/lista.js";
import Mapa from "./pages/mapa.js";
import Sismo from "./pages/sismo.js";
import MenuAjuda from "./pages/menuAjuda.js";
import Ajuda from "./pages/ajuda.js";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          cardStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="RGPD" component={Rgpd} />
        <Stack.Screen name="Data e Hora" component={DateInput} />
        <Stack.Screen name="Perguntas" component={Perguntas} />
        <Stack.Screen name="Submeter" component={Submeter} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Sismo" component={Sismo} />
        <Stack.Screen name="MenuAjuda" component={MenuAjuda} />
        <Stack.Screen name="Ajuda" component={Ajuda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
