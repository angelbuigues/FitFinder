<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Headerino from './components/Header.vue';
import Footerino from './components/Footer.vue';
import './assets/canvas.js';

</script>

<template>
  <div class="cuerpo">
    <Headerino />
    <div id="blackTEXT">
      <p>¡¡ Encuentra tu gimnasio ideal !!</p>
    </div>

    <RouterView />
    <Footerino />
  </div>
</template>

<style>

.cuelpo {
  display: grid;
  grid-template-rows: 2000px auto;
  height: 100vh;
}
#blackTEXT p{
  color: black !important;
  font-size: 25px;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
