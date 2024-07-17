import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Voltar = () => {
  const navigation = useNavigation();
  return (    
    <TouchableOpacity style={{  marginTop: '3%', marginLeft: '5%', fontSize: 15 }} onPress={() => {
      navigation.goBack();
    }}>
      <Text style={{fontWeight: 'bold', fontSize: 15}}>{'< voltar'}</Text>
    </TouchableOpacity>
  );
};

export default Voltar;
