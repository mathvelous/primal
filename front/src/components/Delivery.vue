<template>
  <main class="marge">
    <section class="p5">
      <h1 class="title">Suivez votre commande</h1>
      <div class="decal_m">
        <div id="progress_picto">
          <div id="delivery_picto">
            <img src="../assets/images/delivery.svg" alt="Livraison">
          </div>
        </div>
        <div id="my_progress">
          <div id="myBar"></div>
        </div>
        <div class="row steps space_between">
          <div class="row">
            <p id="step1">En cours de préparation</p>
            <p id="step2">En cours de livraison</p>
          </div>
          <p id="step3">Livré. Bon appétit!</p>
        </div>
        <div class="row justify-center">
          <div class="button">
            <button @click="click_accueil">Retour à l'accueil</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: "Delivery",
    data() {
      return {}
    },
    methods: {
      move() {
        let elem = document.getElementById("myBar");
        let picto = document.getElementById("delivery_picto");
        let width = 1;
        let id = setInterval(frame, 70);

        function frame() {
          if (width >= 100) {
            clearInterval(id);
          } else {
            width++;

            elem.style.width = width + '%';

            picto.style.left = width - 10 + '%';
          }
          if (width >= 10) {
            picto.style.opacity = 1;
          }
          if (width >= 30) {
            document.querySelector('#step2').style.color = '#2fa2f7'
          }
          if (width >= 95) {
            document.querySelector('#step3').style.color = '#53E093'
          }
        }
      },
      click_accueil() {
        this.$router.push('/')
      }
    },
    mounted() {
      this.move()
    }
  }
</script>

<style lang="scss" scoped>

  main {
    height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    section {
      background-color: #FBFBFB;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
      width: 67vw;
    }
  }

  #my_progress {
    width: 100%;
    background-color: #ECECEC;
    border-radius: 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
  }

  #myBar {
    width: 1%;
    height: 30px;
    background: #2fa2f7;
    background: -moz-linear-gradient(left, #2fa2f7 0%, #53e093 100%);
    background: -webkit-linear-gradient(left, #2fa2f7 0%, #53e093 100%);
    background: linear-gradient(to right, #2fa2f7 0%, #53e093 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#2fa2f7', endColorstr='#53e093', GradientType=1);
    border-radius: 15px;
    transition: all ease .5s;
    margin-bottom: 2%;
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
    font-family: 'fira_sansmedium';
  }

  .p5 {
    padding: 0 5%;
  }

  #progress_picto {
    width: 100%;
  }

  #delivery_picto {
    position: relative;
    opacity: 0;
    img {
      width: 65px;
      height: auto;
    }
  }

  .steps {
    margin-bottom: 5%;
    p {
      font-size: 0.9rem;
    }
    #step1 {
      color: #2fa2f7;
      margin-right: 80px;
    }
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
    button {
      border-radius: 5px;
      background-color: #d3113b;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: fira_sansmedium;
    }
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(-50%) translateX(-5%);
      width: 255px;
      margin-left: 0%;
    }

    h1 {
      font-size: 1.1rem;
    }

    .steps {
      margin-bottom: 5%;
      p {
        font-size: 0.7rem;
      }
      #step1 {
        color: #2fa2f7;
        margin-right: 10px;
      }
    }

    #delivery_picto {
      margin-left: -25px;
    }

    main {
      section {
        width: 80vw;
      }
    }

    .decal_m{
      transform: translateY(-20%);
    }

    .button{
      button{
        transform: translateY(80%);
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
