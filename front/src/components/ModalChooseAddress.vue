<template>
  <transition name="modal">
    <div class="mask_modal">
      <!--<notifications classes="myNoti" group="notComplete"/>-->
      <section>
        <h1 class="title">Choisissez une adresse</h1>
        <div class="p5">
          <div v-for="(address, index) in user.addresses" class="card" @click.prevent="changeAddress(index)">
            <input class="street" v-model="address.street" type="text" disabled>
            <div class="row">
              <input v-model="address.city" type="text" disabled>
              <input v-model="address.zipcode" type="text" disabled>
            </div>
          </div>
          <div class="row justify-center align-center">
            <div @click.prevent="$emit('close')" class="button">
              <button class="bg_red" type="button">Annulé</button>
            </div>
            <div @click.prevent="addressChoosen" class="button">
              <button class="bg_green" type="submit">Valider</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ModalChangeAddress",
    data() {
      return {
        user: {},
        chooseAddress: ''
      }
    },
    methods: {
      init: function () {
        let cookie = this.$cookies.get('user')
        this.$http.get(`${process.env.URL}addresses/${cookie}`)
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      changeAddress(index) {
        this.chooseAddress = this.user.addresses[index]
      },
      addressChoosen(index) {
        this.$emit('emitAddress', this.chooseAddress)
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  .mask_modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s ease;
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

  section {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-45%) translateX(-50%);
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    width: 67vw;
  }

  .p5 {
    padding: 0 5%;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
    margin: 0 4%;
    button {
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: fira_sansmedium;
    }
  }

  .bg_green {
    background-color: #53E093;
  }

  .bg_red {
    background-color: #F54141;
  }

  .card {
    background-color: white;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    transition: all ease .5s;
    input {
      width: 100%;
      font-size: 1rem;
      border: none;
      font-weight: bolder;
      font-family: Avenir;
    }
    &:hover {
      box-shadow: 0px 0px 0px 2px rgba(83, 224, 147, .3);
    }
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    .title {
      transform: translateY(-50%);
      width: 255px;
      margin-left: 0%;
    }

    h1 {
      font-size: 1.4rem;
    }

    section {
      width: 80vw;
    }

    .button {
      button {
        width: 100px;
      }
    }

    .card {
      display: flex;
      flex-direction: column;
      input {
        font-size: 0.9rem;
      }
    }

    .street{
      margin-bottom: 10px;
    }

  }

  @media all and (min-width: 481px) and (max-width: 768px) {

  }

  @media all and (min-width: 769px) and (max-width: 1024px) {

  }

  @media screen and (min-width: 1224px) {

  }

</style>
