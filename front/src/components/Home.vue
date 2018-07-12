<template>
  <main>
    <notifications classes="myNoti" group="notGeo"/>
    <section class="home">
      <div class="content-home">
        <h1>Les origines du goût livrées chez vous</h1>
        <form id="formAdress" @submit.prevent="geoAddress">
          <input v-model="address" ref="autocomplete" type="text" placeholder="Entrer votre adresse de livraison">
          <button @click.prevent="search" type="submit">
            <img src="../assets/images/search.svg" alt="Search">
          </button>
        </form>
      </div>
    </section>
    <section class="section marge column align-center">
      <h3 class="mb70">Comment ça marche ?</h3>
      <div class="row justify-center m_column">
        <div class="big_icon column align-center">
          <div id="anim1" class="anims"></div>
          <div id="text1">
            <h2 class="green">Vous commandez</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
              consequuntur deserunt distinctio dolorum, exercitationemm.</p>
          </div>
        </div>
        <div class="big_icon column align-center">
          <div id="anim2" class="anims"></div>
          <div id="text2">
            <h2 class="blue">Nous vous livrons</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
              consequuntur deserunt distinctio dolorum, exercitationemm.</p>
          </div>
        </div>
        <div class="big_icon column align-center">
          <div id="anim3" class="anims"></div>
          <div id="text3">
            <h2 class="orange">Vous dégustez</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur aut commodi
              consequuntur deserunt distinctio dolorum, exercitationemm.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section marge row align-center flex-end m_column">
      <article>
        <h3 class="mb30">Qui sommes-nous ?</h3>
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Home',
    data() {
      return {
        address: '',
        dbAddress: {},
        scrolled: true
      }
    },
    methods: {
      geoAddress: function () {
        if (this.address == '') {
          return
        }
        this.$router.push(`/order?address=${this.address}`)
      },
      ...mapActions([
        'setAddress'
      ]),
      search() {
        if (this.address == '') {
          this.$notify({
            group: 'notGeo',
            title: 'Impossible de livrer à cette adresse',
            text: 'Nous sommes désolé nous faisons de notre mieux pour étendre notre périmètre de livraison.',
            duration: 5000,
            speed: 500,
            type: 'error'
          })
        } else {
          this.setAddress(this.dbAddress)
          this.$router.push('/order')
        }
      },
      ifAddress() {
        if (this.getAddress != null) {
          this.address = this.getAddress.full
        }
      },
      anim1() {
        this.$lottie.loadAnimation({
          container: document.querySelector('#anim1'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/static/img/anim1.json' // the path to the animation json
        });
        document.querySelector('#text1').classList.add('text_anim')
        let self = this
        setTimeout(() => {
          self.anim2()
        }, 500)
      },
      anim2() {
        this.$lottie.loadAnimation({
          container: document.querySelector('#anim2'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/static/img/anim2.json' // the path to the animation json
        });
        document.querySelector('#text2').classList.add('text_anim')
        document.querySelector('#text1').classList.add('afterOpacity')
        let self = this
        setTimeout(() => {
          self.anim3()
        }, 500)
      },
      anim3() {
        this.$lottie.loadAnimation({
          container: document.querySelector('#anim3'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/static/img/anim3.json' // the path to the animation json
        });
        document.querySelector('#text3').classList.add('text_anim')
        document.querySelector('#text2').classList.add('afterOpacity')
      },
      anims() {
        if (!this.scrolled) {
          return
        }
        if (window.scrollY > 400) {
          this.anim1()
          setTimeout(() => {
            document.querySelector('#text3').classList.add('afterOpacity')
          }, 4000)
          this.scrolled = false
        }
      }
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

        this.dbAddress.street = place.address_components[0].long_name + ' ' + place.address_components[1].long_name
        this.dbAddress.city = place.address_components[2].long_name
        this.dbAddress.zipcode = place.address_components[6].long_name
        this.dbAddress.full = place.formatted_address
        console.log(this.dbAddress)
      })
      this.ifAddress()

    },
    computed: {
      ...mapGetters([
        'getAddress'
      ])
    },
    created() {
      window.addEventListener('scroll', this.anims);
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

  h3 {
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
      &:focus {
        outline: none;
      }
    }
    button[type='submit'] {
      border: none;
      background-color: #ff7900;
      border-radius: 0px 3px 3px 0px;
      &:focus {
        outline: none;
      }
      img {
        width: 20px;
        height: 30px;
        padding: 10px;
        transition: all ease .5s;
        &:hover {
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
    p {
      text-align: center;
      font-size: 0.9rem;
    }
  }

  .section article {
    transform: translateX(5%);
    width: 46vw;
    background-color: #ECECEC;
    padding-right: 5%;
    padding-bottom: 5%;
    padding-top: 1%;
    p {
      text-align: justify;
    }
  }

  .green {
    color: #53e093;
  }

  .blue {
    color: #2fa2f7;
  }

  .orange {
    color: #ff7900;
  }

  .anims {
    height: 150px;
  }

  #text1, #text2, #text3{
    opacity: 0;
  }

  .text_anim{
    display: flex;
    flex-direction: column;
    align-items: center;
    animation-name: fade;
    animation-duration: 4s;
  }

  .afterOpacity{
    opacity: 1!important;
  }

  @keyframes fade {
    0% {opacity: 0}
    100% {opacity: 1}
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .home {
      background-position: center;
      h1 {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 40px;
      }
    }

    #formAdress {
      input {
        width: 70vw;
        font-size: 0.9rem;
      }
    }

    .section {
      margin-bottom: 0;
      article {
        transform: translateX(0);
        width: 80vw;
        background-color: #ECECEC;
        padding-right: 0%;
        padding-top: 1%;
        padding-bottom: 5%;
      }
    }
    .image {
      img {
        width: 100vw;
      }
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px) {
    .home {
      h1 {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 40px;
      }
    }

    #formAdress {
      input {
        width: 60vw;
        font-size: 0.9rem;
      }
    }

  }

</style>

