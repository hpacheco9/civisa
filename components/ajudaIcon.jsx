import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

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
        size={36}
        color={"#000"}
      />
    </TouchableOpacity>
  );
};

export default Ajuda;
