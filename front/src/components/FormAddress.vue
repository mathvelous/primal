<template>
  <transition name="modal">
    <div class="mask_modal">
      <section>
        <h1 class="title">Ajoutez une adresse</h1>
        <form class="p5" @submit.prevent="addAddress">
          <div class="row space_between">
            <div class="label_group">
              <label for="street">Adresse</label>
              <input v-model="address.street" id="street" type="text">
            </div>
            <div class="label_group">
              <label for="city">Ville</label>
              <input v-model="address.city" id="city" type="text">
            </div>
            <div class="label_group">
              <label for="zipcode">Code postal</label>
              <input v-model="address.zipcode" id="zipcode" type="tel">
            </div>
          </div>
          <div class="row">
            <div @click.prevent="$emit('close')" class="button">
              <button class="bg_red" type="button">Annulé</button>
            </div>
          </div>
          <div class="row flex-end">
            <div class="button">
              <button class="bg_green" type="submit">Valider</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'FormAddress',
    data() {
      return {
        address: {
          street: '',
          city: '',
          zipcode: ''
        }
      }
    },
    methods: {
      addAddress: function () {
        let cookie = this.$cookies.get('user')
        if (cookie == null) {
          return
        }
        if (this.address.street != '' && this.address.city != '' && this.address.zipcode != ''){
          this.$http.post(`http://localhost:3000/users/address/${cookie}`, {
            address: this.address
          })
            .then(response => {
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
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

  .label_group {
    display: flex;
    flex-direction: column;
    &:last-child {
      margin-bottom: 25px;
    }
  }

  label {
    font-family: Avenir;
    font-size: 0.9rem;
    margin-bottom: 5px;
    font-weight: 600;
  }

  input {
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #979797;
    height: 30px;
    font-size: 0.9rem;
    transition: all ease 0.8s;
    background-color: transparent;
    &:focus {
      border-bottom: 1px solid #53E093;
      outline: none;
    }
  }

  #street {
    width: 28vw;
  }

  #city {
    width: 19vw;
  }

  #zipcode {
    width: 9vw;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
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
    transform: translateY(100%);
    background-color: #F54141;
  }
</style>
