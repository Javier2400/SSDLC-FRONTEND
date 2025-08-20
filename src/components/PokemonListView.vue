<template>
  <div class="pokemon-list-container">
    <h1>Lista de Pokémon</h1>
    <button @click="fetchAllPokemons" :disabled="isLoading">
      {{ isLoading ? 'Cargando...' : 'Cargar Pokémon' }}
    </button>

    <p v-if="error" class="error">Error: {{ error }}</p>

    <ul class="pokemon-list" v-if="pokemons.length && !isLoading">
      <li
        class="pokemon-item"
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        @click="showDetails(pokemon)"
      >
        {{ pokemon.name.toUpperCase() }}
      </li>
    </ul>

    <div v-if="selectedPokemon" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        <h2>{{ selectedPokemon.name.toUpperCase() }}</h2>
        <img
          :src="selectedPokemon.sprites.front_shiny"
          :alt="selectedPokemon.name"
        />
        <p><strong>Tipos:</strong> {{ types }}</p>
        <p><strong>HP:</strong> {{ selectedPokemon.stats[0].base_stat }}</p>
        <p><strong>Ataque:</strong> {{ selectedPokemon.stats[1].base_stat }}</p>
        <p><strong>defensa:</strong>{{ selectedPokemon.stats[2].base_stat }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import pokeapi from '@/api/axios';

const pokemons = ref([]);
const selectedPokemon = ref(null);
const isLoading = ref(false);
const error = ref(null);

const fetchAllPokemons = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await pokeapi.get('pokemon?limit=50');
    pokemons.value = response.data.results;
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const showDetails = async (pokemon) => {
  try {
    const response = await pokeapi.get(pokemon.url);
    selectedPokemon.value = response.data;
  } catch (err) {
    error.value = 'No se pudieron cargar los detalles.';
  }
};

const closeModal = () => {
  selectedPokemon.value = null;
};

const types = computed(() =>
  selectedPokemon.value?.types?.map((t) => t.type.name).join(', ') || 'Desconocido'
);

onMounted(fetchAllPokemons);
</script>

<style scoped>
.pokemon-list-container {
  padding: 2rem;
  background-color: white;
  color: black;
  max-width: 900px;
  margin: auto;
  border-radius: 12px;
}

.pokemon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.pokemon-item {
  background: #f2f2f2;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  padding: 0.75rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-item:hover {
  background: #ddd;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>