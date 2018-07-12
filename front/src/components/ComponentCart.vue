<template>
  <section>
    <div class="container">
      <h1 class="title">Mon panier</h1>
      <div class="p5">
        <transition name="fade">
          <p v-if="cartproducts.length == 0" class="sentence_empty">Panier vide</p>
        </transition>
        <div class="row align-center card" v-for="(product, index) in cartproducts">
          <div class="img_card m_none">
            <img class="" :src="product.image" alt="">
          </div>
          <div class="row align-center space_around group_card">
            <h2 class="name">{{product.name}}</h2>
            <h2 class="p100">{{product.result}}€</h2>
          </div>
          <div class="row align-center space_around group_card">
            <div class="row align-center">
              <button class="button_quant">
                <span @click="removed(index)" class="less"></span>
              </button>
              <p class="quantity">{{product.quantity}}</p>
              <button @click="addMore(index)" class="button_quant">
                <span class="more"></span>
              </button>
            </div>
            <button @click="deleted(index)">
              <span class="delete"></span>
            </button>
          </div>
        </div>
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
      <div class="row justify-center">
        <div @click.prevent="clickBuy" class="button">
          <button>Acheter</button>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <ModalRedirectConn @close="showModal = false"></ModalRedirectConn>
    </div>
  </section>
</template>

<script>
  import ModalRedirectConn from '@/components/ModalRedirectConn'

  export default {
    name: 'ComponentCart',
    data() {
      return {
        cartproducts: [],
        underTotal: 0,
        total: 0,
        showModal: false
      }
    },
    components: {
      ModalRedirectConn
    },
    methods: {
      deleted: function (index) {
        this.$delete(this.cartproducts, index)
        if (this.cartproducts.length > 0) {
          this.$cookies.set('cart', JSON.stringify({
            cartProduct: this.cartproducts
          }), '7d')
        } else {
          this.$cookies.remove('cart')
        }
      },
      removed: function (index) {
        if (this.cartproducts[index].quantity > 1) {
          this.cartproducts[index].quantity--
          this.calCard(index)
          this.calUnderTotal()
          this.calTotal()
        }
      },
      addMore: function (index) {
        this.cartproducts[index].quantity++
        this.calCard(index)
        this.calUnderTotal()
        this.calTotal()
      },
      calCard: function (index) {
        let result = this.cartproducts[index].quantity * this.cartproducts[index].price
        this.cartproducts[index].result = result
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
        this.$cookies.set('cart', JSON.stringify({
          cartProduct: this.cartproducts
        }), '7d')
      },
      clickBuy: function () {
        let cookie = this.$cookies.get('user')
        if (cookie != null){
          this.$emit('click1')
        }else{
          this.showModal = true
        }
      }
    },
    mounted() {
      let cookie = this.$cookies.get('cart')
      if (cookie != null) {
        cookie = JSON.parse(cookie)
        this.cartproducts = cookie.cartProduct
        this.calUnderTotal()
        this.calTotal()
      }
    }
  }
</script>

<style lang="scss" scoped>

  .w_block {
    width: 230px;
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

  .name {
    width: 250px;
    margin-left: 15px;
  }

  .quantity {
    color: #53E093;
    padding: 0 10px;
    font-size: 1.3rem;
    font-family: fira_sansmedium;
  }

  .button_quant {
    background-color: transparent;
    border: none;
    padding: 10px;
    .less {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%) rotate(90deg);
        width: 3px;
        height: 13px;
        background-color: #53E093;
        border-radius: 3px;
      }
    }
    .more {
      position: relative;
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        content: '';
        background-color: #53E093;
        width: 3px;
        height: 13px;
        border-radius: 3px;
      }
      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%) rotate(90deg);
        content: '';
        background-color: #53E093;
        width: 3px;
        height: 13px;
        border-radius: 3px;
      }
    }
  }

  .delete {
    position: relative;
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
    .group_card {
      width: 100%;
    }
  }

  .p100 {
    padding-right: 100px;
  }

  .border_top {
    border-top: 1px solid #D0CECE;
    width: 100%;
    margin-bottom: 15px;
    margin-top: 30px;
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

  .sentence_empty {
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
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

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(-50%);
      width: 255px;
      margin-left: 0%;
    }

    section {
      .container {
        width: 80vw;
      }
    }

    .p100 {
      padding-right: 0px;
      padding-left: 10px;
    }


    .name {
      width: 80px;
      margin-left: 5px;
    }

    .card{
      padding: 10px 0;
      .group_card {
        width: 80%;
      }
    }

    h2{
      font-size: 0.9rem;
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px) {



    .p100 {
      padding-right: 0px;
      padding-left: 10px;
    }


    .name {
      width: 80px;
      margin-left: 5px;
    }

    .card{
      padding: 10px 0;
      .group_card {
        width: 80%;
      }
    }

    h2{
      font-size: 0.9rem;
    }
  }
</style>
