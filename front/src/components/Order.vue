<template>
  <main>
    <notifications classes="myNoti" group="empty"/>
    <section class="bg_order">
      <article class="card_new marge">
        <h2 class="mb40">Sanglier aux framboises</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit arcu elit, nec consequat dolor
          volutpat
          sed. Donec eget nisl ac metus sollicitudin efficitur a eget urna. Aliquam volutpat velit vitae urna blandit
          scelerisque.
          Praesent vitae malesuada nisi, aliquam ultrices orci. Pellentesque vehicula justo eros, nec sollicitudin purus
          faucibus
          vitae. Aenean faucibus ipsum ut faucibus porta. Quisque suscipit ligula ut </p>
        <div class="button">
          <button>Voir le produit</button>
        </div>
      </article>
    </section>
    <section class="marge row section2">
      <div class="section_card">
        <header>
          <button @click="clickCategory('cueillette', '#53E093')">
            <img src="../assets/images/picking.svg" alt="Cueillette">
            <p>Cuiellette</p>
          </button>
          <button @click="clickCategory('chasse', '#ff7900')">
            <img src="../assets/images/hunt.svg" alt="Chasse">
            <p>Chasse</p>
          </button>
          <button @click="clickCategory('pêche', '#2fa2f7')">
            <img src="../assets/images/fishing.svg" alt="Pêche">
            <p>Pêche</p>
          </button>
          <button @click="clickCategory('breuvages', '#8dd7fc')">
            <img src="../assets/images/beverage.svg" alt="Breuvages">
            <p>Breuvage</p>
          </button>
        </header>
        <p class="textDrag">Vous pouvez cliquer/glisser votre produit dans le panier.</p>
        <draggable v-model="products" class="container_cards  " :options="dragOptions" :move="onMove"
                   @start="isDragging=true" @end="onAdd">
          <div class="card" v-for="(product, index) in products">
            <div class="img">
              <img class="" :src="product.image" alt="">
            </div>
            <div class="p20">
              <div class="title_card">
                <h3>{{product.name}}</h3>
                <p :style="'color:' + categoryColor">{{product.price}} €</p>
              </div>
              <p class="text_card">{{product.description}}</p>
              <div class="row flex-end">
                <span @click="addClick(index)" :style="'background-color:' + categoryColor" class="add"></span>
              </div>
            </div>
          </div>
        </draggable>
      </div>
      <div @click='clickCart' id="cart">
        <img src="../assets/images/cart.svg" alt="Panier">
      </div>
      <aside id="idAside">
        <h2 class="border_b">Récapitulatif du panier</h2>
        <div class="p20">
          <draggable v-model="cartproducts" class=" container_empty" :options="{group:'description'}" :move="onMove">
            <transition name="fade">
              <p v-if="cartproducts.length == 0" class="sentence_empty">Déposer un produit ici.</p>
            </transition>
            <div class="card_order" v-for="(cartproduct, index) in cartproducts">
              <div class="row space_between">
                <p class="w80">{{cartproduct.name}}</p>
                <p>{{cartproduct.result}} €</p>
              </div>
              <div class="row space_between mt10">
                <div class="row">
                  <button @click="removed(index)"><span class="less"></span></button>
                  <p class="quantity">{{cartproduct.quantity}}</p>
                  <button @click="addMore(index)">
                    <span class="more"></span>
                  </button>
                </div>
                <button @click="deleted(index)">
                  <span class="delete"></span>
                </button>
              </div>
            </div>
          </draggable>
        </div>
        <div class="p20">
          <div class="row space_between">
            <h3>Sous total</h3>
            <p class="total_price">{{underTotal}} € TTC</p>
          </div>
          <div class="row space_between">
            <h3>Frais de livraison</h3>
            <p>3 €</p>
          </div>
        </div>
        <div class="border_b"></div>
        <div class="row space_between p20">
          <h3>Total</h3>
          <p>{{total}} € TTC</p>
        </div>
        <div @click.prevent="valCart" class="button button2 mb30">
          <button>Valider mon panier</button>
        </div>
      </aside>
    </section>
  </main>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'Order',
    data() {
      return {
        products: [],
        cartproducts: [],
        editable: true,
        isDragging: false,
        category: 'cueillette',
        categoryColor: '#53E093',
        underTotal: 0,
        total: 0,
        all: []
      }
    },
    components: {
      draggable
    },
    methods: {
      addClick: function (index) {
        let check = -1

        if (this.cartproducts.length == 0) {
          this.cartproducts.push({
            id: this.products[index].id,
            name: this.products[index].name,
            price: this.products[index].price,
            result: this.products[index].price,
            quantity: 1
          })
        } else {
          for (let i = 0; i < this.cartproducts.length; i++) {
            if (this.products[index].id == this.cartproducts[i].id) {
              check = i
              break;
            }
          }
          //si existant
          if (check > -1) {
            this.cartproducts[check].quantity++
            this.calCard(check)
          } else {
            //si pas existant
            this.cartproducts.push({
              id: this.products[index].id,
              name: this.products[index].name,
              price: this.products[index].price,
              result: this.products[index].price,
              quantity: 1
            })
          }
        }
        this.calUnderTotal()
        this.calTotal()
      },
      onMove: function ({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      init: function () {
        this.$http.get(`${process.env.URL}products`)
          .then(response => {
            for (let product of response.data) {
              product.quantity = 1
            }
            this.all = response.data
            this.products = this.all.filter(product => product.category == this.category)
          })
          .catch(error => {
            console.log(error)
          })
      },
      clickCategory: function (text, color) {
        this.category = text
        this.categoryColor = color
        this.products = this.all.filter(product => product.category == this.category)
      },
      addMore: function (index) {
        this.cartproducts[index].quantity++
        this.calCard(index)
        this.calUnderTotal()
        this.calTotal()
      },
      onAdd: function (event) {
        this.isDragging = false
        let tab = []
        for (let i = 0; i < this.cartproducts.length; i++) {
          if (this.cartproducts[i].id == this.products[event.oldIndex].id) {
            tab.push(i)
          }
        }
        if (tab.length > 1) {
          for (let i = 0; i < tab.length; i++) {
            this.cartproducts.splice(tab[i], 1)
            if (i > 0) {
              this.products[event.oldIndex].quantity++
            }
          }
        }
        this.products[event.oldIndex].result = this.products[event.oldIndex].quantity * this.products[event.oldIndex].price
        this.calUnderTotal()
        this.calTotal()


      },
      deleted: function (index) {
        this.underTotal = 0
        this.total = 0
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id == this.cartproducts[index].id) {
            this.products[i].quantity = 1
          }
        }
        this.$delete(this.cartproducts, index)
        console.log(this.cartproducts.length)
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
      calCard: function (index) {
        let result = this.cartproducts[index].quantity * this.cartproducts[index].price
        this.cartproducts[index].result = result
        console.log(result)
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
      valCart() {
        if (this.cartproducts.length > 0) {
          this.$router.push('/cart')
        } else {
          this.$notify({
            group: 'empty',
            title: "Votre panier est vide vous ne pouver pas le valider.",
            text: 'Cliquez glissez les produits que vous désirez dans votre panier',
            duration: 5000,
            speed: 500,
            type: 'error'
          })
        }
      },
      clickCart(){
        document.querySelector('#idAside').classList.toggle('toggleAside')
        document.querySelector('#cart').classList.toggle('toggleCart')
      }
    },
    mounted() {
      this.init()
      let cookie = this.$cookies.get('cart')
      if (cookie != null) {
        cookie = JSON.parse(cookie)
        this.cartproducts = cookie.cartProduct
        this.calUnderTotal()
        this.calTotal()
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: {
            name: 'description',
            pull: 'clone',
            put: false,
          },
          ghostClass: 'ghost',
        };
      },
    },
    watch:{
      isDragging () {
        if (this.isDragging == true){
          document.querySelector('#idAside').style.right = '0%'
          document.querySelector('#cart').style.right = '39vw'
        }
        else {
            document.querySelector('#idAside').style.right = '-100%'
            document.querySelector('#cart').style.right = '0'
        }

      },
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    height: 160px;
    width: 260px;
    img {
      background-color: #ff7900;
      width: 100%;
      height: 100%;
    }
  }

  .textDrag {
    transform: translateY(-250%);
    font-size: 0.9rem;
    padding-left: 2%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .card_new {
    width: 21vw;
    background-color: #FBFBFB;
    padding: 30px;
    transform: translateY(30%);
    p {
      text-align: justify;
      padding-bottom: 10px;
    }
    .button {
      padding-bottom: 30px;
    }
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    button {
      border-radius: 5px;
      background-color: #ff7900;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: fira_sansmedium;
    }
  }

  header {
    width: 40vw;
    height: 80px;
    transform: translateY(-80%);
    margin-left: 50px;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    button {
      background-color: transparent;
      border: none;
      padding: 11px;
      &:focus {
        outline: none;
      }
    }
    img {
      height: 50px;
      margin-bottom: 10px;
    }
    p {
      color: white;
      font-size: 1rem;
      font-family: Avenir;
    }
  }

  .section_card {
    margin-top: 200px;
    background-color: #FBFBFB;
    margin-bottom: 80px;
    width: 70vw;
    padding: 20px;
    height: 100%;
  }

  aside {
    margin-top: 200px;
    width: 25vw;
    background-color: #FBFBFB;
    margin-left: 50px;
    margin-bottom: 80px;
    height: 100%;
    h2 {
      padding: 20px;
    }
    h3 {
      width: 60%;
    }
    p {
      font-family: fira_sansmedium;
      font-size: 1rem;
    }
  }

  .card {
    width: 260px;
    height: 420px;
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin: 2%;
    .title_card {
      display: flex;
      justify-content: space-between;
      h3 {
       text-align: left;
        width: 220px;
      }
      p {
        width: 40px;
        font-family: fira_sansbold;
        font-size: 1rem;
        height: 80px;
      }
    }
    .text_card {
      font-size: 0.7rem;
      text-align: justify;
      height: 85px;
    }
  }

  .container_cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: -20px;
    width: 100%;
    text-align: center;
  }

  .add {
    position: relative;
    margin-top: 5px;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      content: '';
      background-color: white;
      width: 4px;
      height: 25px;
      border-radius: 3px;
    }
    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(90deg);
      content: '';
      background-color: white;
      width: 4px;
      height: 25px;
      border-radius: 3px;
    }
  }

  .border_b {
    border-bottom: 1px solid #D0CECE;
  }

  .w80 {
    width: 80%;
  }

  .card_order {
    padding: 10px;
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    p {
      font-size: 0.9rem;
      font-family: Avenir;
      &:last-of-type {
        font-family: fira_sansmedium;
      }
    }
    .quantity {
      color: #53E093;
      padding: 0 10px;
    }
    button {
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
  }

  .container_empty {
    min-height: 70px;
    margin: 20px 0;
  }

  .sentence_empty {
    text-align: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
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

  .cart{
    display: none;
  }

  main{
    overflow-x: hidden;
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .card_new {
      width: 70vw;
      padding: 30px;
      transform: translateY(60%);
      margin-bottom: 200px;
    }

    .mb40 {
      margin-bottom: 20px;
    }

    .section2 {
      margin-top: 36vh;
    }

    .section_card {
      margin-top: 200px;
      width: 80vw;
    }

    header {
      width: 90vw;
      transform: translateY(-50%);
      margin-left: -20px;
      padding: 15px 0;
      img {
        height: 40px;
      }
      p {
        font-size: 0.8rem;
      }
    }

    .container_cards {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .bg_order {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .textDrag {
      transform: translateY(-85%);
    }

    aside{
      width: 250px;
    }

    #idAside{
      transition: all ease .5s;
      position: fixed;
      z-index: 10;
      right: -100%;
      bottom: -8vh;
      height: 90vh;
    }

    .card_order {
      padding: 10px;
      margin-bottom: 5px;
      p {
        font-size: 0.8rem;
      }
      .quantity {
        color: #53E093;
        padding: 0 10px;
      }
    }

    h2{
      font-size: 1.1rem;
    }

    h3{
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    #cart{
      transition: all ease .5s;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #53e093;
      width: 70px;
      height: 70px;
      bottom: 5vh;
      right: 0;
      z-index: 20;
      img{
        width: 40px;
        height: auto;
      }
    }

    .button2{
      transform: translateY(-10%);
    }

    .toggleAside{
      bottom: -8vh!important;
      right:0!important;
    }

    .toggleCart{
      right:78vw!important;
      bottom: 5vh!important;
    }

  }

  @media all and (min-width: 481px) and (max-width: 768px) {
    .card_new {
      width: 30vw;
      transform: translateY(30%);
      margin-bottom: 200px;
      h2{
        font-size: 1.1rem;
        margin-bottom: 10px;
      }
      p{
        font-size: 0.7rem;
      }
    }

    .section_card {
      width: 100vw;
      padding: 0px;
      padding-left: 25px;
    }

    .img {
      height: auto;
      width: 200px;
      img {
        background-color: #ff7900;
        width: 100%;
        height: 100%;
      }
    }

    .card {
      width: 200px;
      height: 390px;
      margin: 1%;
      .title_card {
        h3 {
          font-size: 0.9rem;
          height: 80px;
        }
        p {
          font-size: 0.9rem;
          height:60px;
        }
        .text_card {
          height: 120px;
        }
      }
    }

    header {
      width: 60vw;
      padding: 15px 0;
      img {
        height: 50px;
      }
      p {
        font-size: 0.9rem;
      }
    }

    aside{
      width: 300px;
    }


    #idAside{
      transition: all ease .5s;
      position: fixed;
      z-index: 10;
      right: -100%;
      bottom: -8vh;
      height: 90vh;
    }

    .card_order {
      padding: 10px;
      margin-bottom: 5px;
      p {
        font-size: 0.8rem;
      }
      .quantity {
        color: #53E093;
        padding: 0 10px;
      }
    }

    h2{
      font-size: 1.1rem;
    }

    h3{
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    #cart{
      transition: all ease .5s;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #53e093;
      width: 70px;
      height: 70px;
      bottom: 5vh;
      right: 0;
      z-index: 20;
      img{
        width: 40px;
        height: auto;
      }
    }

    .button2{
      transform: translateY(-10%);
    }

    .toggleAside{
      bottom: -8vh!important;
      right:0!important;
    }

    .toggleCart{
      right: 39vw!important;
      bottom: 5vh!important;
    }
  }





</style>
