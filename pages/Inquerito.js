import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import database from '../services/Database.js';
import { useNavigation } from '@react-navigation/native';

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
        querySnapshot = await database();
        const data = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData) {
            Object.entries(docData).forEach(([index, value]) => {
              Object.entries(value).forEach(([ind, val]) => {
                if (typeof val !== 'undefined') {
                  data.push({ [ind]: val });
                }
              });
            });
          }
        });
        setPerguntas(data);
        if (data.length > 0 && currentIndex < data.length) {
          const title = Object.keys(data[currentIndex])[0];
          const questoes = data[currentIndex][title];
          setSelectedOption(null);
          setPergunta({
            questoes: questoes,
            title: title
          });
          resetAnimation();
        }
      } catch (error) {
        console.error("Erro ao carregar os documentos: ", error);
      }
    };
    fetchData();
  }, [currentIndex]);

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

  const handleOnPress = () => {
    if (selectedOption != null){
      setCurrentIndex(prevIndex => prevIndex + 1);
      if (currentIndex === perguntas.length -1 ){
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
  <>
    <Animated.View style={[styles.voltar, { transform: [{ translateX: slideAnim }], opacity: fadeAnim }]}>
    {currentIndex === 0 && (
         <TouchableOpacity
         style={styles.customButton}
         onPress={() => navigator.navigate('Data e Hora')}
       >
         <Text style={styles.voltar} >{"< voltar"}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
     
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
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </Animated.View>
  </>
 
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#e0f0ff',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    color: '#FFFFFF'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voltar : {
    marginTop: "15%",
    marginLeft: "2%",
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    paddingBottom: 2
  }
});

export default Perguntas;


