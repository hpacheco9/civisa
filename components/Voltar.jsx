import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

const { height } = Dimensions.get("window");

const Voltar = ({ iswhite }) => {
  const navigation = useNavigation();
  const iconColor = iswhite ? "#FFF" : "#000";

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
        size={height * 0.06}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default Voltar;
