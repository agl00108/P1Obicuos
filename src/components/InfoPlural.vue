<template>
  <div class="map-container">
    <div id="map" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import { ref } from 'vue';

// Ubicaciones de los atletas dentro de Jaén
const athletes = ref([
  { rank: 1, name: 'Jugador 1', steps: 14567, latitud: 37.7796, longitud: -3.7845, porcentajeBateria: 50 }, // Coordenadas para Jaén
  { rank: 2, name: 'Jugador 2', steps: 14320, latitud: 37.7714, longitud: -3.7881, porcentajeBateria: 40 }, // Diferente ubicación en Jaén
  { rank: 3, name: 'Jugador 3', steps: 14000, latitud: 37.7654, longitud: -3.7900, porcentajeBateria: 90 }  // Otra ubicación en Jaén
]);

onMounted(() => {
  // Centrar el mapa en Jaén
  const map = L.map('map').setView([37.7796, -3.7845], 13); // Coordenadas de Jaén

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Añadir marcadores para cada jugador en las ubicaciones definidas
  athletes.value.forEach(athlete => {
    const marker = L.marker([athlete.latitud, athlete.longitud]).addTo(map);
    marker.bindPopup(`<b>${athlete.name}</b><br>PASOS: ${athlete.steps}<br>Batería: ${athlete.porcentajeBateria}%`);
  });
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.map {
  height: 100%;
}
</style>
