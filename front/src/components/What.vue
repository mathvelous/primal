<template>
  <main>
    <div class="bg_what"></div>
    <div class="marge">
      <section class="row section1 m_column">
        <div class="image">
          <img src="../assets/images/what1.jpg" alt="Image de champignons">
        </div>
        <article>
          <h2>La nature au coeur de votre alimentation</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque ea fugit magnam molestias non
            officia officiis perferendis tempore unde. Architecto ducimus ea, eum iste molestias officiis repellendus
            saepe sapiente
            orem ipsum dolor sit amet, consectetur adipisicing elit. Dolor doloremque ea fugit magnam molestias non
            officia officiis perferendis tempore unde. Architecto ducimus ea, eum iste molestias officiis repellendus
            saepe sapiente.</p>
        </article>
      </section>
      <section class="section2 row space_between m_column">
        <div class="card">
          <h3 class="title bg_green">Cueillette</h3>
          <p>ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit arcu elit, nec consequat dolor volutpat
            sed. Donec eget nisl ac metus sollicitudin efficitur a eget urna. Aliquam volutpat velit vitae urna
            blandit scelerisque. Praesent vitae malesuada nisi, aliqu</p>
        </div>
        <div class="card">
          <h3 class="title bg_orange">Chasse</h3>
          <p>ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit arcu elit, nec consequat dolor volutpat
            sed. Donec eget nisl ac metus sollicitudin efficitur a eget urna. Aliquam volutpat velit vitae urna
            blandit scelerisque. Praesent vitae malesuada nisi, aliqu</p>
        </div>
        <div class="card">
          <h3 class="title bg_bleu">Pêche</h3>
          <p>ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit arcu elit, nec consequat dolor volutpat
            sed. Donec eget nisl ac metus sollicitudin efficitur a eget urna. Aliquam volutpat velit vitae urna
            blandit scelerisque. Praesent vitae malesuada nisi, aliqu</p>
        </div>
      </section>
      <section class="section3 row space_between">
        <article>
          <h2>C'est pour qui ?</h2>
          <div class="decal">
            <div class="row align-center mb30">
              <p class="number">1</p>
              <p>Les personnes qui veulent manger plus sainement</p>
            </div>
            <div class="row align-center mb30">
              <p class="number">2</p>
              <p>Les sportifs qui souhaitent adopter une alimentation
                en accord avec leur activité</p>
            </div>
            <div class="row align-center mb30">
              <p class="number">3</p>
              <p>Les gourmands curieux de découvrir ou redécouvrir
                de nouvelles saveurs</p>
            </div>
          </div>
        </article>
        <div class="image m_none">
          <img src="../assets/images/what2.jpg" alt="Image de moule">
        </div>
      </section>
    </div>
    <section class="section4">
      <div class="marge">
        <h2>Les <span>bénéf</span><span>ices</span> santé</h2>
        <div class="row justify-center align-center">
          <div class="row m_column">
            <div class="contain">
              <div class="picto">
                <img src="../assets/images/health1.svg" alt="">
              </div>
              <p>Gain de masse musculaire si activité sportive</p>
            </div>
            <div class="contain">
              <div class="picto">
                <img src="../assets/images/health2.svg" alt="">
              </div>
              <p>Perte de poids</p>
            </div>
          </div>
          <div class="row m_column">
            <div class="contain">
              <div class="picto">
                <img src="../assets/images/health3.svg" alt="">
              </div>
              <p>Diminue les risques de diabète</p>
            </div>
            <div class="contain">
              <div class="picto">
                <img src="../assets/images/health4.svg" alt="">
              </div>
              <p>Prévient l’apparition de certaines
                maladies chroniques</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'What',
    data() {
      return {
      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 1.7rem;
  }

  h3 {
    font-size: 1.3rem;
    color: white;
  }

  .section1 {
    margin-bottom: 40px;
    article {
      margin-left: 40px;
      margin-top: 40px;
      width: 40%;
      h2 {
        width: 70%;
        margin-bottom: 30px;
        line-height: 33px;
      }
      p {
        text-align: justify;
      }
    }
    .image {
      transform: translateY(-20%);
      img {
        width: 36vw;
        height: auto;
      }
    }
  }

  .section2 {
    margin-bottom: 130px;
    .card {
      background-color: white;
      padding: 30px;
      width: 300px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
      .title {
        transform: translateY(-100%);
        color: white;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        transform: translateY(-10%);
        text-align: justify;
      }
    }
  }

  .section3 {
    .image {
      img {
        width: 45vw;
        height: auto;
      }
    }
    article {
      h2 {
        margin-bottom: 30px;
      }
      p {
        font-size: 1.3rem;
      }
      .number {
        font-family: 'fira_sansmedium';
        font-size: 2rem;
        color: #6F7476;
        margin-right: 25px;
      }
      .decal {
        margin-left: 40px;
      }
    }
  }

  .section4 {
    margin-top: 90px;
    padding: 60px 0;
    background-color: #FBFBFB;
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
    .picto {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 120px;
      img {
        width: 80px;
        height: auto;
      }
    }
    p {
      text-align: center;
      height: 80px;
    }
    .contain {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin:0 30px
    }
  }

  .bg_orange {
    background-color: #ff7900;
  }

  .bg_green {
    background-color: #53E093;
  }

  .bg_bleu {
    background-color: #2FA2F7;
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {

    .bg_what{
      height: 30vh;
    }

    .section1 {
      margin-bottom: 60px;
      article {
        transform: translateY(-10%);
        margin-left: 0px;
        margin-top: 0px;
        width: 100%;
        h2 {
          width: 100%;
          margin-bottom: 20px;
        }
      }
      .image {
        transform: translateY(-20%);
        img {
          width: 90vw;
        }
      }
    }

    .section2 {
      margin-bottom: 35px;
      .card {
        padding: 20px;
        width: 250px;
        margin-bottom: 50px;
        .title {
          transform: translateY(-80%);
        }
      }
    }

    .section3 {
      article {
        p {
          font-size: 1rem;
        }
        .decal {
          margin-left: 20px;
        }
      }
    }

    .section4{
      padding: 0;
      .picto{
        img{
          width: 60px;
        }
      }
      .contain{
        width: 140px;
        margin:0;
      }
      p{
        font-size: 0.7rem;
      }
      h2{
        padding-top: 40px;
        margin-bottom: 0;
      }
    }


  }

  @media all and (min-width: 481px) and (max-width: 768px) {
    .section1 {
      article {
        width: 100%;
        margin-bottom: 30px;
        h2 {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }

    .section2 {
      margin-bottom: 35px;
      .card {
        padding: 20px;
        width: 180px;
        margin-bottom: 50px;
        p{
          font-size: 0.8rem;
        }
        .title {
          transform: translateY(-80%);
        }
      }
    }

    .section4 {
      .contain {
        width: 120px;
      }
    }

    .section3 {
      article {
        p {
          font-size: 1.2rem;
        }
        .decal {
          margin-left: 20px;
        }
      }
    }

  }


</style>
