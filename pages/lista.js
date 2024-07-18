import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import InfoContainer from '../components/infoContainer.jsx';
import Voltar from '../components/Voltar.jsx';
import backGround from '../services/background.js';

const Lista = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigator = useNavigation();

  // Fetch XML data on component focus
  useFocusEffect(useCallback(() => {
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
  }, []));

  // Process events when 'events' state updates
  useEffect(() => {
    const formattedEvents = events.map(event => ({
      eventDate: event.Origin[0].originTime[0].split(' ')[0],
      utcTime: event.Origin[0].originTime[0].split(' ')[1].slice(0, 8),
      region: event.CommentCommand.find(comment => comment.$.Parameter === 'REGIAO:')?.value[0] || 'Não especificada',
      magnitude: parseFloat(event.Magnitude[0].value[0]),
      intensidade: (event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[0]) || 'Não sentido',
      regiao: event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[1] || 'Não especificada',
      latitude: event.Origin[0].location[0]._.split(',')[0].trim(),
      longitude: event.Origin[0].location[0]._.split(',')[1].trim(),
    }));

    const sortedEvents = [...formattedEvents].sort((a, b) => {
      const dateA = new Date(`${a.eventDate}T${a.utcTime}`);
      const dateB = new Date(`${b.eventDate}T${b.utcTime}`);
      return dateB - dateA;
    });

    setForm(sortedEvents);
    setFilteredEvents(sortedEvents);
  }, [events]);

  // Filter events based on intensity, magnitude, etc.
  const filterUniqueEvents = (eventsArray) => {
    eventsArray.sort((a, b) => new Date(b.Origin[0].originTime[0]) - new Date(a.Origin[0].originTime[0]));

    const uniqueEventIds = new Set();
    return eventsArray.filter(event => {
      const eventId = event.$.EventID;
      if (!uniqueEventIds.has(eventId)) {
        uniqueEventIds.add(eventId);
        return true;
      }
      return false;
    });
  };

  // Navigation callback for event details
  const toggleEventDetails = useCallback((eventIndex) => {
    const event = filteredEvents[eventIndex];
    navigator.navigate('Sismo', {
      latitude: event.latitude,
      longitude: event.longitude,
      region: event.region,
      date: event.eventDate,
      time: event.utcTime,
      intensidade: event.intensidade,
      mag: event.magnitude,
      regiao: event.regiao,
      backGround: backGround(event.intensidade?.trim()),
    });
  }, [filteredEvents, navigator]);

  // Render each item in FlatList
  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity onPress={() => toggleEventDetails(index)}>
      <MemoizedInfoContainer
        date={item.eventDate}
        time={item.utcTime}
        region={item.region}
        mag={item.magnitude}
        intensidade={item.intensidade}
        bg={backGround(item.intensidade?.trim())}
        cords={false}
      />
    </TouchableOpacity>
  ), [toggleEventDetails]);

  const MemoizedInfoContainer = React.memo(InfoContainer);

  // Functions to filter events
  const showAllEvents = () => {
    setFilteredEvents([...form]);
  };

  const showFeltEvents = () => {
    const feltEvents = form.filter(event => event.intensidade !== 'Não sentido');
    setFilteredEvents([...feltEvents]);
  };

  const showMagGreaterThanThree = () => {
    const magGreaterThanThree = form.filter(event => event.magnitude >= 3);
    setFilteredEvents([...magGreaterThanThree]);
  };

  const showMagGreaterThanFour = () => {
    const magGreaterThanFour = form.filter(event => event.magnitude >= 4);
    setFilteredEvents([...magGreaterThanFour]);
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
      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}
        ListEmptyComponent={<Text style={styles.noEventsText}>Eventos não encontrados</Text>}
      />
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
  noEventsText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
  },
});

export default Lista;
