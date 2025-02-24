<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado reactivo
const gyms = ref([]); // Lista de gimnasios
const arrayGyms = ref([]); // Reservas: [{ gymName: string, num: number }]
const noReservations = ref(false);

// Mapear reservas a datos completos del gimnasio + tipo
const filteredReservations = computed(() => {
  return arrayGyms.value.map(reservation => {
    const gym = gyms.value.find(g => g.name === reservation.gymName);
    return {
      ...gym,
      reservationType: reservation.num
    };
  });
});

// Cargar datos al montar el componente
onMounted(() => {
  gyms.value = JSON.parse(localStorage.getItem('lista-gyms') || '[]');
  arrayGyms.value = JSON.parse(localStorage.getItem('arrayGyms') || '[]');
  noReservations.value = arrayGyms.value.length === 0;
});

// Eliminar reserva específica
const eliminarReserva = (gymName, num) => {
  arrayGyms.value = arrayGyms.value.filter(reservation => 
    !(reservation.gymName === gymName && reservation.num === num)
  );
  localStorage.setItem('arrayGyms', JSON.stringify(arrayGyms.value));
  noReservations.value = arrayGyms.value.length === 0;
  alert(`Reserva eliminada: ${gymName} (${getReservationType(num)})`);
};

// Traducir tipo de reserva
const getReservationType = (num) => {
  switch (num) {
    case 1: return '1 día';
    case 2: return '1 semana';
    case 3: return '1 mes';
    default: return 'desconocido';
  }
};
// Redirigir a la página de pago
const pagar = (gymName, num) => {
  router.push({ name: 'pagar', query: { gymName, reservationType: num } });
};

// Navegar a la pantalla principal
const volverAtras = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="gym-list-container">
    <div id="gym-list">
      <!-- Si no hay reservas -->
      <div v-if="noReservations">
        <h3>Aún no has reservado un gimnasio</h3>
        <button @click="volverAtras">Atrás</button>
      </div>

      <!-- Si hay reservas -->
      <div v-else class="grid-container">
        <div v-for="(reservation, index) in filteredReservations" 
             :key="index" 
             class="gym">
          <h3>{{ reservation.name }}</h3>
          <img :src="`/img/${reservation.name}.png`" alt="Imagen del gimnasio" />
          <p>Tipo de reserva: {{ getReservationType(reservation.reservationType) }}</p>
          <div class="button-group">
            <button id="btnPagar" @click="pagar(reservation.name, reservation.reservationType)">Pagar</button>
            <button @click="eliminarReserva(reservation.name, reservation.reservationType)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gym-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

#gym-list {
  width: 100%;
  max-width: 1200px; /* Ajusta según sea necesario */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 20px; /* Espacio entre las tarjetas */
}

.gym {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
}

.gym img {
  width: 70%;
  height: 70%;
  border-radius: 10px;
  
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#btnPagar {
  background-color: #007bff;
}

button:hover {
  background-color: #cc0000;
}

h3 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin: 5px 0;
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Una columna en móviles */
  }
}
</style>