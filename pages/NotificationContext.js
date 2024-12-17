import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const addNotification = (message) => {
    setNotification(message);
    setHasNewNotification(true);
  };

  const markAsSeen = () => {
    setHasNewNotification(false); 
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkForNewNotification(); 
    }, 1000); 
  
    return () => clearInterval(intervalId); 
  }, []);
  
  
  const checkForNewNotification = async () => {
    try {
      const response = await fetch('https://www.ivar.azores.gov.pt/seismic/flashalert.txt?' + new Date());
      const text = await response.text();
      const jsonData = JSON.parse(text);
  
      const lastNotificationTime = await AsyncStorage.getItem('@lastNotificationTime');
      if (!lastNotificationTime || jsonData.DTime !== lastNotificationTime) {
        addNotification(jsonData);
        await AsyncStorage.setItem("@lastNotificationTime", jsonData.DTime);
      }
    } catch (error) {
      console.error('Error fetching new notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notification, hasNewNotification, addNotification, markAsSeen }}>
      {children}
    </NotificationContext.Provider>
  );
};
