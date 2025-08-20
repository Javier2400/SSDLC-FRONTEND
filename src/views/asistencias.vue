<template>
  <div>
    <h2>Registro de Asistencias</h2>

    <button @click="regresar">incidencias</button>

    <form @submit.prevent="registrarAsistencia">
      <input type="text" v-model="nombre" placeholder="Nombre" required />

      <input type="date" v-model="fecha" required />

      <input type="time" v-model="horaEntrada" required />

      <input type="time" v-model="horaSalida" />

      <input type="text" v-model="estado" placeholder="Estado" />

      <button type="submit">Registrar</button>
    </form>

    <h3>Lista de Asistencias</h3>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>ID Usuario</th>
          <th>Fecha</th>
          <th>Hora Entrada</th>
          <th>Hora Salida</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asistencia in asistencias" :key="asistencia.id">
          <td>{{ asistencia.user_id }}</td>
          <td>{{ asistencia.fecha }}</td>
          <td>{{ asistencia.hora_entrada }}</td>
          <td>{{ asistencia.hora_salida || '-' }}</td>
          <td>{{ asistencia.estado || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from './../api/axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      nombre: '',
      fecha: '',
      horaEntrada: '',
      horaSalida: '',
      estado: '',
      asistencias: []
    };
  },
  mounted() {
    this.cargarAsistencias();
  },
  methods: {
    cargarAsistencias() {
      axios.get('/api/asistencias')
        .then(response => {
          this.asistencias = response.data;
        });
    },
    registrarAsistencia() {
      axios.post('/api/asistencias', {
        fecha: this.fecha,
        hora_entrada: this.horaEntrada,
        hora_salida: this.horaSalida,
        estado: this.estado,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'La asistencia fue registrada correctamente',
          timer: 2000,
          showConfirmButton: false
        });

        this.fecha = '';
        this.horaEntrada = '';
        this.horaSalida = '';
        this.estado = '';
        this.cargarAsistencias();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema registrando la asistencia',
        });
      });
    },
    regresar() {
      this.$router.push('/incidences');
    }
  }
};
</script>
