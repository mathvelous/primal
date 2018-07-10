<template>
  <header>
    <notifications classes="myNoti" group="notUser"/>
    <div class="logo">
      <router-link :to="{ name: 'Home'}">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
    </div>
    <div class="mobile_burger">
      <div v-if="mobileBurger" class="burger"></div>
    </div>
    <div  class="menu">
      <div v-if="menu">
        <router-link :to="{ name: 'What'}">Qu'est ce que c'est ?</router-link>
        <router-link :to="{ name: 'Order'}">Commander</router-link>
        <router-link :to="{ name: 'Contact'}">Contact</router-link>
        <a href="/account" @click.prevent="ifUser">Mon compte</a>
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
        mobileBurger: false,
        menu: true
      }
    },
    methods: {
      onResize: function () {
        if (window.innerWidth < 960) {
          this.mobileBurger = true
          this.menu = false
        }else {
          this.mobileBurger = false
          this.menu = true
        }
      },
      resize(){
        window.addEventListener('resize', this.onResize)
      },
      ifUser(){
        let cookie = this.$cookies.get('user')
        if (cookie == null){
          this.$notify({
            group: 'notUser',
            title: "Vous devez vous connecter ou créer un compte pour continuer.",
            duration: 5000,
            speed: 500,
            type: 'error'
          })
          this.$router.push('/signin')
        }else{
          this.$router.push('/account')
        }
      }
    },
    mounted() {
      console.log(this.$cookies.isKey('connect.sid'))
      this.onResize()
    },
    created() {
      this.resize()
    },
  }
</script>

<style lang="scss">
  a{
    cursor: pointer;
  }

  $orange: #ff7900;

  header {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: Avenir;
    background-color: #22292E;
    .logo {
      margin: 1%;
      img {
        width: 100px;
        height: auto;
        margin-top: 5px;
      }
    }
  }

  .menu {
    display: flex;
    align-items: center;
    div {
      display: flex;
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #ffffff;
        font-size: 0.9rem;
        letter-spacing: 0.5px;
        height: calc(8vh - 3px);
        width: 145px;
        transition: all ease 0.5s;
        border-bottom: 3px solid transparent;
        &:first-of-type {
          width: 215px;
        }
        &:hover, &:focus{
          background-color: #131719;
          border-bottom: 3px solid #ff7900;
        }
      }
    }
  }

  .icon {
    background-color: #ff7900;
    height: 8vh;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 1%;
    img {
      width: 30px;
      height: auto;
    }
  }

  .burger {
    position: relative;
    width: 40px;
    height: 3px;
    background-color: white;
    border-radius: 5px;
    right: 80px;
    &:before {
      position: absolute;
      content: '';
      top: 12px;
      width: 40px;
      height: 3px;
      background-color: white;
      border-radius: 5px;
    }
    &:after {
      position: absolute;
      content: '';
      bottom: 12px;
      width: 40px;
      height: 3px;
      background-color: white;
      border-radius: 5px;
    }
  }

  .mobile_burger{
    position: absolute;
    right: 15px;
    transform: translateY(35%);
  }

</style>
