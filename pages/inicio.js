import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const Inicio = () => {
  const navigation = useNavigation();
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem("@user");
      const user_2 = JSON.parse(userString);
      setUser(user_2);
      console.log(user_2)
    };

    fetchUser();
  }, []);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleOptionSelect = async (option) => {
    togglePanel();
    if (option === "Logout") {
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.setItem("@loggedOut", "true");
      navigation.navigate("Login");
    } else if (option === "Perfil") {
      navigation.navigate("Perfil");
    } else if (option === "Signin") {
      await AsyncStorage.setItem("@loggedOut", "true");
      await AsyncStorage.removeItem("@user");
      navigation.navigate('Login')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../assets/CIVISA_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={togglePanel}>
          <Iconify
            icon="mdi:user-outline"
            size={height * 0.05}
            color={"black"}
          />
        </TouchableOpacity>
      </View>
      {user ? (
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
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
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
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RGPD")}
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
          onPress={() => navigation.navigate("MenuAjuda")}
        >
          <Iconify
            icon="material-symbols:chat-info-outline-rounded"
            size={height * 0.09}
            color={"#FFF"}
          />
          <Text style={styles.buttonText}>Informações</Text>
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
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: 40,
    backgroundColor: "#FFF",
  },
  logo: {
    width: "85%",
    height: 40,
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
    height: "30%",
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
});

export default Inicio;
