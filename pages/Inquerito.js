import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import data from "../services/dataset.json";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Voltar from "../components/Voltar";

const Perguntas = ({ route }) => {
  const resetIndex = route.params?.resetIndex ?? 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(resetIndex);
  const [perguntas, setPerguntas] = useState([]);
  const [pergunta, setPergunta] = useState({
    title: "",
    questoes: [],
  });
  const [form, setForm] = useState({});
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = [];
        Object.entries(data.wP6Vny1TAnsKRRQ1FOcH).forEach(([questionIndex, questionData]) => {
          Object.entries(questionData).forEach(([question, answers]) => {
            if (Array.isArray(answers)) {
               const keys = []
              answers.map(answerObj => {
                const [key] = Object.entries(answerObj)[0];
                keys.push(key);
              });
              dados.push({[question] : keys});
            }
          });
        });
        setPerguntas(dados);
        console.log(dados);
      } catch (error) {
        console.error("Erro ao carregar os documentos:", error);
      }
    };
    fetchData();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      setCurrentIndex(resetIndex);
      setForm({});
    }, [resetIndex])
  );

  useEffect(() => {
    if (perguntas.length > 0 && currentIndex < perguntas.length) {
      const title = Object.keys(perguntas[currentIndex])[0];
      const questoes = perguntas[currentIndex][title];
      setSelectedOption(null);
      setPergunta({
        title: title,
        questoes: questoes,
      });
      resetAnimation();
    }
  }, [perguntas, currentIndex]);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentIndex(resetIndex);
      setForm({}); 
    }, [resetIndex])
  );

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
      }),
    ]).start();
  };

  const handleOnPress = async () => {
    if (selectedOption != null) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (selectedOption === "Não senti") {
        navigation.navigate("Submeter");
        return;
      }
      try {
        const arrays = extractAnswerArrays(data.wP6Vny1TAnsKRRQ1FOcH);
        const newF = mapFormToAnswers(form, arrays);
        console.log(newF);
        await AsyncStorage.setItem("@formAnswers", JSON.stringify(newF));
      } catch (e) {
        console.error("Failed to save the data to AsyncStorage", e);
      }
      if (newIndex >= perguntas.length) {
        navigation.navigate("Submeter");
        return;
      }
    }
  };

  const extractAnswerArrays = (questions) => {
    const arrays = {};
    Object.entries(questions).forEach(([questionIndex, questionData]) => {
      Object.entries(questionData).forEach(([questionTitle, answersArray]) => {
        answersArray.forEach(answerObject => {
          Object.entries(answerObject).forEach(([title, response]) => {
            arrays[title] = response; 
          });
        });
      });
    });
    return arrays;
  };

  const mapFormToAnswers = (form, arrays) => {
    const newF = {};
    Object.entries(form).forEach(([title, resp]) => {
      newF[title] = { [resp]: arrays[resp] };
    });
    return newF;
  };

  const handleOptionSelect = (title, option) => {
    setSelectedOption(option);
    console.log(option);
    setForm((prevForm) => ({
      ...prevForm,
      [title]: option,
    }));
  };

  return (
    <ScrollView>
      {currentIndex === 0 && (
        <Animated.View
          style={{
            marginBottom: "10%",
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          }}
        >
          <Voltar />
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: slideAnim }], opacity: fadeAnim },
        ]}
      >
        <Text style={styles.title}>{pergunta.title}</Text>
        <View>
          {pergunta.questoes.map((val, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.radioButton,
                selectedOption === val && styles.radioButtonSelected,
              ]}
              onPress={() => handleOptionSelect(pergunta.title, val)}
            >
              <Text
                style={[
                  styles.textItem,
                  selectedOption === val && styles.textItemSelected,
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cont_butt}>
          <TouchableOpacity style={styles.button} onPress={handleOnPress}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "scroll",
    marginTop: "40%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  textContainer: {
    marginVertical: 20,
    width: "100%",
  },
  textItem: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000000", 
  },
  textItemSelected: {
    color: "#FFFFFF", 
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  radioButtonSelected: {
    backgroundColor: "#781f1c", 
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: "#FFFFFF",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  voltar: {
    marginTop: "15%",
    marginLeft: "2%",
    textDecorationLine: "underline",
    fontWeight: "bold",
    paddingBottom: 2,
  },
  cont_butt: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "30%",
  },
});

export default Perguntas;
