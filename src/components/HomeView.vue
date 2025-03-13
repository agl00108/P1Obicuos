<template>
  <div class="ranking-container">
    <h1 class="title">RANKING</h1>
    <h2 class="subtitle">RESULTADOS DE LOS MEJORES ATLETAS</h2>

    <div v-if="athletes.length > 0" class="podium">
      <div class="rank rank-2">
        <div class="star">⭐ #2</div>
        <p>{{ athletes[1].name }}</p>
        <p>{{ athletes[1].steps }} PASOS</p>
        <button class="info-button" @click="goToInfo(athletes[1].name)">Más Info</button>
      </div>
      <div class="rank rank-1">
        <div class="star">⭐ #1</div>
        <p>{{ athletes[0].name }}</p>
        <p>{{ athletes[0].steps }} PASOS</p>
        <button class="info-button" @click="goToInfo(athletes[0].name)">Más Info</button>
      </div>
      <div class="rank rank-3">
        <div class="star">⭐ #3</div>
        <p>{{ athletes[2].name }}</p>
        <p>{{ athletes[2].steps }} PASOS</p>
        <button class="info-button" @click="goToInfo(athletes[2].name)">Más Info</button>
      </div>
    </div>

    <div v-else>
      <p>Cargando datos...</p>
    </div>

    <h2 class="subtitle">ÚLTIMA UBICACIÓN</h2>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import { useRouter } from 'vue-router';

// Fix Leaflet marker icons issue (if not already handled in your project)
import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const router = useRouter();
const athletes = ref([]);
let map = null; // Store the map instance to clean up later

const goToInfo = (name) => {
  router.push({ name: 'Info', params: { name } });
};

const loadAthletes = async () => {
  try {
    const response = await fetch('https://app2.tm1.es:3000/app/top3');
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      athletes.value = data.map((athlete, index) => ({
        rank: index + 1,
        name: athlete.name,
        steps: athlete.steps,
        latitud: athlete.latitud,
        longitud: athlete.longitud,
        porcentajeBateria: athlete.porcentajeBateria,
      }));
    } else {
      console.error('Los datos no son válidos o están vacíos:', data);
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const initializeMap = () => {
  if (athletes.value.length === 0) return; // Don't initialize map if no athletes

  // Initialize map with the first athlete's location as the center
  map = L.map('map', {
    center: [athletes.value[0].latitud, athletes.value[0].longitud],
    zoom: 13,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const bounds = [];
  athletes.value.forEach((athlete) => {
    const personIcon = L.divIcon({
      className: 'person-icon',
      html: '<span style="font-size: 24px;">👤</span>',
      iconSize: [30, 30],
    });

    const marker = L.marker([athlete.latitud, athlete.longitud], { icon: personIcon }).addTo(map);
    marker.bindPopup(
        `<b>${athlete.name}</b><br><span style="font-size: 24px;">👣</span> Pasos: ${athlete.steps}<br><span style="font-size: 24px;">🔋</span> Batería: ${athlete.porcentajeBateria}%`
    );
    bounds.push([athlete.latitud, athlete.longitud]);
  });

  // Adjust map to fit all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
};

onMounted(() => {
  loadAthletes().then(() => {
    initializeMap();
  });
});

onUnmounted(() => {
  // Clean up the map instance when the component is unmounted
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style>

body
{
  background-color: #b0d9f5;
}
.ranking-container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: #233d65;
}

.subtitle {
  font-size: 1.2rem;
  color: #233d65;
  margin-bottom: 20px;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
}

.rank {
  width: 150px;
  background-color: #193953;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 25px;
}

.rank-1 {
  height: 250px;
}

.rank-2,
.rank-3 {
  height: 200px;
}

.star {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.info-button {
  background-color: #b0d9f5;
  color: #34495e;
  border: none;
  padding: 9px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.info-button:hover {
  background-color: #b0d9f5;
}

.map-container {
  width: 100%;
  height: 400px; /* Fixed height for the map */
  margin-top: 20px;
}

.map {
  width: 100%;
  height: 100%;
}

/* Ensure the person icon is styled correctly */
.person-icon {
  background: none !important;
  border: none !important;
}
</style>
