<template>
  <main>
    <section class="marge">
      <h1 class="title">mon compte</h1>
      <div class="row space_between">
        <div class="card_account">
          <form action="">
            <h2>Mes informations</h2>
            <div class="row space_between">
              <div class="input_groupe">
                <input v-model="user.info.firstname" type="text">
                <input v-model="user.info.lastname" type="text">
              </div>
              <div class="input_groupe">
                <input v-model="user.info.email" type="mail">
                <input v-model="user.info.phone" type="tel">
              </div>
            </div>
            <div class="button">
              <button><span>Modif</span><span>ier</span></button>
            </div>
          </form>
        </div>
        <div class="card_account">
          <form>
            <h2>Mes adresses</h2>
            <div class="row flex-end align-end addresses" v-for="(address, index) in user.addresses">
              <input id="address" v-model="address.street" type="text" disabled="true">
              <input id="city" v-model="address.city" type="text" disabled="true">
              <input id="zipcode" v-model="address.zipcode" type="text" disabled="true">
              <span @click="deleted(index)" class="delete"></span>
            </div>
            <div @click.prevent="showModal = true" class="button">
              <button>Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="marge">
      <article>
        <h2>Historique des commandes</h2>
        <div class="column justify-center">
          <div class="row space_around">
            <h3>Date</h3>
            <h3>Prix total</h3>
            <h3>Etat</h3>
          </div>
        </div>
      </article>
    </section>
    <div v-if="showModal" @close="showModal = false">
      <FormAddress></FormAddress>
    </div>


  </main>
</template>

<script>
  import FormAddress from '@/components/FormAddress'

  export default {
    name: 'Account',
    components: {
      FormAddress
    },
    data() {
      return {
        user: {},
        showModal: false
      }
    },
    methods: {
      init: function () {
        let cookie = this.$cookies.get('user')
        this.$http.get(`http://localhost:3000/users/${cookie}`)
          .then(response => {
            this.user = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      },
      deleted: function (index) {
        if (this.user.addresses.length > 1) {
          this.$delete(this.user.addresses, index)
        }
      },
      clickModal: function () {
        this.modal = true
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  section {
    margin-top: 50px;
    margin-bottom: 60px;
  }

  .title {
    color: white;
    background-color: #ff7900;
    width: 400px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.1rem;
  }

  input {
    margin-bottom: 15px;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid #979797;
    height: 30px;
    font-size: 0.9rem;
    transition: all ease 0.8s;
    background-color: transparent;
    width: 90%;
    &:focus {
      border-bottom: 1px solid #53E093;
      outline: none;
    }
  }

  .input_group {
    display: flex;
    flex-direction: column;
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    padding: 30px;
    padding-left: 45px;
    width: 38vw;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(120%);
    button {
      background-color: #53E093;
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: 'fira_sansmedium';
    }
  }

  .delete {
    position: relative;
    top: -20px;
    margin-left: 20px;
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(130deg);
      content: '';
      background-color: #F54141;
      width: 3px;
      height: 18px;
      border-radius: 3px;
    }
    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(45deg);
      content: '';
      background-color: #F54141;
      width: 3px;
      height: 18px;
      border-radius: 3px;
    }
  }

  article {
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    padding: 30px;
  }

  .addresses {
    input {
      margin-right: 10px;
    }
    #address {
      width: 50%;
    }
    #city {
      width: 30%;
    }
    #zipcode {
      width: 20%;
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
