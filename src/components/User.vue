<template>
  <p>ようこそ、{{ user.nickname }}</p>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: { type: Object }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
