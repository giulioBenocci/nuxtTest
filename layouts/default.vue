<template>
  <v-layout class="rounded rounded-md">
    <client-only>
      <v-app-bar :elevation="24" :color="nightMode ? 'teal-darken-4' : 'green-accent-1'" height="90" density="compact">
        <!--
        <template v-slot:prepend>
          <v-app-bar-nav-icon v-if="!isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        -->
        <v-app-bar-title>
          Dashboard Operativa
        </v-app-bar-title>
      
        <!-- Pulsanti visibili solo su schermi larghi -->
        <template v-if="!isMobile">
          <NuxtLink to="/">
            <v-btn :color="nightMode ? 'white' : 'black'">
              <v-icon :color="nightMode ? 'white' : 'black'">mdi-home</v-icon>
              Home
            </v-btn>
          </NuxtLink>

          <NuxtLink to="/about">
            <v-btn :color="nightMode ? 'white' : 'black'">
             <v-icon left :color="nightMode ? 'white' : 'black'">mdi-account-group</v-icon>
             Su di Noi
          </v-btn>
          </NuxtLink>

          <NuxtLink to="/services">
           <v-btn :color="nightMode ? 'white' : 'black'">
              <v-icon :color="nightMode ? 'white' : 'black'">mdi-toolbox-outline</v-icon>
             Servizi
           </v-btn>
          </NuxtLink>

          <NuxtLink to="/contact">
           <v-btn :color="nightMode ? 'white' : 'black'">
              <v-icon :color="nightMode ? 'white' : 'black'">mdi-human-greeting-proximity</v-icon>
              Contatti
           </v-btn>
          </NuxtLink>
        </template>


        <!-- Pulsante menu per schermi piccoli -->
        <v-menu v-else offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon :color="nightMode ? 'white' : 'black'">mdi-menu</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="navigateTo('/')">
              <v-icon>mdi-home</v-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('/about')">
            
              <v-icon>mdi-account-group</v-icon>
            
              <v-list-item-title>Su di Noi</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('/services')">
            
              <v-icon>mdi-toolbox-outline</v-icon>
            
              <v-list-item-title>Servizi</v-list-item-title>
            </v-list-item>

            <v-list-item @click="navigateTo('/contact')">
              <v-icon>mdi-human-greeting-proximity</v-icon>
              <v-list-item-title>Contatti</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    
        <template v-slot:append>
          <v-btn icon @click="nightMode = !nightMode">
            <v-icon :color="nightMode ? 'white' : 'black'">{{ nightMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
        </template>
      </v-app-bar>
       <!-- Resto del componente 
         <v-navigation-drawer v-model="drawer" :color="nightMode ? 'grey-lighten-1' : 'blue-grey-darken-4'" app>
          <v-list>
           <v-list-item title="Navigation drawer"></v-list-item>
          </v-list>
         </v-navigation-drawer>   -->
      <v-main class="d-flex align-center justify-center" style="min-height: 250px;">
        <NuxtPage />
      </v-main>
    </client-only>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      nightMode: false,
      isMobile: false, // Aggiunto per gestire la visibilità dei pulsanti del menu
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
},

  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 960; // Esempio di breakpoint, può variare
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },

    // Altre funzioni...
  watch: {
    nightMode(newValue) {
      if (newValue) {
        // Attiva la modalità notturna
        document.body.classList.add("night-mode");
      } else {
        // Disattiva la modalità notturna
        document.body.classList.remove("night-mode");
      }
    },
  },
};
</script>

<style>
.night-mode {
  background-color: #2c3e50; /* Un esempio di colore per la modalità notturna */
  color: #ecf0f1; /* Colore del testo in modalità notturna */
}
/* Aggiungi qui ulteriori stili per la modalità notturna se necessario */
</style>
