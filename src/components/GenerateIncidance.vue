<template>
    <div class="incidance-from">
        <h1>Generaar incidencia</h1>

        <div class="selector">
            <label for="Lugar:"></label>
            <select v-model="placeSelected">
                <option disabled value=""></option>
                <option v-for="(items, place)" value=""></option>
            </select>
        </div>
    </div>
</template>
<script setup></script>
<style scoped></style>