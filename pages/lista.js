import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import { useNavigation } from '@react-navigation/native';

const FetchXmlExample = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigator = useNavigation();

  useEffect(() => {
    const fetchXmlData = async () => {
      try {
        const response = await axios.get('http://www.ivar.azores.gov.pt/seismic/eventgroup.xml?1721035364517');
        parseString(response.data, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
          } else {
            const eventsArray = result.EventGroup?.Event || [];
            const uniqueEvents = filterUniqueEvents(eventsArray);
            setEvents(uniqueEvents);
          }
        });
      } catch (error) {
        console.error('Error fetching XML:', error);
      }
    };
    fetchXmlData();
  }, []);

  useEffect(() => {
    const formattedEvents = events.map(event => {
      const eventDate = event.Origin[0].originTime[0].split(' ')[0];
      const utcTime = event.Origin[0].originTime[0].split(' ')[1].slice(0, 8);
      const region = event.CommentCommand.find(comment => comment.$.Parameter === 'REGIAO:')?.value[0] || 'Não especificada';
      const magnitude = parseFloat(event.Magnitude[0].value[0]);
      const intensidade = (event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[0]) || 'Não sentido';
      const regiao = event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[1] || 'Não especificada';
      const locationString = event.Origin[0].location[0]._;
      const locationParts = locationString.split(',');
      const latitude = locationParts[0].trim();
      const longitude = locationParts[1].trim();

      return {
        eventDate,
        utcTime,
        region,
        magnitude,
        intensidade,
        regiao,
        latitude,
        longitude,
      };
    });

    const sortedEvents = formattedEvents.sort((a, b) => {
      const dateA = new Date(`${a.eventDate}T${a.utcTime}`);
      const dateB = new Date(`${b.eventDate}T${b.utcTime}`);
      return dateB - dateA;
    });

    setForm(sortedEvents);
    setFilteredEvents(sortedEvents);
  }, [events]);

  const filterUniqueEvents = (eventsArray) => {
    eventsArray.sort((a, b) => {
      const dateA = new Date(a.Origin[0].originTime[0]);
      const dateB = new Date(b.Origin[0].originTime[0]);
      return dateB - dateA;
    });

    const uniqueEventIds = new Set();
    const uniqueEvents = [];

    eventsArray.forEach(event => {
      const eventId = event.$.EventID;
      if (!uniqueEventIds.has(eventId)) {
        uniqueEventIds.add(eventId);
        uniqueEvents.push(event);
      }
    });

    return uniqueEvents;
  };

  const showAllEvents = () => {
    setFilteredEvents(form);
  };

  const showFeltEvents = () => {
    const feltEvents = form.filter(event => event.intensidade !== 'Não sentido');
    setFilteredEvents(feltEvents);
  };

  const showMagGreaterThanThree = () => {
    const magGreaterThanThree = form.filter(event => event.magnitude >= 3);
    setFilteredEvents(magGreaterThanThree);
  };

  const showMagGreaterThanFour = () => {
    const magGreaterThanFour = form.filter(event => event.magnitude >= 4);
    setFilteredEvents(magGreaterThanFour);
  };

  const backGround = (value) => {
    let n = value;
    if (n && n.includes('/')) {
      n = n.split('/')[1];
    }
    switch (n) {
      case 'II':
        return '#BFCCFF';
      case 'III':
        return '#9B9BFF';
      case 'IV':
        return '#88DCDC';
      case 'V':
        return '#7EF895';
      case 'VI':
        return '#FDBE01';
      case 'VII':
        return '#7EF895';
      case 'VIII':
        return '#FF711F';
      case 'IX':
        return '#FF0302';
      case 'X':
        return '#DC0C0C';
      case 'XI':
        return '#880201';
      case 'XII':
        return '#440203';
      default:
        return '#FFFFFF';
    }
  };

  const toggleEventDetails = (eventIndex) => {
    if (selectedEvent === eventIndex) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(eventIndex);
      console.log('Selected Event:', filteredEvents[eventIndex]);
    }
  };

  return (
    <>
      <TouchableOpacity style={{ marginTop: '20%', marginLeft: '5%', fontSize: 15 }} onPress={() => {
        navigator.navigate('Inicio');
      }}>
        <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>{'< voltar'}</Text>
      </TouchableOpacity>
      <View style={styles.contButton}>
        <TouchableOpacity style={styles.button} onPress={showAllEvents}>
          <Text>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showFeltEvents}>
          <Text>SENTIDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showMagGreaterThanThree}>
          <Text>{'MAG > 3'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showMagGreaterThanFour}>
          <Text>{'MAG > 4'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }} >
        {
          filteredEvents.length > 0 ? (
            <View>
              {filteredEvents.map((event, index) => (
                <TouchableOpacity key={index} onPress={() => toggleEventDetails(index)} >
                  <View style={styles.container}>
                    <View style={styles.info}>
                      <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                        <Image
                          source={require('../assets/cal.png')}
                          style={{ width: 15, height: 15, marginRight: '3%' }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>{event.eventDate}</Text>
                        <Image
                          source={require('../assets/clock.png')}
                          style={{ width: 15, height: 15, marginRight: '3%', marginLeft: '5%' }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>UTC {event.utcTime}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '3%' }} >
                        <Image
                          source={require('../assets/marker.png')}
                          style={{ width: 15, height: 15, marginRight: '3%' }}
                        />
                        <Text>{event.region}</Text>
                      </View >
                      <View style={{ flexDirection: 'row' }}>
                        {event.intensidade != 'Não sentido' && (
                          <Image
                            source={require('../assets/shake.png')}
                            style={{ width: 15, height: 15, marginRight: '3%' }}
                          />
                        )}
                        <Text>{event.intensidade === 'Não sentido' ? '' : event.intensidade}</Text>
                      </View>
                    </View>
                    <View style={{ backgroundColor: backGround(event.intensidade?.trim()), width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginLeft: '4%' }}>
                      <Text style={styles.magnitude}>{event.magnitude}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>No events found</Text>
          )
        }
      </ScrollView >
    </>
  );
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
});

export default FetchXmlExample;
