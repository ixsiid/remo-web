<template>
  <div class="device">
    <p>{{ device.name }}</p>
    <ul class="sensors">
      <li v-for="sensor in Object.keys(device.newest_events)" :key="sensor">
        {{ ({te:'気温', hu:'湿度', il:'明るさ', mo:'人感'})[sensor] }} : {{ device.newest_events[sensor].val }} {{ ({te:'℃', hu:'%', il:'', mo:''})[sensor] }}
      </li>
    </ul>
  </div>
  <ul class="appliances">
    <li v-for="appliance in appliances" :key="appliance.id">
      <Appliance :appliance="appliance" />
    </li>
  </ul>
</template>

<script>
import Appliance from './Appliance.vue';

export default {
  name: 'Device',
  components: { Appliance },
  props: {
    device: { type: Object },
    appliances: { type: Array },
  },
  methods: {
    log() { console.log(this.device); console.log(this.appliances); },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.device {
  background-color: lightgray;
  padding: 1em;
  border: 1px solid black;
  border-radius: 1em;
  height: 7em;
  margin-bottom: 2em;
}

.appliances {
  margin: 0;
  padding: 0;

  display: grid;
  row-gap: 1em;
  grid-auto-flow: row;  
  justify-items: stretch;
  align-items: stretch;
  align-content: center;
}

.appliances > * {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sensors {
  font-size: 50%;
  list-style: none;
  text-align: start;
  margin: 0.3em 0 0 auto;
}
</style>
