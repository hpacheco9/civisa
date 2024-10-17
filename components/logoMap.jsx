import React from "react";
import { Dimensions, Image } from "react-native";

const { height } = Dimensions.get("window");

const LogoMap = () => {
  return (
    <Image
      source={require("../assets/IVAR.png")}
      style={{
        marginBottom: "3%",
        marginRight: "2%",
        right: 0,
        bottom: 0,
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

export default LogoMap;
