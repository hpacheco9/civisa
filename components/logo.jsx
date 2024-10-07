import React from "react";
import { Dimensions, Image } from "react-native";

const { height } = Dimensions.get("window");

const Logo = () => {
  return (
    <Image
      source={require("../assets/IVAR.png")}
      style={{
        marginTop: "16%",
        alignSelf: "center",
        position: "absolute",
        zIndex: 1,
        resizeMode: "contain",
        height: height * 0.08,
        width: height * 0.1,
      }}
    />
  );
};

export default Logo;
