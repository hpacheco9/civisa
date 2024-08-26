import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "./pages/inicio.js";
import DateInput from "./pages/data_hora.js";
import Perguntas from "./pages/Inquerito.js";
import Contactos from "./pages/contactos.js";
import Rgpd from "./pages/consentimento.js";
import Lista from "./pages/lista.js";
import Mapa from "./pages/mapa.js";
import Sismo from "./pages/sismo.js";
import MenuAjuda from "./pages/menuAjuda.js";
import Localizacao from "./pages/localizacao.js";
import MenuEscala from "./pages/menuEscalas.js";
import Escala from "./pages/escala.js";
import AlertaVulcanico from "./pages/alertavulcanico.js";
import AlertaAviacao from "./pages/alertaAviacao.js";
import Obs from "./pages/obs.js";
import SuccessScreen from "./pages/sucess.js";
import QuemSomos from "./pages/quemSomos.js";
import MenuGlossarios from "./pages/menuGlossarios.js";
import GlossarioSismo from "./pages/glossarioSismo.js";
import GlossarioVulcao from "./pages/glossarioVulcao.js";
import Login from "./pages/login.js";
import Registado from "./pages/registado.js";
import Perfil from "./pages/perfil.js";
import Macrossismica from "./pages/macrossismica.js";
import Alertas from "./pages/alertas.js";
import ListaEventos from "./pages/listaEventos.js";
import Register from "./pages/registo.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Inicio" component={Inicio}/>
        <Stack.Screen name="RGPD" component={Rgpd} />
        <Stack.Screen name="Data e Hora" component={DateInput} />
        <Stack.Screen name="Perguntas" component={Perguntas} />
        <Stack.Screen name="Contactos" component={Contactos} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Sismo" component={Sismo} />
        <Stack.Screen name="MenuAjuda" component={MenuAjuda} />
        <Stack.Screen name="Localizacao" component={Localizacao} />
        <Stack.Screen name="MenuEscala" component={MenuEscala} />
        <Stack.Screen name="Escala" component={Escala} />
        <Stack.Screen name="AlertaVulcanico" component={AlertaVulcanico} />
        <Stack.Screen name="AlertaAviacao" component={AlertaAviacao} />
        <Stack.Screen name="Obs" component={Obs} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="QuemSomos" component={QuemSomos} />
        <Stack.Screen name="MenuGlossarios" component={MenuGlossarios} />
        <Stack.Screen name="GlossarioSismo" component={GlossarioSismo} />
        <Stack.Screen name="GlossarioVulcao" component={GlossarioVulcao} />
        <Stack.Screen name="Macrossismica" component={Macrossismica} />
        <Stack.Screen name="Alertas" component={Alertas} />
        <Stack.Screen name="ListaEventos" component={ListaEventos} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Registo" component={Register} />
        <Stack.Screen name="Registado" component={Registado} />
        
     
      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
