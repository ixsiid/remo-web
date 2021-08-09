<template>
  <div v-if="authorized">
    <User :user="user" />
  </div>
  <div v-else>
    <input
      type="text"
      placeholder="Enter OAuth key"
      v-model="_key"
      :disabled="authorizing"
    />
    <input
      type="button"
      value="認証"
      @click="process_authorize(_key)"
      :disabled="authorizing"
    />
  </div>
  <ul class="devices">
    <li v-for="device in devices" :key="device.id">
      <Device :device="device" :appliances="appliances.filter(x => x.device.id == device.id)" />
    </li>
  </ul>
</template>

<script>
import User from "./User.vue";
import Device from "./Device.vue";

export default {
  name: "Auth",
  components: { User, Device },
  props: {
    auth_key: { type: String },
  },
  data() {
    return {
      authorized: false,
      authorizing: false,
      token: "",
      nickname: "",
      devices: [],
      appliances: [],
    };
  },
  computed: {
    _key: {
      get() {
        return this.auth_key;
      },
      set(value) {
        this.$emit("change", value);
      },
    },
  },
  mounted() {
    console.log(`mounted: ${new Date()}`);
    console.log(this.nature);
    if (this.auth_key) this.process_authorize(this.auth_key);
  },
  methods: {
    error(error) {
      console.log(error);
    },
    process_authorize(token) {
      this.authorizing = true;
      this.nature.token = token;
      this.nature.get('/1/users/me')
        .finally(() => (this.authorizing = false))
        .then(json => {
          console.log(json);
          if (json.nickname) {
            this.authorized = true;
            this.token = token;

            this.user = json;
            this.get_devices();
          }
        })
        .catch((err) => {
          this.authorized = false;
          console.error(err);
        });
    },
    get_devices() {
      this.nature.get(['/1/devices', '/1/appliances'])
        .then(([devices, appliances]) => {
          this.devices = devices;
          this.appliances = appliances;
        })
        .catch(err => this.error(err));
    },
  },
};
</script>

<style scoped>
.devices {
  margin: 0;
  padding: 0;

  display: grid;
  column-gap: 1em;
  justify-items: stretch;
  justify-content: center;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 10em);
  align-items: stretch;
}

.devices > * {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
