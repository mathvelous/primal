<template>
  <div>
    <section id="scrollFocus" class="marge">
      <div class="container">
        <div class="p5">
          <h1 class="title">Récapitulatif panier</h1>
          <div class="row align-center card" v-for="(product, index) in cartproducts">
            <div class="img_card m_none">
              <img class="" :src="product.image" alt="">
            </div>
            <div class="row align-center">
              <h2 class="name">{{product.name}}</h2>
              <h2>{{product.result}}€</h2>
              <h2 class="quantity">{{product.quantity}}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="marge">
      <div class="container">
        <div class="p5">
          <h1 class="title h1_resp">Mes informations et paiement</h1>
          <div class="group">
            <h2>Mes informations</h2>
            <div class="row space_between m_column">
              <div>
                <div class="label_group">
                  <label for="firstname">Nom</label>
                  <input v-model="user.info.firstname" id="firstname" type="text" disabled>
                </div>
                <div class="label_group">
                  <label for="lastname">Prénom</label>
                  <input v-model="user.info.lastname" id="lastname" type="text" disabled>
                </div>
              </div>
              <div class="label_group">
                <label for="phone">Numéro de téléphone</label>
                <input v-model="user.info.phone" id="phone" type="text" disabled>
              </div>
            </div>
          </div>
          <div class="group">
            <h2>Mon adresse de livraison</h2>
            <div class="row space_between m_column">
              <div class="label_group">
                <label for="address">Adresse</label>
                <input v-model="street" id="address" type="text" disabled>
              </div>
              <div class="row">
                <div class="city">
                  <label for="city">Ville</label>
                  <input v-model="city" id="city" type="text" disabled>
                </div>
                <div class="zip">
                  <label for="zipcode">Code postal</label>
                  <input v-model="zipcode" id="zipcode" type="text" disabled>
                </div>
              </div>
            </div>
          </div>
          <div class="group">
            <h2>Paiement</h2>
          </div>
          <div class="group">
            <div class="column align-end w100">
              <div class="border_top">
              </div>
              <div class="row space_between w_block">
                <div class="group_price">
                  <h2>Sous total</h2>
                  <h2>Frais de livraison</h2>
                </div>
                <div class="group_price">
                  <h2>{{underTotal}}€</h2>
                  <h2>3€</h2>
                </div>
              </div>
              <div class="border_top">
              </div>
              <div class="row space_between w_block">
                <h2>Total</h2>
                <h2>{{total}}€</h2>
              </div>
            </div>
          </div>
          <div class="row justify-center w100">
            <div @click.prevent="$emit('modify')" class="button m4">
              <button class="bg_red"><span>Modif</span><span>ier</span></button>
            </div>
            <div @click.prevent="valPayment" class="button m4">
              <button class="bg_green">Valider</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Account',
    data() {
      return {
        cartproducts: [],
        underTotal: 0,
        total: 0,
        user:{
          firstname: null,
          lastname: null,
          phone: null
        },
        street: '',
        city: '',
        zipcode: '',
        id_address: NaN
      }
    },
    methods: {
      ...mapActions([
        'setOrder'
      ]),
      calUnderTotal: function () {
        let cal = 0
        for (let i = 0; i < this.cartproducts.length; i++) {
          cal += this.cartproducts[i].result
        }
        this.underTotal = cal
      },
      calTotal: function () {
        let calT = this.underTotal + 3
        this.total = calT
        this.$cookies.set('cart', JSON.stringify({
          cartProduct: this.cartproducts
        }), '7d')
      },
      ifCookie: function () {
        let cookie = this.$cookies.get('user')
        if (cookie != null){
          this.$http.get(`${process.env.URL}users/${cookie}`)
            .then(response => {
              this.user = response.data
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
      valPayment(){
        let cookie = this.$cookies.get('user')
        this.$http.post(`${process.env.URL}payment/${cookie}`,{
          token: this.getToken,
          cart: this.cartproducts,
          id_address: this.id_address
        })
          .then(response => {
            if (response.data.charge == 'succeeded') {
              this.setOrder(response.data.id)
              this.$router.push('/delivery')
            }
          })
          .catch(error => {
            console.log(error)
        })
      },
      ifAddress(){
        if(this.getAddress != ''){
          this.street = this.getAddress.street
          this.city = this.getAddress.city
          this.zipcode = this.getAddress.zipcode
          this.id_address = this.getAddress.id
        }
      },
      calUnderTotal: function () {
        let cal = 0
        for (let i = 0; i < this.cartproducts.length; i++) {
          cal += this.cartproducts[i].result
        }
        this.underTotal = cal
      },
      calTotal: function () {
        let calT = this.underTotal + 3
        this.total = calT
      },
    },
    mounted() {
      console.log('last')
      this.ifCookie()
      let cookie = this.$cookies.get('cart')
      if (cookie != null) {
        cookie = JSON.parse(cookie)
        this.cartproducts = cookie.cartProduct
        this.calUnderTotal()
        this.calTotal()
      }
      this.ifAddress()
    },
    computed:{
      ...mapGetters([
        'getToken',
        'getAddress'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .w100{
    width: 100%;
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

  .group_payment {
    width: 47%;
  }

  .card {
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    .img_card {
      height: 100px;
      img {
        width: auto;
        height: 100%;
      }
    }
    h2 {
      margin-left: 30px;
      width: 250px;
    }
  }

  .bg_green {
    background-color: #53E093;
  }

  .bg_red {
    background-color: #F54141;
  }

  .border_top {
    border-top: 1px solid #D0CECE;
    width: 100%;
    margin-bottom: 15px;
    margin-top: 30px;
  }

  .w_block{
    width: 230px;
  }

  .quantity {
    color: #53E093;
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(-50%) translateX(-5%);
      width: 255px;
      margin-left: 0%;
    }

    h1 {
      font-size: 1.4rem;
    }

    .h1_resp{
      font-size: 1.1rem;
    }

    section {
      .container{
        width: 80vw;
      }
    }

    .button {
      button {
        width: 100px;
      }
    }

    .card {
      display: flex;
      flex-direction: column;
      input {
        font-size: 0.9rem;
      }
      h2{
        width: 30px;
      }
    }

    .label_group{
      width: 70vw;
    }

    .group {
      margin-bottom: 20px;
      h2 {
        margin-bottom: 10px;
      }
    }
    .name{
      width: 100px!important;
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px) {
    .card {
      h2{
        width: 50px;
      }
    }
    .name{
      width: 100px!important;
    }
  }
</style>
