<template>
  <section id="scrollFocus" class="marge">
    <notifications classes="myNoti" group="emptyField"/>
    <div class="container">
      <div class="p5">
        <h1 class="title">Mes adresse et paiement</h1>
        <div class="group">
          <h2>Mon adresse de livraison</h2>
          <p class="mb10">Entrer une nouvelle adresse</p>
          <div class="row space_between m_column">
            <div class="label_group">
              <label for="adress">Adresse</label>
              <input v-model="street" id="adress" type="text">
            </div>
            <div class="row">
              <div class="city">
                <label for="city">Ville</label>
                <input v-model="city" id="city" type="text">
              </div>
              <div class="zip">
                <label for="zipcode">Code postal</label>
                <input v-model="zipcode" id="zipcode" type="text">
              </div>
            </div>
          </div>
          <p>Ou</p>
          <div @click="showModal = true" class="button button_address">
            <button class="bg_green">Choisisser une adresse</button>
          </div>
        </div>
        <div>
          <h2>Paiement</h2>
          <div class="card" ref="card"></div>
        </div>
        <div class="row justify-center w100">
          <div @click.prevent="$emit('goback')" class="button m4 button_resp">
            <button class="bg_red">Retour</button>
          </div>
          <div @click.prevent="purchase" class="button m4 button_resp">
            <button class="bg_green">Payer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <ModalChoseAddress @close="Close" @emitAddress="setNewAddress"></ModalChoseAddress>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ModalChoseAddress from '@/components/ModalChooseAddress'

  let stripe = Stripe(`pk_test_wPbUhBpNUvFFIhE79fjyoqXG`);
  let elements = stripe.elements();
  let card = undefined

  export default {
    name: 'Payment',
    data() {
      return {
        showModal: false,
        street: '',
        city: '',
        zipcode: '',
        id_address: NaN
      }
    },
    components: {
      ModalChoseAddress
    },
    methods: {
      ...mapActions([
        'setToken',
        'setAddress'
      ]),
      Close: function (data) {
        if (data) {
          this.user.addresses = data
        }
        this.showModal = false
      },
      purchase: function () {
        let self = this

        stripe.createToken(card).then(function (result) {
          if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
            return
          }
          self.setToken(result.token.id)

          if (self.street != '' && self.city != '' && self.zipcode != '') {
            let cookie = self.$cookies.get('user')
            self.$http.post(`http://localhost:3000/addresses/${cookie}`, {
              street: self.street,
              city: self.city,
              zipcode: self.zipcode
            })
              .then(response => {
                if (response.data == 'ok') {
                  self.setAddress({
                    street: self.street,
                    city: self.city,
                    zipcode: self.zipcode,
                    id: self.id_address
                  })
                  self.$emit('click2')
                } else {
                  self.setAddress({
                    street: self.street,
                    city: self.city,
                    zipcode: self.zipcode,
                    id: response.data
                  })
                  self.$emit('click2')
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            self.$notify({
              group: 'emptyField',
              title: 'Vous devez remplir tout les champs du formulaire',
              duration: 5000,
              speed: 500,
              type: 'error'
            })
          }
        })
      },

      ifAddress() {
        if (this.getAddress != '') {
          this.street = this.getAddress.street
          this.city = this.getAddress.city
          this.zipcode = this.getAddress.zipcode
        }
      },
      setNewAddress(chooseAddress) {
        this.street = chooseAddress.street
        this.city = chooseAddress.city
        this.zipcode = chooseAddress.zipcode
        this.id_address = chooseAddress.id
        this.showModal = false
      }
    },
    mounted() {
      card.mount(this.$refs.card);
      document.querySelector('#scrollFocus').scrollIntoView({
        behavior: 'smooth'
      })
      this.ifAddress()
    },
    computed: {
      ...mapGetters([
        'getAddress'
      ])
    },
    created() {
      card = elements.create('card');
    }
  }
</script>

<style lang="scss" scoped>
  .mb10 {
    margin-bottom: 10px;
  }

  section {
    display: flex;
    justify-content: center;
    margin: 50px 0;
    .container {
      background-color: #FBFBFB;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
      width: 67vw;
      padding-bottom: 30px;
      margin-bottom: 30px;
    }
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(110%);
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

  .m4{
    margin: 0 4%;
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
    margin-bottom: 15px;
  }

  h1 {
    font-size: 1.5rem;
    font-family: fira_sansmedium;
  }

  h2 {
    font-size: 1rem;
  }

  .p5 {
    padding: 0 5%;
  }

  .group {
    margin-bottom: 40px;
    h2 {
      margin-bottom: 20px;
    }
  }

  .label_group {
    display: flex;
    flex-direction: column;
    width: 27vw;
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

  .city {
    display: flex;
    flex-direction: column;
    input {
      width: 18vw;
      margin-right: 23px;
    }
  }

  .zip {
    display: flex;
    flex-direction: column;
    input {
      width: 7vw;
    }
  }

  .button_address {
    justify-content: flex-start;
    transform: translateY(0);
    margin-top: 15px;
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

  .StripeElement {
    width: 50%;
    background-color: white;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  .w100 {
    width: 100%;
  }

  .bg_green {
    background-color: #53E093;
  }

  .bg_red {
    background-color: #F54141;
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(-50%) translateX(-5%);
      width: 255px;
      margin-left: 0%;
    }

    section {
      .container {
        width: 80vw;
      }
    }

    h1 {
      font-size: 1.2rem;
    }

    .label_group {
      width: 80vw;
    }

    input{
      width: 90%;
    }

    .city {
      input {
        width: 38vw;
        margin-right: 23px;
      }
    }

    .zip {
      input {
        width: 25vw;
      }
    }

    .card{
      width: 90%;
    }

    .button_resp {
      button {
        width: 100px;
      }
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px) {

  }

  @media all and (min-width: 769px) and (max-width: 1024px) {

  }

  @media screen and (min-width: 1224px) {

  }
</style>
