import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

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
      <Iconify icon="ion:help-sharp" size={36} color={"#000000"} />
    </TouchableOpacity>
  );
};

export default Ajuda;
