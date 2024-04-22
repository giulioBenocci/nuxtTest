<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4" v-for="(rotation, index) in rotations" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Animazione rotativa {{ index + 1 }}</v-card-title>
          <v-card-text>
            <div class="gears">
              <div class="gear1" :style="{ transform: `rotate(${rotation}deg)` }"></div>
              <div class="gear2"></div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mqtt from 'mqtt';

export default {
  data() {
    return {
      rotations: [0, 0, 0, 0, 0, 0],
      mqttClient: null,
    };
  },
  created() {
    this.connectToMQTT();
  },
  methods: {
    connectToMQTT() {
      const options = {
    username: 'utente1',
    password: 'password'
   };
      this.mqttClient = mqtt.connect('mqtt://127.0.0.1:1883'); // Inserisci l'URL del broker MQTT
      this.mqttClient.on('connect', () => {
        console.log('Connesso al broker MQTT');
        this.subscribeToTopics();
      });
      this.mqttClient.on('message', (topic, message) => {
        console.log(`Messaggio ricevuto sul topic ${topic}: ${message.toString()}`);
        // Aggiorna la rotazione in base al messaggio ricevuto
        const index = parseInt(topic.split('/')[1]); // Assume che il topic sia nella forma 'rotations/<index>'
        if (!isNaN(index) && index >= 0 && index < this.rotations.length) {
          this.$set(this.rotations, index, parseFloat(message.toString()));
        }
      });
    },
    subscribeToTopics() {
      this.rotations.forEach((_, index) => {
        const topic = `rotations/${index}`;
        this.mqttClient.subscribe(topic, (err) => {
          if (err) {
            console.error(`Errore durante la sottoscrizione al topic ${topic}:`, err);
          } else {
            console.log(`Sottoscrizione al topic ${topic} avvenuta con successo`);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.gears {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.gear1, .gear2 {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  position: absolute;
}

.gear1 {
  border-bottom: 50px solid #333;
  transform-origin: center bottom;
}

.gear2 {
  border-bottom: 50px solid #555;
}
</style>
