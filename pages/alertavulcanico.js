import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Voltar from "../components/Voltar";


const AlertaVulcanico = () => {
    return (
    <>
    <View style={{flexDirection: 'row'}}>
        <Voltar />
        <Text style={{fontSize: 28, marginTop: '21%', marginLeft: '17%', fontWeight:'bold'}}>Alerta Vulcânico RAA</Text>
    </View>
   
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '20%'}}>
        <View style={{justifyContent: 'center', width: '90%', backgroundColor: 'rgb(218,242, 208)', borderRadius: 5}}>
        <Text style={{fontSize: 20, fontWeight:'bold', marginLeft: '3%', marginBottom: '4%', marginTop: '5%'}}>V0</Text>
        <Text style={{textAlign: 'justify', fontSize: '14', width:'90%', marginLeft: '3%', marginBottom: '4%'}}> 
        Sistema vulcânico em fase de repouso - Atividade normal.
         Dado o enquadramento geodinâmico do arquipélago, a qualquer momento podem registar-se 
         sismos, alterar-se os padrões de desgaseificação e/ou ocorrer movimentos de vertente, 
         lahars secundários ou explosões de vapor. Podem registar-se erupções submarinas sem sinais premonitores detetáveis pelas redes de monitorização existentes.
          O mesmo pode acontecer em sistemas vulcânicos subaéreos não monitorizados ou cujas redes de monitorização são insuficientes. Embora mais raramente, podem ocorrer
        tsunamis, mesmo com origem em sismos distantes.
            </Text>
        </View>
    </View>
    </>
    );

}

export default AlertaVulcanico;