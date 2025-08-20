<template>
  <div class="calculadora">
    <h1>Calculadora</h1>
    <input v-model.number="num1" type="number" placeholder="Número 1" />
    <input v-model.number="num2" type="number" placeholder="Número 2" />
    <div class="buttons">
      <button @click="operation = '+'">+</button>
      <button @click="operation = '-'">-</button>
      <button @click="operation = '*'">*</button>
      <button @click="operation = '/'">/</button>
    </div>
    <p v-if="operation">Resultado: {{ calculate }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
const operation = ref('');

const calculate = computed(() => {
  switch (operation.value) {
    case '+': return num1.value + num2.value;
    case '-': return num1.value - num2.value;
    case '*': return num1.value * num2.value;
    case '/': return num2.value !== 0 ? num1.value / num2.value : 'División por cero';
    default: return '';
  }
});
</script>

<style scoped>
.calculator {
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
}
.buttons button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
