import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";


const {height } = Dimensions.get('window');
const Ajuda = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginTop: "10%",
        marginLeft: "90%",
        fontSize: 15,
        position: "absolute",
      }}
      onPress={() => {
        navigation.navigate("Ajuda");
      }}
    >
      <Iconify icon="ion:help-sharp" size={height*0.04} color={"#000000"} />
    </TouchableOpacity>
  );
};

export default Ajuda;
