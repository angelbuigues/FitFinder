<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Obtener el nombre del gimnasio desde los parámetros de la ruta
const gymName = ref(route.params.name);
const gyms = ref(JSON.parse(localStorage.getItem('lista-gyms'))); // Lista de gimnasios cargada de LocalStorage
const arrayGyms = ref(JSON.parse(localStorage.getItem('arrayGyms')) || []); // Gimnasios reservados
const selectedGym = ref(null); // Gimnasio seleccionado

// Buscar el gimnasio seleccionado por su nombre
onMounted(() => {
  if (gymName.value) {
    selectedGym.value = gyms.value.find((gym) => gym.name === gymName.value);
  }
});

// Volver a la página principal
const goBack = () => {
  router.push('/');
};

// Reservar gimnasio
const reserveGym = () => {
  if (gymName.value && !arrayGyms.value.includes(gymName.value)) {
    arrayGyms.value.push(gymName.value);
    localStorage.setItem('arrayGyms', JSON.stringify(arrayGyms.value));
    alert(`Has reservado en ${gymName.value}`);
  } else {
    alert(`Ya tienes reservado el gimnasio ${gymName.value}`);
  }
};
</script>

<template>
  <div>
    <!-- Si el gimnasio no existe, mostrar mensaje y botón para volver -->
    <div v-if="!selectedGym">
      <h3>El gimnasio seleccionado no existe.</h3>
      <button id="volver-btn" @click="goBack">Atrás</button>
    </div>

    <!-- Mostrar detalles del gimnasio si está seleccionado -->
    <div v-else>
      <div class="gym">
        <h3>{{ selectedGym.name }}</h3>
        <img
          :src="`/src/assets/img/${selectedGym.name}.png`"
          alt="FitFinder Logo"
        />
        <p>Dirección: {{ selectedGym.address }}, {{ selectedGym.city }}</p>
        <p>Calificación: {{ selectedGym.rating }} ⭐</p>
        <p>Servicios: {{ selectedGym.services.join(', ') }}</p>
        <button id="reserve-btn" @click="reserveGym">Reservar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gym {
  margin: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.gym img {
  width: 70%;
  height: 70%;
  border-radius: 10px;
}

.gym h3 {
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.gym h3,p{
  color: black !important;
}
</style>
