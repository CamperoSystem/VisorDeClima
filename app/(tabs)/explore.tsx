// app/explore.tsx
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ClimaDia {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    avghumidity: number;
    condition: { text: string; icon: string };
  };
}

const { width } = Dimensions.get("window");

export default function ExploreScreen() {
  const { ciudad } = useLocalSearchParams<{ ciudad: string }>();
  const [pronostico, setPronostico] = useState<ClimaDia[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ciudad) return;

    const fetchPronostico = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = "ec4970ff45f74b4eb9915254252208";
        const ciudadFormateada = ciudad.trim();
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudadFormateada}&days=7&lang=es`;

        const res = await fetch(url);
        const data = await res.json();
        console.log("Respuesta API:", data);

        if (data.error) {
          setError(data.error.message || "Ciudad no encontrada ❌");
          setPronostico(null);
        } else if (data.forecast && data.forecast.forecastday) {
          setPronostico(data.forecast.forecastday);
        } else {
          setError("No hay pronóstico disponible para esta ciudad ❌");
          setPronostico(null);
        }
      } catch (e) {
        setError("Error de conexión ⚠️");
        setPronostico(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPronostico();
  }, [ciudad]);

  
  const obtenerDiaSemana = (fecha: string) => {
  // fecha viene en formato "YYYY-MM-DD"
  const [year, month, day] = fecha.split("-").map(Number);
  const f = new Date(year, month - 1, day); // month es 0-indexado
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return dias[f.getDay()];
};


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Cargando pronóstico...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!pronostico || pronostico.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay información disponible.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico de 7 días en {ciudad}</Text>
      <FlatList
        data={pronostico}
        keyExtractor={(item) => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dia}>{obtenerDiaSemana(item.date)}</Text>
            <Text style={styles.fecha}>{item.date}</Text>
            <Image
              source={{ uri: `https:${item.day.condition.icon}` }}
              style={styles.icon}
            />
            <Text style={styles.desc}>{item.day.condition.text}</Text>
            <Text style={styles.temp}>
              {Math.round(item.day.avgtemp_c)}°C
            </Text>
            <Text style={styles.detail}>Min: {Math.round(item.day.mintemp_c)}°C | Max: {Math.round(item.day.maxtemp_c)}°C</Text>
            <Text style={styles.detail}>💨 {item.day.maxwind_kph} km/h</Text>
            <Text style={styles.detail}>💧 {item.day.avghumidity}%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2f1", // fondo azul suave tipo la imagen
    paddingTop: 30,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00796b",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    width: width * 0.6,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  dia: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  fecha: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  desc: {
    fontSize: 16,
    color: "#555",
    textTransform: "capitalize",
    marginBottom: 5,
    textAlign: "center",
  },
  temp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f57c00",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
