<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    closeModal() {
      console.log('in app.vue')
    }
  }
}
</script>

<style lang="scss">
  .myNoti{

    font-family: Avenir;
    color: white;
    font-size: 0.9rem;
    padding: 10px;
    margin-top:8vh;
    margin-bottom: 10px;
    &.error{
      background-color: #d3113b;
    }
    &.success{
      background-color: #53E093;
    }
    &.warn{
      background-color:#ff7900;
    }
  }
</style>

