<template>
  <div class="ranking-container">
    <h1 class="title">RANKING</h1>
    <h2 class="subtitle">RESULTADOS DE LOS MEJORES ATLETAS</h2>
    <div class="podium">
      <div class="rank rank-2">
        <div class="star">⭐ #2</div>
        <p>{{ athletes[1].name }}</p>
        <p>{{ athletes[1].steps }} PASOS</p>
        <a href="#">Consultar INFO</a>
      </div>
      <div class="rank rank-1">
        <div class="star">⭐ #1</div>
        <p>{{ athletes[0].name }}</p>
        <p>{{ athletes[0].steps }} PASOS</p>
        <a href="#">Consultar INFO</a>
      </div>
      <div class="rank rank-3">
        <div class="star">⭐ #3</div>
        <p>{{ athletes[2].name }}</p>
        <p>{{ athletes[2].steps }} PASOS</p>
        <a href="#">Consultar INFO</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const athletes = ref([
  { rank: 1, name: 'Jugador 1', steps: 14567 },
  { rank: 2, name: 'Jugador 2', steps: 14320 },
  { rank: 3, name: 'Jugador 3', steps: 14000 }
]);
</script>

<style scoped>
.ranking-container {
  text-align: center;
  background-color: #b0d9f5;
  padding: 20px;
}

.title {
  font-size: 2rem;
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
</style>
