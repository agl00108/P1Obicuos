<template>
  <div class="ranking-container">
    <h1 class="title">RANKING</h1>
    <h2 class="subtitle">RESULTADOS DE LOS MEJORES ATLETAS</h2>
    <div v-if="athletes.length > 0" class="podium">
      <div class="rank rank-2">
        <div class="star">⭐ #2</div>
        <p>{{ athletes[1].name }}</p>
        <p>{{ athletes[1].steps }} PASOS</p>
        <button class="info-button">Más Info</button>
      </div>
      <div class="rank rank-1">
        <div class="star">⭐ #1</div>
        <p>{{ athletes[0].name }}</p>
        <p>{{ athletes[0].steps }} PASOS</p>
        <button class="info-button">Más Info</button>
      </div>
      <div class="rank rank-3">
        <div class="star">⭐ #3</div>
        <p>{{ athletes[2].name }}</p>
        <p>{{ athletes[2].steps }} PASOS</p>
        <button class="info-button">Más Info</button>
      </div>
    </div>
    <div v-else>
      <p>Cargando datos...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const athletes = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://51.68.136.57:3000/app/data');
    const data = await response.json();

    athletes.value = data.map((athlete, index) => ({
      rank: index + 1,
      name: athlete.name,
      steps: athlete.steps,
      latitud: athlete.latitud,
      longitud: athlete.longitud,
      porcentajeBateria: athlete.porcentajeBateria
    }));
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
});
</script>

<style scoped>
.ranking-container {
  text-align: center;
  background-color: #b0d9f5;
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
  background-color: #34495e;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.rank-1 {
  height: 200px;
}

.rank-2, .rank-3 {
  height: 150px;
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
</style>
