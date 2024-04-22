<template>
<v-container fill-height>
    <v-card class="flex">
      <v-data-table
        :headers="headers"
        :items="storico"
        :search="search"
        :loading="loading"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @update:page="loadItems"
        @update:items-per-page="onItemsPerPageChange"
        :server-items-length="totalItems"
        :items-per-page-options="[5, 10, 15, 20, 25, 30]"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>STORICO AGGIUNTE</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Cerca" single-line hide-details></v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      headers: [
        {
          title: 'Timestamp',
          text: 'Timestamp',
          align: 'start',
          sortable: true,
          value: 'tme',
        },
        { title: 'Millilitri A', text: 'ml_a', value: 'ml_a', sortable: true, },
        { title: 'Millilitri B', text: 'ml_b', value: 'ml_b', sortable: true, },
        { title: 'Millilitri C', text: 'ml_c', value: 'ml_c', sortable: true, },
        { title: 'Millilitri D', text: 'ml_d', value: 'ml_d', sortable: true, },
        { title: 'Grammi Fanghi',text: 'gr_f', value: 'gr_f', sortable: true, },
      ],
      search: '',
      storico: [],
      loading: true,
      totalItems: 0,
      itemsPerPage: 5,
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.loading = true;
      fetch('http://127.0.0.1:3001/storico')
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore durante il caricamento dei dati: ' + response.status);
          }
          return response.json();
        })
        .then(data => {
            data.forEach(item => {
      // Verifica se l'elemento esiste e se è una stringa rappresentante un valore numerico
      if (item[0] && typeof item[0] === 'number') {
        // Converti il valore Epoch nel suo equivalente in Date e sostituisci l'elemento nell'array
        item[0] = new Date(item[0]);
      }
    });
          this.storico = data;
          this.totalItems = data.length;
          
          this.loading = false;
        })
        .catch(error => {
          console.error('Errore durante il caricamento dei dati:', error);
          this.loading = false;
        });
    },
    onItemsPerPageChange(value) {
      // Verifica se il valore selezionato è diverso dal valore attuale di itemsPerPage
      if (value !== this.itemsPerPage) {
        // Aggiorna il numero di elementi per pagina
        this.itemsPerPage = value;
        // Carica gli elementi con il nuovo numero di elementi per pagina
        this.loadItems();
      }
    },
  },
};

</script>

<style scoped>
/* Stili personalizzati */
</style>
