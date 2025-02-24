<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Datos de la reserva
const gymName = ref(route.query.gymName || '');
const reservationType = ref(Number(route.query.reservationType) || '');

// Datos del formulario de pago
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const paymentSuccess = ref(false);


// Simular el proceso de pago
const procesarPago = () => {
  if (cardNumber.value && expiryDate.value && cvv.value) {
    paymentSuccess.value = true;
    setTimeout(() => {
      router.push({ name: 'reservas' }); // Redirigir a la página de reservas después de 2 segundos
    }, 2000);
  } else {
    alert('Por favor, completa todos los campos.');
  }
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

// Volver a la página de reservas
const volverAtras = () => {
  router.push({ name: 'reservas' });
};
</script>

<template>
  <div class="pago-container">
    <h2>Pasarela de Pago</h2>
    <div v-if="!paymentSuccess" class="formulario-pago">
      <p>Reserva: {{ gymName }} ({{ getReservationType(reservationType) }})</p>
      <div class="form-group">
        <label for="cardNumber">Número de tarjeta:</label>
        <input type="text" id="cardNumber" v-model="cardNumber" placeholder="1234 5678 9012 3456" />
      </div>
      <div class="form-group">
        <label for="expiryDate">Fecha de expiración:</label>
        <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" />
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" placeholder="123" />
      </div>
      <button @click="procesarPago">Pagar</button>
      <button id="btnCancelar" @click="volverAtras">Cancelar</button>
    </div>
    <div v-else class="pago-exitoso">
      <h3>¡Pago exitoso!</h3>
      <p>Redirigiendo a la página de reservas...</p>
    </div>
  </div>
</template>

<style scoped>
.pago-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: black !important;
}

.formulario-pago {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  
  gap: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#btnCancelar {
    background-color: #ff4444;
}
button:hover {
  background-color: #0056b3;
}

.pago-exitoso {
  color: green;
}
</style>