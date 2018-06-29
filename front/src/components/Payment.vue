<template>
  <section id="scrollFocus" class="marge">
    <div class="container">
      <div class="p5">
        <h1 class="title">Mes adresse et paiement</h1>
        <div class="group">
          <h2>Mon adresse de livraison</h2>
          <div class="row space_between">
            <div class="label_group">
              <label for="adress">Adresse</label>
              <input id="adress" type="text">
            </div>
            <div class="row">
              <div class="city">
                <label for="city">Ville</label>
                <input id="city" type="text">
              </div>
              <div class="zip">
                <label for="zipcode">Code postal</label>
                <input id="zipcode" type="text">
              </div>
            </div>
          </div>
          <div @click="showModal = true" class="button button_address">
            <button>Choisir une adresse</button>
          </div>
        </div>
        <div class="group">
          <h2>Paiement</h2>
          <div ref="card"></div>
        </div>
        <div class="row flex-end">
          <div @click.prevent="purchase" class="button">
            <button>Payer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <ModalChoseAddress @close="Close"></ModalChoseAddress>
    </div>
  </section>
</template>

<script>
  import ModalChoseAddress from '@/components/ModalChooseAddress'

  let stripe = Stripe(`pk_test_wPbUhBpNUvFFIhE79fjyoqXG`);
  let elements = stripe.elements();
  let card = undefined

  export default {
    name: 'Payment',
    data() {
      return {
        showModal: false,
        user: {
          firstname: null,
          lastname: null,
          phone: null
        },
      }
    },
    components: {
      ModalChoseAddress
    },
    methods: {
      Close: function (data) {
        if (data) {
          this.user.addresses = data
        }
        this.showModal = false
      },
      purchase: function () {
        stripe.createToken(card).then(function (result) {
          console.log(result)
        });
        this.$emit('click2')
      },
    },
    mounted() {
      card = elements.create('card');
      card.mount(this.$refs.card);
      document.querySelector('#scrollFocus').scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
</script>

<style lang="scss" scoped>

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
      background-color: #53E093;
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: fira_sansmedium;
    }
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

  .group_payment {
    width: 47%;
  }

  .button_address {
    justify-content: flex-end;
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
    width: 45%;
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
</style>
