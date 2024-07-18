import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

const Voltar = ({ iswhite }) => {
  const navigation = useNavigation();
  const iconColor = iswhite ? "#FFFFFF" : "#000000";

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
      <Iconify icon="ion:chevron-back" size={40} color={iconColor} />
    </TouchableOpacity>
  );
};

export default Voltar;
