import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';

const FetchXmlExample = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({});

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
    const formattedEvents = events.map(event => ({
      eventDate: event.Origin[0].originTime[0].split(' ')[0],
      utcTime: event.Origin[0].originTime[0].split(' ')[1],
      region: event.CommentCommand.find(comment => comment.$.Parameter === 'REGIAO:')?.value[0] || 'Não especificada',
      magnitude: event.Magnitude[0].value[0],
      intensidade: (event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[0]) || 'Não sentido',
      regiao: event.CommentCommand.find(comment => comment.$.Parameter === 'SENTIDO:')?.value[0]?.split(' -')[1] || 'Não especificada'
    }));

    setForm(formattedEvents);
    console.log(form);
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


  function backGround(value) {
    let n = value;
    if (n && n.includes('/')) {
      n = n.split('/')[1];
    }
    switch (n) {
      case 'II':
        return '#BFCCFF'
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
  }






  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
      {form.length > 0 ? (
        <View>
          {form.map((event, index) => (
            <View key={index} style={styles.container}>
              <View style={styles.info}>
                <Text style={{ fontWeight: 'bold' }}>Event Date: {event.eventDate}</Text>
                <Text>UTC Time: {event.utcTime}</Text>
                <Text>Region: {event.region}</Text>
                <Text>{event.intensidade === 'Não sentido' ? '' : event.intensidade}</Text>
              </View>
              <View style={{ backgroundColor: backGround(event.intensidade?.trim()), width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: '9%', marginLeft: '5%' }}>
                <Text style={styles.magnitude}>{event.magnitude}</Text>
              </View>

            </View>
          ))}
        </View>
      ) : (
        <Text>No events found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    width: 300,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: '10%'
  },
  info: {
    width: '70%',
    margin: '3%',
  },
});

export default FetchXmlExample;