<template>
  <main>
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
          <button>Je le veux</button>
        </div>
      </article>
    </section>
    <section class="marge row">
      <div class="section_card">
        <header>
          <button @click="clickCategory('cueillette', '#53E093')">
            <img src="../assets/images/picking.svg" alt="Cueillette">
            <p>Cuiellette</p>
          </button>
          <button  @click="clickCategory('chasse', '#ff7900')">
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
        <div>
          <draggable v-model="products" class="container_cards bg" :options="dragOptions" :move="onMove"
                     @start="isDragging=true" @end="isDragging=false">
            <div class="card" v-for="(product, index) in products">
              <div class="img_card">
                <img :src="'../assets/images/' + product.image" alt="">
              </div>
              <div class="p20">
                <div class="title_card row space_between">
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
      </div>

      <aside>
        <h2 class="border_b">Récapitulatif du panier</h2>
        <div class="p20">
          <draggable v-model="cartproducts" class="bg container_empty" :options="{group:'description'}" :move="onMove">
            <transition name="fade">
              <p v-if="cartproducts.length == 0" class="sentence_empty">Déposer un produit ici.</p>
            </transition>
            <div class="card_order" v-for="(cartproduct, index) in cartproducts">
              <div class="row space_between">
                <p>{{cartproduct.name}}</p>
                <p>{{cartproduct.price}} €</p>
              </div>
              <div class="row space_between mt10">
                <div class="row">
                  <button><span class="less"></span></button>
                  <p class="quantity">1</p>
                  <button><span class="more2"></span></button>
                </div>
                <button>
                  <span class="delete"></span>
                </button>
              </div>
            </div>
          </draggable>
        </div>
        <div class="p20">
          <div class="row space_between">
            <h3>Sous total du prix</h3>
            <p class="total_price">10 € TTC</p>
          </div>
          <div class="row space_between">
            <h3>Frais de livraison</h3>
            <p>3 €</p>
          </div>
        </div>
        <div class="border_b"></div>
        <div class="row space_between p20">
          <h3>Total du prix</h3>
          <p>13 € TTC</p>
        </div>
        <div class="button mb30">
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
        categoryColor: '#53E093'
      }
    },
    components: {
      draggable
    },
    methods: {
      addClick: function(index) {
        this.cartproducts.push({
          name: this.products[index].name,
          price: this.products[index].price
        })
      },
      onMove: function({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      },
      init: function() {
        this.$http.get(`http://localhost:3000/products/${this.category}`)
          .then(response => {
            console.log(response.data)
            this.products = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      clickCategory: function (text, color) {
        this.category = text
        this.categoryColor = color
        this.init()
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: {
            name: 'description',
            pull: 'clone',
            put: false
          },
          ghostClass: 'ghost',
        };
      },
    },
  }
</script>

<style lang="scss" scoped>
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
    transform: translateY(50%);
    p {
      text-align: justify;
      margin-bottom: 40px;
    }
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    width: 80%;
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
      padding: 20px;
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
    width: 250px;
    height: 420px;
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin: 2%;
    .img_card {
      height: 150px;
      width: 100px;
      img {
        width: 100%;
        height: auto;
      }
    }
    .title_card {
      p {
        font-family: fira_sansbold;
        font-size: 1.1rem;
        height: 80px;
      }
    }
    .text_card {
      font-size: 0.7rem;
      text-align: justify;
      height: 110px;
    }
  }

  .container_cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -20px;
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

  .card_order {
    padding: 10px;
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    p {
      font-size: 1rem;
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
      .more2 {
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

</style>
