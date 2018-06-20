<template>
  <main class="marge">
    <section class="steps">
      <span class="line"></span>
      <div class="column align-center">
        <p>1</p>
        <span class="text">Acheter</span>
      </div>
      <span class="line"></span>
      <div class="column align-center">
        <p>2</p>
        <span class="text">Valider</span>
      </div>
      <span class="line"></span>
      <div class="column align-center">
        <p>3</p>
        <span class="text">Payer</span>
      </div>
      <span class="line"></span>
    </section>
    <section>
      <div class="container">
        <h1 class="title">Mon panier</h1>
        <div class="p5">
          <div class="row align-center card">
            <div class="img_card">
              <img src="../assets/images/img-card1.jpg" alt="">
            </div>
            <div class="row align-center space_around group_card">
              <h2 class="name">Name</h2>
              <h2 class="p100">Prix</h2>
            </div>
            <div class="row align-center space_around group_card">
              <div class="row align-center">
                <button class="button_quant">
                  <span class="less"></span>
                </button>
                <p class="quantity">1</p>
                <button class="button_quant">
                  <span class="more"></span>
                </button>
              </div>
              <button>
                <span class="delete"></span>
              </button>
            </div>
          </div>
          <div class="column align-end w100">
            <div class="border_top">
            </div>
            <div class="row">
              <div class="group_price">
                <h2>dffd</h2>
                <h2>fsdd</h2>
              </div>
              <div class="group_price">
                <h2>fsq</h2>
                <h2>fds</h2>
              </div>
            </div>
            <div class="border_top">
            </div>
            <div class="row">
              <h2>jnfsqkdj</h2>
              <h2>kdsbf</h2>
            </div>
          </div>
        </div>
        <div class="row flex-end">
          <div class="button">
            <button>Acheter</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'Cart',
    data() {
      return {}
    },
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

  .group_price {
    &:first-of-type {
      margin-right: 60px;
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

  .steps {
    width: 67vw;
    display: flex;
    align-items: center;
    .line {
      height: 1px;
      width: 19%;
      background-color: #6F7476;
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
    .text{
      font-family: Avenir;
      font-size: 0.8rem;
    }
  }

</style>
