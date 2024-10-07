import React from "react";
import { View, Dimensions } from "react-native";
import Voltar from "./Voltar";
import Logo from "./logo";

const { height } = Dimensions.get("window");

const TopBar = () => {
  return (
    <View style={{ backgroundColor: "#FFF", height: height * 0.2 }}>
      <Voltar />
      <Logo />
    </View>
  );
};

export default TopBar;
