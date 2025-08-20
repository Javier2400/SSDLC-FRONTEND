<template>
  <div class="versus-container">
    <h1>Pokemon versus</h1>

    <div class="pokemon-battle">
      <PokemonCard
        :pokemon="pokemonLeft"
        @vote="handleVote(pokemonLeft.id)" />
      <span class="vs">VS</span>
      <PokemonCard
        :pokemon="pokemonRight"
        @vote="handleVote(pokemonRight.id)" />
    </div>

    <button @click="fetchNewPair" :disabled="isLoading">
      {{ isLoading ? 'Cargando...' : 'Nuevo Duelo' }}
    </button>

    <div v-if="winner" class="winner">
      <h2>Ganador: {{ winner.name.toUpperCase() }}!</h2>
      <p>Votos: {{ votes[winner.id] || 0 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PokemonCard from './PokemonCard.vue';
import pokeapi from '@/api/axios';

const pokemonLeft = ref(null);
const pokemonRight = ref(null);
const winner = ref(null);
const votes = ref({});
const isLoading = ref(false);

const fetchRandom = async () => {
  isLoading.value = true;

  try {
    let randomIds = [
      Math.floor(Math.random() * 151) + 1,
      Math.floor(Math.random() * 151) + 1
    ];

    while (randomIds[0] === randomIds[1]) {
      randomIds[1] = Math.floor(Math.random() * 151) + 1;
    }

    const responses = await Promise.all([
      pokeapi.get(`pokemon/${randomIds[0]}`),
      pokeapi.get(`pokemon/${randomIds[1]}`)
    ]);

    pokemonLeft.value = responses[0].data;
    pokemonRight.value = responses[1].data;
    winner.value = null;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleVote = (pokemonId) => {
  votes.value[pokemonId] = (votes.value[pokemonId] || 0) + 1;
  winner.value = pokemonLeft.value.id === pokemonId ? pokemonLeft.value : pokemonRight.value;
};

const fetchNewPair = () => {
  fetchRandom();
};

onMounted(() => {
  fetchRandom();
});
</script>

<style scoped>
.versus-container {
  background-color: rgb(64, 126, 63);
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(255, 252, 252, 0.1);
}

.pokemon-battle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.vs {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #457b9d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #1d3557;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.winner {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #496c51;
  border-left: 5px solid #175f28;
  border-radius: 8px;
}
</style>

