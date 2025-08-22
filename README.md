🌤️ Visor de Clima

Una aplicación móvil desarrollada con React Native y Expo que permite consultar el clima actual y el pronóstico de 7 días para cualquier ciudad. Esta app utiliza OpenWeatherMap para el clima actual y WeatherAPI para el pronóstico semanal.

🔹 Funcionalidades

Buscar cualquier ciudad del mundo.

Mostrar el clima actual:

Temperatura

Descripción

Icono del clima

Velocidad del viento

Humedad

Ver pronóstico de 7 días en un carrusel horizontal:

Temperatura promedio, mínima y máxima

Condición del clima con icono

Viento y humedad

Animaciones suaves al mostrar la información.

Gradientes dinámicos según el tipo de clima.

Manejo de errores para ciudad no encontrada o problemas de conexión.

📸 Capturas de pantalla

Pantalla principal (buscar ciudad y clima actual):

<img width="265" height="584" alt="image" src="https://github.com/user-attachments/assets/80ed7627-1ee5-435d-be07-e963dd4441a2" />


Pronóstico de 7 días:

<img width="267" height="587" alt="image" src="https://github.com/user-attachments/assets/2f0f88f5-75e5-43f6-8ad4-f51fc6e4bf99" />


⚡ Tecnologías

React Native

Expo

TypeScript

React Navigation / Expo Router

API OpenWeatherMap

API WeatherAPI

Expo LinearGradient para efectos de fondo

Animaciones con Animated

🚀 Instalación

Clonar el repositorio:

git clone https://github.com/CamperoSystem/VisorDeClima.git

cd VisorDeClima


Instalar dependencias:

npm install


Instalar Expo CLI si no lo tienes:

npm install -g expo-cli


Iniciar la app:

npx expo start


Se abrirá el navegador con el Metro Bundler para correr la app en Android, iOS o simulador web.

🔑 Configuración de APIs

OpenWeatherMap:
Crea una cuenta en OpenWeatherMap
 y reemplaza tu apiKey en Index.tsx.

WeatherAPI:
Crea una cuenta en WeatherAPI
 y reemplaza tu apiKey en explore.tsx.

🛠️ Estructura del proyecto
/app
  ├─ index.tsx        -> Pantalla principal
  ├─ explore.tsx     -> Pronóstico 7 días
/assets
  ├─ screenshots     -> Capturas de pantalla

📌 Uso

Ingresar el nombre de la ciudad en la barra de búsqueda.

Presionar Buscar.

Visualizar el clima actual.

Presionar Ver pronóstico 7 días para ver el pronóstico semanal en un carrusel horizontal.

⚠️ Notas

Asegúrate de tener conexión a Internet para consultar las APIs.

Si la ciudad no existe o hay un error de red, se mostrará un mensaje de error en la app.

Los gradientes y colores cambian según el tipo de clima para mejorar la experiencia visual.
