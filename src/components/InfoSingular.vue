<template>
  <div class="info-container">
    <h1>Información de {{ name }}</h1>

    <p v-if="loading">Cargando información...</p>

    <div v-if="athleteData.length > 0">
      <!-- Gráfico de pasos por día -->
      <h2>Pasos en los últimos 7 días</h2>
      <canvas id="stepsChart"></canvas>

      <!-- Gráfico de porcentaje de batería -->
      <h2>Porcentaje de batería por día</h2>
      <canvas id="batteryChart"></canvas>

      <!-- Mapa de últimas ubicaciones -->
      <h2>Últimas Ubicaciones</h2>
      <div id="map" style="height: 400px; width: 100%;"></div>
    </div>

    <p v-else-if="error">{{ error }}</p>

    <router-link to="/" class="home-button">Atrás</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';
import L from 'leaflet';

const route = useRoute();
const name = ref(route.params.name);
const athleteData = ref([]);
const loading = ref(true);
const error = ref('');
const personIcon = L.divIcon({
  className: 'person-icon',
  html: '<span style="font-size: 24px;">👤</span>',
  iconSize: [30, 30],
});

const loadAthleteData = async () => {
  try {
    const response = await fetch(`https://app2.tm1.es:3000/app/identifier/${name.value}`);
    const data = await response.json();
    // Ordenar de más antiguo a más nuevo
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 7);
    athleteData.value = sortedData;
  } catch (err) {
    error.value = 'Error al obtener los datos del atleta.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const generateCharts = () => {
  const labels = athleteData.value.map(item => new Date(item.date).toLocaleDateString());
  const stepsData = athleteData.value.map(item => item.steps);
  const batteryData = athleteData.value.map(item => item.porcentajeBateria);

  const stepsCtx = document.getElementById('stepsChart').getContext('2d');
  new Chart(stepsCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Pasos',
        data: stepsData,
        borderColor: '#233d65',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Fecha' }},
        y: { title: { display: true, text: 'Pasos' }}
      },
      plugins: {
        legend: {
          labels: {
            color: '#34495e'
          }
        }
      }
    }
  });

  const batteryCtx = document.getElementById('batteryChart').getContext('2d');
  new Chart(batteryCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Porcentaje de batería',
        data: batteryData,
        borderColor: '#497cca',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Fecha' }},
        y: { title: { display: true, text: 'Porcentaje' }}
      },
      plugins: {
        legend: {
          labels: {
            color: '#34495e'
          }
        }
      }
    }
  });
};

const generateMap = () => {
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const locations = athleteData.value
      .filter(item => item.latitud && item.longitud)
      .map(item => [item.latitud, item.longitud]);

  if (locations.length > 0) {
    locations.forEach(([lat, lon], index) => {
      L.marker([lat, lon], { icon: personIcon })
          .addTo(map)
          .bindPopup(`${new Date(athleteData.value[index].date).toLocaleDateString()}`);
    });

    const bounds = L.latLngBounds(locations);
    map.fitBounds(bounds);
  }
};

onMounted(async () => {
  await loadAthleteData();

  if (athleteData.value.length > 0) {
    generateCharts();
    generateMap();
  }
});
</script>

<style scoped>
.info-container {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  min-height: 80vh;
  background: #193953;
  border-radius: 10px;
  width: 900px;
}

h1 {
  font-size: 2rem;
  color: #ffffff;
}

h2 {
  font-size: 1.5rem;
  margin-top: 20px;
  color: #ffffff;
}

canvas {
  background-color: #ffffff;
  margin: 20px auto;
  display: block;
  width: 800px;
  border-radius: 5px;
}

.home-button {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #497cca;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.home-button:hover {
  background-color: #b0d9f5;
}

#map {
  margin: 20px auto;
  border-radius: 5px;
  background-color: #ffffff;
}

.person-icon {
  text-align: center;
}
</style>