import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationContext } from "../pages/NotificationContext.js";
import Voltar from "../components/Voltar.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const Notificacao = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { notification, addNotification, markAsSeen } = useContext(NotificationContext);

  useEffect(() => {
    checkForNewNotification();
    markAsSeen();
  }, []);

  const checkForNewNotification = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('http://www.ivar.azores.gov.pt/seismic/flashalert.txt?' + new Date()); 
      const text = await response.text(); 
      const jsonData = JSON.parse(text);
  
      const lastNotificationTime = await AsyncStorage.getItem('@lastNotificationTime');
      if (!lastNotificationTime || jsonData.DTime !== lastNotificationTime) {
        addNotification(jsonData);
        await AsyncStorage.setItem("@lastNotificationTime", jsonData.DTime);
      } else {
        addNotification(jsonData);
      }
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar a notificação');
      console.error('Erro ao buscar nova notificação:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderNotificationContent = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={50} color="#FF6B6B" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (loading) {
      return <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />;
    }

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Icon name="notifications" size={24} color="#4A90E2" />
          <Text style={styles.cardHeaderTitle}>Última Hora</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.notificationTitle}>{notification?.text}</Text>
          <View style={styles.timestampContainer}>
            <Icon name="access-time" size={16} color="#888" />
            <Text style={styles.timestampText}>{notification?.DTime}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Voltar />
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={checkForNewNotification} 
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderNotificationContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#2C3E50',
  },
  cardContent: {
    padding: 16,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
    lineHeight: 24,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timestampText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 6,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  loader: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Notificacao;