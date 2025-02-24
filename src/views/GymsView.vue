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
const reserveGym = (num) => {
  if (gymName.value) {
    // Verificar si ya existe una reserva para este gimnasio y tipo
    const existingReservation = arrayGyms.value.find(
      (reservation) => reservation.gymName === gymName.value && reservation.num === num
    );

    if (existingReservation) {
      alert(`Ya tienes reservado el gimnasio ${gymName.value} para ${getReservationType(num)}`);
    } else {
      // Agregar la nueva reserva
      arrayGyms.value.push({ gymName: gymName.value, num });
      localStorage.setItem('arrayGyms', JSON.stringify(arrayGyms.value));
      alert(`Has reservado en ${gymName.value} para ${getReservationType(num)}`);
    }
  }
};

// Función para obtener el tipo de reserva en texto
const getReservationType = (num) => {
  switch (num) {
    case 1:
      return '1 día';
    case 2:
      return '1 semana';
    case 3:
      return '1 mes';
    default:
      return 'desconocido';
  }
};
</script>

<template>
  <div class="container">
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
          <img :src="`/img/${selectedGym.name}.png`" alt="FitFinder Logo" />
          <p>Dirección: {{ selectedGym.address }}, {{ selectedGym.city }}</p>
          <p>Precios: Día: {{ selectedGym.pricing.one_day }}€ , Semana: {{ selectedGym.pricing.one_week }}€ , Mes: {{ selectedGym.pricing.one_month }}€
          </p>
          <p>Servicios: {{ selectedGym.services.join(', ') }}</p>
          <p>Calificación: {{ selectedGym.rating }} ⭐</p>

          <!-- Contenedor para los botones -->
          <div class="button-container">
            <button id="reserve-btn" @click="reserveGym(1)">Reservar 1 día</button>
            <button id="reserve-btn" @click="reserveGym(2)">Reservar 1 semana</button>
            <button id="reserve-btn" @click="reserveGym(3)">Reservar 1 mes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  color: black !important;
}

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

/* Contenedor para los botones */
.button-container {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}



.gym h3,
p {
  color: black !important;
}
</style>