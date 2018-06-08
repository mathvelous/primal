<template>
  <header>
    <div class="logo">
      <router-link :to="{ name: 'Home'}">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
    </div>
    <div class="menu">
      <router-link :to="{ name: 'What'}">Qu'est ce que c'est?</router-link>
      <router-link :to="{ name: 'Shipping'}">Shipping</router-link>
      <router-link :to="{ name: 'Contact'}">Contact</router-link>
      <router-link :to="{ name: 'Account'}">Mon compte</router-link>
      <router-link :to="{ name: 'Cart'}">
        <div class="icon">
          <img src="../assets/images/cart.svg" alt="Panier">
        </div>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">

  $orange: #ff7900;

  header {
    position: absolute;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'fira_sansmedium';
    width: 100vw;
    margin-top: 1%;
    a {
      text-decoration: none;
      color: #ffffff;
      font-size: 0.9rem;
      font-family: 'fira_sansmedium';
    }
    .logo img{
      width: 100px;
      height: auto;
      margin-left: 50px;
    }
  }

  .menu{
    display: flex;
    justify-content: space-around;
    width: 35vw;
  }

  .icon{
    position: relative;
    img{
      width: 30px;
      height: auto;
      position: relative;
      z-index: 20;
    }
    &:after{
      content: "";
      background-color:$orange;
      width: 95px;
      height: 95px;
      border-radius: 100%;
      position: absolute;
      top: -45px;
      right: -45px;
      z-index: 5;
    }
  }

</style>
