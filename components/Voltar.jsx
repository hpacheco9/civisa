import React from "react";
import { TouchableOpacity, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";


const { width, height } = Dimensions.get('window');
const Voltar = ({ iswhite }) => {
  const navigation = useNavigation();
  const iconColor = iswhite ? "#FFFFFF" : "#000000";

  return (
    <TouchableOpacity
      style={{
        marginTop: "20%",
        marginLeft: "2%",
        position: "absolute",
        zIndex: 1,
      }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Iconify icon="ion:chevron-back" size={height*0.04} color={iconColor} />
    </TouchableOpacity>
  );
};

export default Voltar;
