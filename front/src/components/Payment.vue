<template>
  <section id="scrollFocus" class="marge">
    <div class="container">
      <div class="p5">
        <h1 class="title">Mes informations et paiement</h1>
        <div class="group">
          <h2>Mes informations</h2>
          <div class="row space_between">
            <div>
              <div class="label_group">
                <label for="firstname">Nom</label>
                <input id="firstname" type="text">
              </div>
              <div class="label_group">
                <label for="lastname">Prénom</label>
                <input id="lastname" type="text">
              </div>
            </div>
            <div class="label_group">
              <label for="phone">Numéro de téléphone</label>
              <input id="phone" type="text">
            </div>
          </div>
        </div>
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
        </div>
        <div class="group">
          <h2>Paiement</h2>
          <div class="group_payment">
            <div ref="card"></div>
            <!--<button v-on:click="purchase">Purchase</button>-->
          </div>
        </div>
        <div class="row flex-end">
          <div @click.prevent="$emit('click2')" class="button">
            <button>Valider</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  let stripe = Stripe(`pk_test_wPbUhBpNUvFFIhE79fjyoqXG`),
  elements = stripe.elements(),
  card = undefined;

  export default {
    name: 'Payment',
    data() {
      return {}
      },
    methods: {
    },
    mounted() {
      card = elements.create('card');
      card.mount(this.$refs.card);
      document.querySelector('#scrollFocus').scrollIntoView({
        behavior: 'smooth'
      });
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
    margin-right: 5%;
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
    margin-left: 5%;
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

</style>
