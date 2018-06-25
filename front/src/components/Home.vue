<template>
  <main>
    <notifications classes="myNoti" group="notGeo"/>
    <section class="home">
      <div class="content-home">
        <h1>Les origines du goût livré chez vous</h1>
        <form id="formAdress" @submit.prevent="geoAddress">
          <input v-model="address" ref="autocomplete" type="text" placeholder="Entrer votre adresse de livraison">
          <button @click.prevent="show" type="submit">
            <img src="../assets/images/search.svg" alt="Search">
          </button>
        </form>
      </div>
    </section>
    <section class="section marge column align-center">
      <h3 class="mb70">Comment ça marche ?</h3>
      <div class="row justify-center m_column">
        <div class="big_icon column align-center">
          <img src="../assets/images/order.svg" alt="Commandez">
          <h2>Vous commandez</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
            consequuntur deserunt distinctio dolorum, exercitationemm.</p>
        </div>
        <div class="big_icon column align-center">
          <img src="../assets/images/delivery.svg" alt="Commandez">
          <h2>Nous vous livrons</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
            consequuntur deserunt distinctio dolorum, exercitationemm.</p>
        </div>
        <div class="big_icon column align-center">
          <img src="../assets/images/savor.svg" alt="Commandez">
          <h2>Vous dégustez</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
            consequuntur deserunt distinctio dolorum, exercitationemm.</p>
        </div>
      </div>
    </section>
    <section class="section marge row align-center flex-end m_column">
      <article>
        <h3 class="mb30">Qui sommes nous ?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.Lorem ipsum dolor sit amet, consec
          consequuntur deserunt distinctio dolorum, exercitationemm.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.Lorem ipsum dolor sit amet, consec
          consequuntur deserunt distinctio dolorum, exercitationemm.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
          consequuntur deserunt distinctio dolorum, exercitationemm.
        </p>
      </article>
      <div class="image">
        <img src="../assets/images/few-words.jpg" alt="Primal est quelques mots">
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        address: '',
      }
    },
    methods: {
      geoAddress: function () {
        if (this.address == ''){
          return
        }
        this.$router.push(`/order?address=${this.address}`)
      },
      show (group) {
        this.$notify({
          group: 'notGeo',
          title: 'Impossible de livrer à cette adresse',
          text: 'Nous sommes désolé nous faisons de notre mieux pour étendre notre périmètre de livraison.',
          duration: 5000,
          speed: 500,
          type: 'error'
        });
      },
    },
    mounted() {
      this.autocomplete = new google.maps.places.Autocomplete(
        (this.$refs.autocomplete),
        {
          types: ['geocode'],
          componentRestrictions: {country: "FR"},
          language: 'fr'
        }
      );
      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace()
        this.address = place.formatted_address
      })
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
    width: 100vw;
    .content-home {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 75px;
    }
    h2 {
      margin-bottom: 10px;
    }
  }

  h3{
    font-size: 1.7rem;
  }

  #formAdress {
    display: flex;
    align-items: center;
    input {
      width: 30vw;
      height: 30px;
      padding: 10px;
      border: none;
      border-radius: 3px 0px 0px 3px;
      font-size: 1rem;
      &:focus{
        outline: none;
      }
    }
    button[type='submit'] {
      border: none;
      background-color: #ff7900;
      border-radius: 0px 3px 3px 0px;
      &:focus{
        outline: none;
      }
      img {
        width: 20px;
        height: 30px;
        padding: 10px;
        transition: all ease .5s;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
  }

  .big_icon {
    padding: 0 30px;
    margin-bottom: 20px;
    img {
      width: 100px;
      height: auto;
    }
    h2 {
      height: 80px;
      display: flex;
      align-items: center;
    }
    p{
      text-align: center;
      font-size: 0.9rem;
    }
  }

  .section article{
    transform: translateX(5%);
    width: 46vw;
    background-color: #ECECEC;
    padding-right: 5%;
    padding-bottom: 5%;
    padding-top: 1%;
    p{
      text-align: justify;
    }
  }

/*********** Responsive ***********/

  @media screen and (max-width: 480px){
    .home {
      background-position: center;
      h1 {
        font-size: 1.5rem;
        text-align: center;
      }
    }

    h3{
      font-size: 1.3rem;
      margin-top:20px ;
      text-align: center;
    }

    #formAdress{
      input{
        width: 60vw;
        font-size: 0.8rem;
      }
    }

    .big_icon{
      img {
        width: 100px;
        height: auto;
      }
      p{
        margin-bottom: 30px;
      }
      h2{
        height: 60px;
      }
    }

    .marge{
      margin: 3%;
    }

    .section{
      margin-bottom: 0;
    }

    .section article{
      transform: translateX(0);
      width: 90%;
      padding-bottom: 0;
      padding-right: 0;
    }

    .image img{
      width: 100vw;
      margin-top: 20px;
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px){
    .home {
      h1 {
        font-size: 2rem;
      }
    }
    #formAdress{
      input{
        width: 50vw;
      }
    }

    .section{
      margin: 10vh 6%;
    }
  }

  @media all and (min-width: 769px) and (max-width: 1024px){

  }

  @media screen and (min-width : 1224px) {

  }

</style>

