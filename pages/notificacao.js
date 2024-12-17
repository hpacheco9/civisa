import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from "../pages/NotificationContext.js";
import Voltar from "../components/Voltar.jsx";

const Notificacao = () => {
  const [loading, setLoading] = useState(true); // Para carregar inicialmente
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o pull-to-refresh
  const { notification, addNotification, markAsSeen } = useContext(NotificationContext);

  useEffect(() => {
    // Carrega a notificação inicial
    checkForNewNotification();
    // Marca como vista ao carregar
    markAsSeen();
  }, []);

  const checkForNewNotification = async () => {
    setRefreshing(true); // Inicia o estado de refresh
    try {
      const response = await fetch('https://www.ivar.azores.gov.pt/seismic/flashalert.txt?' + new Date()); 
      const text = await response.text(); 
      const jsonData = JSON.parse(text); // Supondo que o arquivo seja um JSON com { text, DTime }
  
      const lastNotificationTime = await AsyncStorage.getItem('@lastNotificationTime');
      if (!lastNotificationTime || jsonData.DTime !== lastNotificationTime) {
        addNotification(jsonData); // Adiciona a nova notificação ao contexto
        await AsyncStorage.setItem("@lastNotificationTime", jsonData.DTime); // Salva o tempo da nova notificação
      } else {
        addNotification(jsonData); // Atualiza a notificação, mesmo que seja a mesma
      }
      setLoading(false); // Desativa o indicador de carregamento
    } catch (error) {
      setError('Erro ao buscar a notificação'); // Atualiza a mensagem de erro
      console.error('Erro ao buscar nova notificação:', error);
    } finally {
      setRefreshing(false); // Finaliza o estado de refresh
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={checkForNewNotification} />
      }
    >
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Última Hora</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.textoBold}>{notification?.text}</Text> 
            <Text style={styles.texto}>{notification?.DTime}</Text> 
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    marginTop: "34%",
    marginBottom: "5%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
  },
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Notificacao;
