<template>
  <main>
    <notifications classes="myNoti" group="modifySuccess"/>
    <notifications classes="myNoti" group="deleteAddress"/>
    <section class="marge">
      <div class="row space_between m_column">
      <h1 class="title">mon compte</h1>
        <div @click.prevent="deconnect" class="button_deco">
          <button>Déconnection</button>
        </div>
      </div>
      <div class="row space_between m_column m_justify-center mt_r">
        <div class="card_account">
          <form @submit.prevent="infoModify">
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
          <div class="form">
            <h2>Mes adresses</h2>
            <div class="addresses_block">
              <div class="block">
                <div class="row flex-end align-end addresses" v-for="(address, index) in user.addresses">
                  <input id="address" v-model="address.street" type="text" disabled="true">
                  <input id="city" v-model="address.city" type="text" disabled="true">
                  <input id="zipcode" v-model="address.zipcode" type="text" disabled="true">
                  <div @click="deleted(index)">
                    <span class="delete"></span>
                  </div>
                </div>
              </div>
            </div>
            <div @click="showModal = true" class="button">
              <button>Ajouter</button>
            </div>
          </div>
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
        <div class="column justify-center mt20">
          <div v-for="order in user.orders" class="row space_around orders">
            <p>{{order.date}}</p>
            <p>{{order.price}}€</p>
            <p>{{order.state}}</p>
          </div>
        </div>
      </article>
    </section>
    <div v-if="showModal">
      <FormAddress @close="Close"></FormAddress>
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
        this.$http.get(`${process.env.URL}users/${cookie}`)
          .then(response => {
            this.user = response.data
            console.log(response.data)
            for (let i = 0; i < this.user.orders.length ; i++) {
              let order = this.user.orders[i]
              order.date = order.date.split('T')[0]
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      deleted: function (index) {
        if (this.user.addresses.length > 1) {
          this.$http.delete(`${process.env.URL}addresses/${this.user.addresses[index].id}`)
            .then(response => {
              this.$delete(this.user.addresses, index)
              this.$notify({
                group: 'deleteAddress',
                title: 'Vous avez bien supprimé une adresse enregistrée',
                duration: 5000,
                speed: 500,
                type: 'warn'
              });
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      Close(data) {
        if (data) {
          this.user.addresses = data
        }
        this.showModal = false
      },
      infoModify() {
        let cookie = this.$cookies.get('user')
        this.$http.post(`${process.env.URL}users/update/${cookie}`, {
          data: this.user
        })
          .then(response => {
            this.$notify({
              group: 'modifySuccess',
              title: 'Vous avez bien modifié vos informations',
              duration: 5000,
              speed: 500,
              type: 'success'
            });
          })
          .catch(error => {
            console.log(error)
          })
      },
      deconnect(){
        this.$cookies.remove('user')
        this.$router.push('/')
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

  .button_deco{
    button{
      background-color: #d3113b;
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: 'fira_sansmedium';
    }
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

  form, .form {
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
    p {
      font-size: 1rem;
    }
  }

  .addresses_block {
    height: 131px;
    .block {
      height: 132px;
      overflow-y: scroll;
      overflow-X: hidden;
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .5);
        -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
      }
    }
  }

  .addresses {
    width: 95%;
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

  .orders{
    p{
      display: flex;
      justify-content: center;
      width: 230px;
    }
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(95%);
      width: 100%;
      margin-left: 0%;
    }

    h1{
      font-size: 1.1rem;
    }

    .button_deco{
      button{
        position: absolute;
        top: 15vh;
        right: 5%;
      }
    }

    .mt_r{
      margin-top: 30px;
    }

    form, .form{
      width: 67vw;
    }

    form{
      margin-bottom: 50px;
    }

    .orders{
      p{
        font-size: 0.8rem;
      }
    }

  }

  @media all and (min-width: 481px) and (max-width: 768px) {
    form, .form{
      width: 38vw;
      padding: 20px;
    }
  }

  @media all and (min-width: 769px) and (max-width: 1024px) {

  }

  @media screen and (min-width: 1224px) {

  }
</style>
