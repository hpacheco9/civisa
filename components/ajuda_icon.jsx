import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

const { height } = Dimensions.get("window");

const Ajuda = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginTop: "20%",
        marginRight: "5%",
        right: 0,
        position: "absolute",
        zIndex: 1,
      }}
      onPress={() => {
        navigation.navigate("Ajuda");
      }}
    >
      <Iconify
        icon="material-symbols:question-mark-rounded"
        size={height * 0.06}
        color={"#000"}
      />
    </TouchableOpacity>
  );
};

export default Ajuda;
