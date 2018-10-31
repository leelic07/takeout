<template>
  <section class="app-main">
    <transition name="fade"
      mode="out-in">
      <router-view :key="key"></router-view>
      <!-- <router-view></router-view> -->
    </transition>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    ...mapActions({
      linkWebsocket: 'linkWebsocket'
    })
  },
  mounted() {
    this.linkWebsocket()
  }
}
</script>
