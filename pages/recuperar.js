import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput, TouchableOpacity } from "react-native";
import Voltar from "../components/Voltar.jsx";
import { useNavigation } from '@react-navigation/native';
const Recuperar = () => {
    const [email, setEmail] = useState('');
    const nagigation = useNavigation();
    const handleSubmit = () => {
        console.log('Recuperar senha para:', email);
    };

    return (
        <>
        <Voltar />
            <View style={styles.container}>
                <Text style={styles.title}>Recuperar Password</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Introduza o email da conta"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text>Ainda não tem conta? </Text>
                    <TouchableOpacity onPress={() =>{
                        nagigation.navigate('Registo');
                    }}>
                        <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Registe-se</Text>
                    </TouchableOpacity>
                </View>
               
            </View>
           
        </>
            
       
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',       
        alignItems: 'center',
        marginBottom: height*0.04   
    },
    title: {
        fontSize: height * 0.035,
        fontWeight: 'bold',
        marginBottom: height * 0.06,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: '5%',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
    },
    input: {
        width: '90%',
        height: height * 0.06,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: height * 0.02,
        marginBottom: height * 0.03,
    },
    button: {
        backgroundColor: '#000000',
        width: '50%',
        height: height * 0.065,  
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: height * 0.02,
    },
    buttonText: {
        color: 'white',
        fontSize: height * 0.02,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: height * 0.03,   
    
    },
    signupText: {
        color: '#00000',
        textDecorationLine: 'underline',
    },
});

export default Recuperar;