<template>
  <div class="appliance">
    <p>{{ appliance.nickname }} <button @click="log">log</button></p>
    <ul class="signals">
      <li v-for="signal in signals" :key="signal.id"><Signal :signal="signal" /></li>
    </ul>
  </div>
</template>

<script>
import Signal from './Signal.vue';

export default {
  name: 'Appliance',
  components: { Signal, },
  props: {
    appliance: { type: Object, required: true }
  },
  data() {
    return {
      signals: []
    };
  },
  mounted() {
    if (this.appliance)
    this.nature.get(`/1/appliances/${this.appliance.id}/signals`)
      .then(json => this.signals = json);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appliance {
  display: block;
  padding: 0.2em 0;
  border: 1px solid gray;
  border-radius: 0.3em;
  text-align: start;
}

.appliance > p {
  margin: 0.2em 0.5em;
}

.signals {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.signals > * {
  margin: 0.3em;
  padding: 0;
  list-style: none;
}
</style>
