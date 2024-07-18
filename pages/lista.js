import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import { useNavigation } from '@react-navigation/native';
import InfoContainer from '../components/infoContainer.jsx';
import Voltar from '../components/Voltar.jsx';
import backGround from '../services/background.js';

const Lista = () => {
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

  const toggleEventDetails = (eventIndex) => {
    const event = filteredEvents[eventIndex];
    setSelectedEvent(eventIndex);
    navigator.navigate('Sismo', {
      latitude: event.latitude,
      longitude: event.longitude,
      region: event.region,
      date: event.eventDate,
      time: event.utcTime,
      intensidade: event.intensidade,
      mag: event.magnitude,
      backGround: backGround(event.intensidade?.trim()),
    });
  };

  return (
    <>
      <View style={{ marginBottom: '25%' }}>
        <Voltar />
      </View>
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
                  <InfoContainer
                    date={event.eventDate}
                    time={event.utcTime}
                    region={event.region}
                    mag={event.magnitude}
                    intensidade={event.intensidade}
                    bg={backGround(event.intensidade?.trim())}
                    cords={false}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>Eventos não encontrados</Text>
          )
        }
      </ScrollView >
    </>
  );
};

const styles = StyleSheet.create({
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

export default Lista;
