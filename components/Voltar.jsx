import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Voltar = ({ iswhite }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginTop: "20%",
        marginLeft: "5%",
        fontSize: 15,
        position: "absolute",
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          zIndex: 1,
          color: iswhite ? "#FFFFFF" : "#000000",
        }}
      >
        {"< voltar"}
      </Text>
    </TouchableOpacity>
  );
};

export default Voltar;
