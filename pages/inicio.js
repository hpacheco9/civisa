import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import Logo from "../components/logo";

const { height } = Dimensions.get("window");

const Inicio = () => {
  const navigation = useNavigation();

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginState = async () => {
        setIsLoading(true);
        try {
          const userData = await AsyncStorage.getItem("@user");
          const loggedOut = await AsyncStorage.getItem("@loggedOut");
          if (userData) {
            setUser(JSON.parse(userData));
          } else {
            setUser(null);
          }
          console.log(userData);
        } catch (error) {
          console.error('Error checking login state:', error);
          setUser(null);
        } finally {
          setIsLoading(false);
          setIsDataFetched(true);
        }
      };

      checkLoginState();
    }, [])
  );

  const handleOptionSelect = async (option) => {
    togglePanel();
    try {
      if (option === "Logout" || option === "Signin") {
        await AsyncStorage.setItem("@loggedOut", "true");
        await AsyncStorage.removeItem("@user");
        setUser(null);
        navigation.navigate("Login");
      } else if (option === "Perfil") {
        navigation.navigate("Perfil");
      }
    } catch (error) {
      console.error('Error handling option:', error.message);
    }
  };

  if (isLoading || !isDataFetched) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#781f1c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.containerLogo}>
            <TouchableOpacity
              style={{
                marginLeft: "10%",
                position: "absolute",
                zIndex: 1,
              }}
              onPress={() => {
                navigation.navigate("Notificacao");
              }}
            >
              <Iconify
                icon="material-symbols:notifications-outline-rounded"
                size={height * 0.045}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: "10%",
                right: 0,
                position: "absolute",
                zIndex: 1,
              }}
              onPress={togglePanel}
            >
              <Iconify
                icon="mdi:user-outline"
                size={height * 0.045}
                color="black"
              />
            </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isPanelVisible}
        onRequestClose={togglePanel}
      >
        <TouchableWithoutFeedback onPress={togglePanel}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.panel}>
                {user ? (
                  <>
                    <Pressable
                      style={styles.panelButton}
                      onPress={() => handleOptionSelect("Perfil")}
                    >
                      <Iconify
                        icon="mdi:user-outline"
                        size={height * 0.03}
                        color={"black"}
                      />
                      <Text style={styles.panelButtonText}>Perfil</Text>
                    </Pressable>
                    <Pressable
                      style={styles.panelButton}
                      onPress={() => handleOptionSelect("Logout")}
                    >
                      <Iconify
                        icon="mdi:logout"
                        size={height * 0.03}
                        color={"black"}
                      />
                      <Text style={styles.panelButtonText}>Logout</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={styles.panelButton}
                    onPress={() => handleOptionSelect("Signin")}
                  >
                    <Iconify
                      icon="mdi:user-outline"
                      size={height * 0.03}
                      color={"black"}
                    />
                    <Text style={styles.panelButtonText}>Sign in</Text>
                  </Pressable>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Data e Hora');
          }}
        >
          <Iconify
            icon="material-symbols:checklist-rtl-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Sentiu um sismo?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Lista")}
        >
          <Iconify
            icon="material-symbols:format-list-bulleted-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Lista de sismos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Iconify
            icon="material-symbols:globe"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Mapa de sismos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alertas")}
        >
          <Iconify
            icon="material-symbols:brightness-alert-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Alertas Vulcânicos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Comunicados")}
        >
          <Iconify
            icon="material-symbols:newspaper-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Comunicados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MenuEscala")}
        >
          <Iconify
            icon="material-symbols:format-list-numbered-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Escalas e Códigos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MenuGlossarios")}
        >
          <Iconify
            icon="material-symbols:dictionary-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Glossários</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuemSomos")}
        >
          <Iconify
            icon="material-symbols:question-mark-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Quem somos?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerLogo: {
    marginTop: "25%",
    marginBottom: "10%",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 7,
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    height: "22%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#781f1c",
    borderRadius: 30,
    marginVertical: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: height * 0.02,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  panel: {
    width: "60%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    paddingBottom: 4,
    paddingTop: 5,
    alignItems: "center",
  },
  panelButton: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  panelButtonText: {
    fontSize: 18,
    color: "#000",
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Inicio;