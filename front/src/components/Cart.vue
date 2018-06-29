<template>
  <main class="marge">
    <section class="steps">
      <span class="line"></span>
      <div class="column align-center">
        <p class="active">1</p>
        <span class="text">Acheter</span>
      </div>
      <span class="line"></span>
      <div class="column align-center">
        <p :class="{active:selected == 1}">2</p>
        <span class="text">Payer</span>
      </div>
      <span class="line"></span>
      <div class="column align-center">
        <p :class="{active:selected2 == 1}">3</p>
        <span class="text">Valider</span>
      </div>
      <span class="line"></span>
    </section>
    <component @click1="clickPayment" @click2="clickPaymentValidation" @modify="Modify" :is="componentActuel"></component>
  </main>
</template>

<script>
  import ComponentCart from '@/components/ComponentCart'
  import Payment from '@/components/Payment'
  import PaymentValidation from '@/components/PaymentValidation'

  export default {
    name: 'Cart',
    data() {
      return {
        cartproducts: [],
        underTotal: 0,
        total: 0,
        componentActuel: 'ComponentCart',
        selected: NaN,
        selected2: NaN
      }
    },
    components:{
      ComponentCart,
      Payment,
      PaymentValidation
    },
    methods:{
      clickPayment:function () {
        this.componentActuel = 'Payment'
        this.selected = 1
      },
      clickPaymentValidation:function () {
        this.componentActuel = 'PaymentValidation'
        this.selected2 = 1
      },
      Modify: function () {
        this.componentActuel = 'Payment'
        this.selected2 = 0
      }
    },
    mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  main {
    min-height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    display: flex;
    justify-content: center;
    margin: 40px 0;
    .container {
      background-color: #FBFBFB;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
      width: 67vw;
      padding-bottom: 30px;
      margin-bottom: 30px;
    }
  }

  .steps {
    width: 67vw;
    display: flex;
    align-items: center;
    .line {
      height: 1px;
      width: 19%;
      background-color: #6F7476;
      margin-top: -10px;
    }
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #6F7476;
      height: 50px;
      width: 50px;
      border: 1px solid #6F7476;
      border-radius: 50%;
      margin: 10px;
    }
    .text {
      font-family: Avenir;
      font-size: 0.8rem;
    }
  }

  .active{
    background-color: #6F7476;
    color: #ffffff !important;
  }

</style>
