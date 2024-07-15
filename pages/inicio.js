import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const Inicio = () => {
    const navigator = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>App Sismos</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigator.navigate("RGPD")}
                >
                    <Image
                        source={require('../assets/inquerito.jpg')}
                        style={styles.buttonImage}
                    />
                    <View style={styles.overlay} />
                    <Text style={styles.buttonText}>Sentiu um sismo?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigator.navigate("Lista")}
                >
                    <Image
                        source={require('../assets/vulcao.jpg')}
                        style={styles.buttonImage}
                    />
                    <View style={styles.overlay} />
                    <Text style={styles.buttonText}>Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigator.navigate("RGPD")}
                >
                    <Image
                        source={require('../assets/planeta.jpg')}
                        style={styles.buttonImage}
                    />
                    <View style={styles.overlay} />
                    <Text style={styles.buttonText}>Mapa</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%',
        paddingHorizontal: 30,
        backgroundColor: '#ffffff',
        overflow: 'scroll',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#c00000',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    buttonText: {
        position: 'absolute',
        marginLeft: '5%',
        marginTop: '5%',
        textAlign: 'left',
        color: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold',
    },
})

export default Inicio;
