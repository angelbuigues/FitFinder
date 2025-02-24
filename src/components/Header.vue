<script setup>
import themeController from '../components/ThemeController.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false); // Estado para controlar la visibilidad del menú

function Home() {
  router.push('/');
}
function Mapa() {
  router.push('/mapa');
}
function Reserva() {
  router.push('/reservas');
}

// Función para alternar la visibilidad del menú
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="md:flex md:items-center md:gap-12">
          <a class="block" href="#">
            <span class="sr-only">Home</span>
            <img @click.prevent="Home" class="h-8" viewBox="0 0 28 24" :src="`/img/Logo_fitfinder.png`" alt="logo">
          </a>
        </div>

        <div class="hidden md:block">
          <nav aria-label="Global">
            <ul class="flex items-center gap-6 text-sm"></ul>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <themeController />
          <div class="sm:flex sm:gap-4">
            <!-- Botones para pantallas grandes -->
            <div class="hidden sm:flex">
              <a @click.prevent="Home"
                class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500"
                href="#"
              >
                Home
              </a>
            </div>
            <div class="hidden sm:flex">
              <a @click.prevent="Mapa"
                class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500"
                href="#"
              >
                Mapa
              </a>
            </div>
            <div class="hidden sm:flex">
              <a @click.prevent="Reserva"
                class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500"
                href="#"
              >
                Reserva
              </a>
            </div>
          </div>

          <!-- Botón de menú para móviles -->
          <div class="block md:hidden">
            <button @click="toggleMenu" class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menú desplegable para móviles -->
      <div v-if="isMenuOpen" class="md:hidden mt-4">
        <div class="flex flex-col gap-2">
          <a @click.prevent="Home"
            class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500 text-center"
            href="#"
          >
            Home
          </a>
          <a @click.prevent="Mapa"
            class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500 text-center"
            href="#"
          >
            Mapa
          </a>
          <a @click.prevent="Reserva"
            class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-yellow-500 text-center"
            href="#"
          >
            Reserva
          </a>
          <br>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Estilos adicionales si es necesario */
</style>