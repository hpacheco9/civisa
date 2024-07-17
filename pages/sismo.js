import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker, UrlTile } from 'react-native-maps';


const Sismo = ({ route }) => {
  const { latitude, longitude, region, date, time, intensidade, mag, backGround } = route.params;
  const navigator = useNavigation();





  return (
    <>
      <TouchableOpacity style={{ marginTop: '20%', marginLeft: '5%' }} onPress={() => {
        navigator.navigate('Lista');
      }}>
        <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 15 }}>{'< voltar'}</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.container}>
          <View style={styles.info}>
            <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
              <Image
                source={require('../assets/cal.png')}
                style={{ width: 15, height: 15, marginRight: '3%' }}
              />
              <Text style={{ fontWeight: 'bold' }}>{date}</Text>
              <Image
                source={require('../assets/clock.png')}
                style={{ width: 15, height: 15, marginRight: '3%', marginLeft: '5%' }}
              />
              <Text style={{ fontWeight: 'bold' }}>UTC {time}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }} >
              <Image
                source={require('../assets/marker.png')}
                style={{ width: 15, height: 15, marginRight: '3%' }}
              />
              <Text>{region}</Text>
            </View >
            <View style={{ marginBottom: '2%' }}>
              <Text>{latitude + 'º N' + ' ' + longitude + 'º W'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
              <Image
                source={require('../assets/shake.png')}
                style={{ width: 15, height: 15, marginRight: '3%' }}
              />
              <Text>{intensidade}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: backGround, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginLeft: '4%' }}>
            <Text style={styles.magnitude}>{mag}</Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 9,
            longitudeDelta: 9,

          }}
          mapType='hybrid'
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}

          />
        </MapView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
    alignItems: 'center',
    borderWidth: 1,
    width: '95%',
    height: 100,
    borderRadius: 5,
  },
  magnitude: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  magContainer: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  info: {
    width: '70%',
    marginTop: '2%',
    marginRight: '5%'
  },
  contButton: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
    height: 50,
  },
  button: {
    marginLeft: '4%',
    borderWidth: 0.5,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  map: {
    width: '100%',
    height: '90%',
  },
});





export default Sismo;
