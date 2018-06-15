<template>
  <main>
    <section class="bg_order">
      <article class="card_new marge">
        <h2>Sanglier aux framboises</h2>
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
        <header></header>

        <div class="container_cards">

          <div class="card" v-for="product in products">
            <div class="img_card">
              <img :src="product.image" alt="">
            </div>
            <div class="p20">
              <div class="title_card row space_between">
                <h3>{{product.name}}</h3>
                <p>{{product.price}} €</p>
              </div>
              <p class="text_card">{{product.description}}</p>
              <div class="row flex-end">
                <span class="add"></span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <aside>

      </aside>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        products:[]
      }
    },
    methods: {},
    mounted (){
      this.$http.get("http://localhost:3000/products")
        .then(response => {
          console.log(response.data)
          this.products = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style lang="scss" scoped>
  .card_new {
    width: 23vw;
    background-color: #FBFBFB;
    padding: 30px;
    transform: translateY(40%);
    p {
      text-align: justify;
      margin-bottom: 40px;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 40px;
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
  }

  .section_card {
    margin-top: 200px;
    background-color: #FBFBFB;
    margin-bottom: 80px;
    width: 70vw;
    padding: 20px;
  }

  aside {
    margin-top: 200px;
    width: 25vw;
    background-color: #FBFBFB;
    margin-left: 50px;
    margin-bottom: 80px;
  }

  .card {
    width: 250px;
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    margin: 2%;
    .img_card {
      height: 150px;
      img{
        width: 100%;
        height: auto;
      }
    }
    .title_card {
      p {
        font-family: fira_sansbold;
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: #53E093;
      }
    }
    .text_card {
      font-size: 0.7rem;
      text-align: justify;
    }
  }

  .container_cards{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -20px;
  }

  .add{
    position: relative;
    margin-top: 5px;
    background-color: #53E093;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    &:after{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      content: '';
      background-color: white;
      width: 4px;
      height: 25px;
      border-radius: 3px;
    }
    &:before{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(90deg);
      content: '';
      background-color: white;
      width: 4px;
      height: 25px;
      border-radius: 3px;
    }
  }


</style>
