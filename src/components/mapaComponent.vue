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
  { rank: 1, name: 'Jugador 1', steps: 14567, latitud: 37.7796, longitud: -3.7845, porcentajeBateria: 50 },
  { rank: 2, name: 'Jugador 2', steps: 14320, latitud: 37.7714, longitud: -3.7881, porcentajeBateria: 40 },
  { rank: 3, name: 'Jugador 3', steps: 14000, latitud: 37.7654, longitud: -3.7900, porcentajeBateria: 90 }
]);

onMounted(() => {

  const map = L.map('map', {
    center: [37.7796, -3.7845],
    zoom: 13,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Añadir marcadores con emoticonos
  athletes.value.forEach(athlete => {
    // Crear un icono con el emoticono de una persona
    const personIcon = L.divIcon({
      className: 'person-icon',
      html: '<span style="font-size: 24px;">👤</span>',
      iconSize: [30, 30]
    });

    const marker = L.marker([athlete.latitud, athlete.longitud], { icon: personIcon }).addTo(map);
    marker.bindPopup(`<b>${athlete.name}</b><br><span style="font-size: 24px;">👣</span> Pasos: ${athlete.steps}<br><span style="font-size: 24px;">🔋</span> Batería: ${athlete.porcentajeBateria}%`);
  });
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 50vh;
}

.map {
  height: 100%;
}

.person-icon {
  text-align: center;
  line-height: 30px;
}
</style>
