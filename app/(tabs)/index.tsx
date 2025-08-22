import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Clima {
  temperatura: number;
  descripcion: string;
  icono: string;
  viento: number;
  humedad: number;
  main: string;
}

export default function HomeScreen() {
  const [ciudad, setCiudad] = useState<string>("");
  const [clima, setClima] = useState<Clima | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const obtenerClima = async () => {
    try {
      if (!ciudad.trim()) return;
      setError(null);
      setLoading(true);
      setClima(null);

      const apiKey = "53ded3d485db8e480e3756e21cc2c53b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

      const respuesta = await fetch(url);
      const data = await respuesta.json();

      if (data.cod === "404") {
        setError("Ciudad no encontrada ❌");
        setClima(null);
      } else {
        setClima({
          temperatura: data.main.temp,
          descripcion: data.weather[0].description,
          icono: data.weather[0].icon,
          viento: data.wind.speed,
          humedad: data.main.humidity,
          main: data.weather[0].main || "default",
        });
      }
    } catch (e) {
      setError("Error de conexión ⚠️");
      setClima(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clima) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [clima]);

  const getGradientColors = (main: string = "default"): [string, string, ...string[]] => {
    switch (main.toLowerCase()) {
      case "clear":
        return ["#FFD54F", "#FFE082"];
      case "clouds":
        return ["#90A4AE", "#CFD8DC"];
      case "rain":
        return ["#4FC3F7", "#0288D1"];
      case "snow":
        return ["#B3E5FC", "#E1F5FE"];
      default:
        return ["#ffffff", "#f0f8ff"];
    }
  };

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchCard}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese una ciudad"
          placeholderTextColor="#aaa"
          value={ciudad}
          onChangeText={setCiudad}
        />
        <TouchableOpacity style={styles.boton} onPress={obtenerClima} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Buscar</Text>}
        </TouchableOpacity>
      </View>

      {/* Clima actual */}
      {clima && (
        <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
          <LinearGradient
            colors={getGradientColors(clima.main)}
            style={styles.weatherCard}
          >
            <Text style={styles.city}>{ciudad}</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${clima.icono}@4x.png` }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{Math.round(clima.temperatura)}°C</Text>
            <Text style={styles.desc}>{clima.descripcion}</Text>

            <View style={styles.chipsContainer}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>💨 {clima.viento} km/h</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>💧 {clima.humedad}%</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.boton, { marginTop: 20 }]}
              onPress={() => router.push({ pathname: "/explore", params: { ciudad } })}
            >
              <Text style={styles.botonTexto}>Ver pronóstico 7 días</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2f1",
    padding: 20,
    alignItems: "center",
  },
  searchCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f8ff",
    color: "#00796b",
    marginRight: 10,
  },
  boton: {
    backgroundColor: "#00796b",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  weatherCard: {
    width: "100%",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  city: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00796b",
    marginBottom: 10,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  temp: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#f57c00",
  },
  desc: {
    fontSize: 20,
    color: "#555",
    marginBottom: 15,
    textTransform: "capitalize",
    textAlign: "center",
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 15,
  },
  chip: {
    backgroundColor: "#f0f8ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 16,
    color: "#00796b",
    fontWeight: "bold",
  },
  error: {
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
