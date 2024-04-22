<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4" v-for="index in 6" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-card-title>Animazione rotativa {{ index }}</v-card-title>
          <v-card-text>
            <v-slider v-model="rotations[index - 1]" min="0" max="360" thumb-label></v-slider>
            <div class="gears">
              <div class="gear1" :style="{ transform: `rotate(${rotations[index - 1]}deg)` }"></div>
              <div class="gear2"></div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rotations: [0, 0, 0, 0, 0, 0],
    };
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
