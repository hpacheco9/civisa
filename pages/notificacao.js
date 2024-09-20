import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import Voltar from "../components/Voltar.jsx";

const Notificacao = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://www.ivar.azores.gov.pt/seismic/flashalert.txt');
      const text = await response.text();
      const jsonData = JSON.parse(text);
      setData(jsonData);
      setLoading(false);
    } catch (err) {
      setError('Alerta Indisponível');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Voltar />
      <View style={styles.container}>
        <Text style={styles.title}>Última Hora</Text>
        <Text style={styles.textoBold}>{data?.text}</Text>
        <Text style={styles.texto}>{data?.DTime}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    marginTop: "34%",
    marginBottom: "5%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 60,
  },
  texto: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  textoBold: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginBottom: 10,
  },
});

export default Notificacao;