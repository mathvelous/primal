<template>
  <transition name="modal">
    <div class="mask_modal">
      <notifications classes="myNoti" group="notComplete"/>
      <section>
        <h1 class="title">Connection ou inscription</h1>
        <form class="p5">
          <h2>Pour pouvoir pousuivre votre achat vous devez vous connecter à votre compte ou en créer un.</h2>
          <div class="row justify-center links">
            <router-link :to="{ name: 'SignIn'}">Connection</router-link>
            <router-link :to="{ name: 'SignUp'}">Inscription</router-link>
          </div>
          <div class="row flex-end">
            <div @click.prevent="$emit('close')" class="button">
              <button class="bg_red" type="submit">Annulé</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ModalRedirectConn"
  }
</script>

<style lang="scss" scoped>
  .mask_modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s ease;
  }

  .title {
    transform: translateY(-50%);
    color: white;
    background-color: #ff7900;
    width: 400px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
    margin-bottom: 15px;
  }

  h1 {
    font-size: 1.5rem;
    font-family: 'fira_sansmedium';
  }

  section {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-45%) translateX(-50%);
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    width: 67vw;
  }

  .p5 {
    padding: 0 5%;
  }

  .label_group {
    display: flex;
    flex-direction: column;
    &:last-child {
      margin-bottom: 25px;
    }
  }

  label {
    font-family: Avenir;
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: 600;
  }

  input {
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #979797;
    height: 30px;
    font-size: 0.9rem;
    transition: all ease 0.8s;
    background-color: transparent;
    &:focus {
      border-bottom: 1px solid #53E093;
      outline: none;
    }
  }

  #street {
    width: 28vw;
  }

  #city {
    width: 19vw;
  }

  #zipcode {
    width: 9vw;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
    button {
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: fira_sansmedium;
    }
  }

  .bg_green {
    background-color: #53E093;
  }

  .bg_red {
    background-color: #F54141;
  }

  .links {
    font-family: fira_sansmedium;
    font-size: 1.1rem;
    a {
      text-decoration: none;
      color: #ff7900;
      margin: 20px 70px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
