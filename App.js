// @@iconify-code-gen

import React, { useEffect, useState } from "react";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from 'react-native';
import Inicio from "./pages/inicio.js";
import DateInput from "./pages/data_hora.js";
import Perguntas from "./pages/Inquerito.js";
import Contactos from "./pages/contactos.js";
import Rgpd from "./pages/consentimento.js";
import Lista from "./pages/lista.js";
import Mapa from "./pages/mapa.js";
import Sismo from "./pages/sismo.js";
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
import Register from "./pages/registo.js";
import Registado from "./pages/registado.js";
import Perfil from "./pages/perfil.js";
import Macrossismica from "./pages/macrossismica.js";
import Alertas from "./pages/alertas.js";
import ListaEventos from "./pages/listaEventos.js";
import Notificacao from "./pages/notificacao.js";
import Comunicados from "./pages/comunicados.js";
import SplashScreen from "./pages/splashscreen.js";
import Recuperar from "./pages/recuperar.js";
import NoEthernetScreen from "./pages/ethernet.js";
import { NotificationProvider } from "./pages/NotificationContext.js";

enableScreens();

const App = () => {
  const [isCon, setCon] = useState(true);
  const Stack = createStackNavigator();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener( state => {
     if (state.isConnected === false){
        setCon(false);
     }else{
      setCon(true);
     }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    <StatusBar hidden={false} />
    <NotificationProvider>
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
        {!isCon ? (
          <Stack.Screen
            name="NoConnection"
            component={NoEthernetScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="RGPD" component={Rgpd} />
            <Stack.Screen name="Data e Hora" component={DateInput} />
            <Stack.Screen name="Perguntas" component={Perguntas} />
            <Stack.Screen name="Contactos" component={Contactos} />
            <Stack.Screen name="Lista" component={Lista} />
            <Stack.Screen name="Mapa" component={Mapa} />
            <Stack.Screen name="Sismo" component={Sismo} />
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
            <Stack.Screen name="Notificacao" component={Notificacao} />
            <Stack.Screen name="Comunicados" component={Comunicados} />
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Recuperar" component={Recuperar} />
          </>
        )}
          </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  </>
   
  );
};

export default App;
