import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import data from '../services/dataset.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perguntas = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perguntas, setPerguntas] = useState([]);
  const [pergunta, setPergunta] = useState({
    title: "",
    questoes: []
  });
  const [form, setForm] = useState({});
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigator = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = [];
        Object.entries(data.wP6Vny1TAnsKRRQ1FOcH).forEach(([index, value]) => {
          Object.entries(value).forEach(([question, answers]) => {
            if (typeof answers !== 'undefined') {
              dados.push({ [question]: answers });
            }
          });
        });
        setPerguntas(dados);
      } catch (error) {
        console.error('Erro ao carregar os documentos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (perguntas.length > 0 && currentIndex < perguntas.length) {
      const title = Object.keys(perguntas[currentIndex])[0]
      const questoes = perguntas[currentIndex][title]
      setSelectedOption(null);
      setPergunta({
        title: title,
        questoes: questoes
      });
      resetAnimation();
    }
  }, [perguntas, currentIndex]);

  const resetAnimation = () => {
    slideAnim.setValue(200);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleOnPress = async () => {
    if (selectedOption != null) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (selectedOption == 'Não senti') {
        navigator.navigate('Submeter');
      }
      try {
        await AsyncStorage.setItem('@formAnswers', JSON.stringify(form));
        console.log('Form:', form);
      } catch (e) {
        console.error('Failed to save the data to AsyncStorage', e);
      }

      if (newIndex >= perguntas.length) {
        navigator.navigate('Submeter');
      }
    }
  };

  const handleOptionSelect = (title, option) => {
    setSelectedOption(option);
    setForm(prevForm => ({
      ...prevForm,
      [title]: option
    }));
  };

  return (
    <ScrollView>
      <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }], opacity: fadeAnim }]}>
        <Text style={styles.title}>
          {pergunta.title}
        </Text>
        <View>
          {pergunta.questoes.map((val, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.radioButton, selectedOption === val && styles.radioButtonSelected]}
              onPress={() => handleOptionSelect(pergunta.title, val)}
            >
              <Text style={styles.textItem}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cont_butt}>
          {
            currentIndex == 0 && (<TouchableOpacity style={styles.button} onPress={() => {
              navigator.navigate('Data e Hora')
            }}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>)
          }
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginTop: '40%',
    overflow: 'scroll'

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  textContainer: {
    marginVertical: 20,
    width: '100%',
  },
  textItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 300
  },
  radioButtonSelected: {
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: '#FFFFFF',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltar: {
    marginTop: "15%",
    marginLeft: "2%",
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    paddingBottom: 2
  },
  cont_butt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '30%'
  }
});

export default Perguntas;
