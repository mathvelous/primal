<template>
  <header>
    <div class="logo">
      <router-link :to="{ name: 'Home'}">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
    </div>
    <div class="menu">
      <div>
        <router-link :to="{ name: 'What'}">Qu'est ce que c'est ?</router-link>
        <router-link :to="{ name: 'Order'}">Commander</router-link>
        <router-link :to="{ name: 'Contact'}">Contact</router-link>
        <router-link :to="{ name: 'Account'}">Mon compte</router-link>
      </div>
      <router-link :to="{ name: 'Cart'}">
        <div class="icon">
          <img src="../assets/images/cart.svg" alt="Panier">
        </div>
      </router-link>
    </div>
  </header>

</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
      }
    },
    methods: {
      ifCookie: function (){

        //if(this.$cookies.get)
      }
    },
    mounted(){
      console.log(this.$cookies.isKey('connect.sid'))
    }
  }
</script>

<style lang="scss">

  $orange: #ff7900;

  header {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'fira_sansmedium';
    background-color: #22292E;
    a {
      text-decoration: none;
      color: #ffffff;
      font-size: 0.9rem;
      font-family: 'fira_sansmedium';
      letter-spacing: 0.5px;
    }
    .logo {
      margin: 1%;
      img {
        width: 70px;
        height: auto;
        margin-top: 15px;
      }
    }
  }

  .menu {
    display: flex;
    align-items: center;
    div{
      display: flex;
      justify-content: space-around;
      width: 40vw;
      a{

      }
    }
  }

  .icon {
    background-color: #ff7900;
    height: 8vh;
    max-width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 1%;
    img {
      width: 30px;
      height: auto;
    }
  }

</style>
