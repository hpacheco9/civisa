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
        position: "absolute",
        zIndex: 1,
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Iconify
        icon="material-symbols:arrow-back-ios-rounded"
        size={36}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default Voltar;
