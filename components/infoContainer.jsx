import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
const InfoContainer = ({date, time, region, mag, intensidade, bg, latitude, longitude, cords}) =>{


  return (
    <>
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
                      {cords && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }}>
                          <Text>{`${latitude} N ${longitude} W`}</Text>
                        </View>
                      ) }
                      <View style={{ flexDirection: 'row' }}>
                        {intensidade != 'Não sentido' && (
                          <Image
                            source={require('../assets/shake.png')}
                            style={{ width: 15, height: 15, marginRight: '3%' }}
                          />
                        )}
                        <Text>{intensidade === 'Não sentido' ? '' : intensidade}</Text>
                      </View>
                    </View>
                    <View style={{ backgroundColor: bg, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginLeft: '4%' }}>
                      <Text style={styles.magnitude}>{mag}</Text>
                    </View>
                  </View>
    </>
   

  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 330,
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
});

export default InfoContainer;