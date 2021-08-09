<template>
  <div class="signal">
    <button v-on:click="send">{{ signal.image }}</button>
    <p>{{ signal.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Signal',
  props: {
    signal: { type: Object }
  },
  methods: {
    send() {
      this.nature.post(`/1/signals/${this.signal.id}/send`)
      .then(json => console.log(json))
      .catch(err => console.error(err));
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signal {
  display: block;
  padding: 0;
  font-size: 50%;
  width: 4em;
  margin: 0.1em;
  text-align: center;
}

.signal > button {
  width: 3em;
  height: 3em;
  border-radius: 0.5em;
  border: 1px solid black;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>
