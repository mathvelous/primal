<template>
  <main>
    <section>
      <div>
        <h1 class="title">Inscrivez-vous</h1>
        <form @submit.prevent="signup" method="POST" class="p5">
          <h2>Informations personnelles</h2>
          <div class="row space_between">
            <div>
              <div class="label_group">
                <label for="firstname">Nom</label>
                <input v-model="info.firstname" id="firstname" type="text">
              </div>
              <div class="label_group">
                <label for="lastname">Prénom</label>
                <input v-model="info.lastname" id="lastname" type="text">
              </div>
              <div class="label_group">
                <label for="mail">Adresse mail</label>
                <input v-model="info.mail" id="mail" type="email">
              </div>
            </div>
            <div>
              <div class="label_group">
                <label for="phone">Numéro de téléphone</label>
                <input v-model="info.phone" id="phone" type="text">
              </div>
              <div class="label_group">
                <label for="password">Mot de passe</label>
                <input v-model="info.password" id="password" type="password">
              </div>
              <div class="label_group">
                <label for="confirm_password">Confirmation du mot de passe</label>
                <input v-model="info.confirm_password" id="confirm_password" type="password">
              </div>
              <p v-if="dontMatch">Les mots de passes ne sont différents</p>
            </div>
          </div>
          <h2>Adresse de livraison</h2>
          <div class="row space_between">
            <div class="label_group">
              <label for="adress">Adresse</label>
              <input v-model="address.street" id="adress" type="text">
            </div>
            <div class="row vw27">
              <div class="city">
                <label for="city">Ville</label>
                <input v-model="address.city" id="city" type="text">
              </div>
              <div class="zip">
                <label for="zipcode">Code postal</label>
                <input v-model="address.zipcode" id="zipcode" type="text">
              </div>
            </div>
          </div>
          <p>Vous avez déjà <router-link :to="{ name: 'SignIn'}">un compte ?</router-link></p>
          <div class="row flex-end">
            <div class="button">
              <button type="submit">Valider</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'SignUp',
    data() {
      return {
        info:{
          firstname: '',
          lastname: '',
          mail: '',
          phone: '',
          password: '',
          confirm_password: ''
        },
        address:{
          street: '',
          city: '',
          zipcode: ''
        },
        dontMatch: false
      }
    },
    methods: {
      signup: function() {
        if(this.info.password != this.info.confirm_password){
          this.dontMatch = true
          return
        }
        this.$http.post("http://localhost:3000/users", {
          data: this.info, address: this.address
        })
          .then(response => {
            this.$cookies.set('user', response.data, '14d')
            //this.$router.push('/account')
          })
          .catch(error => {
            console.log(error)
          })
      },
      ifAddress(){
        if(this.getAddress != null){
          this.address.street = this.getAddress.street
          this.address.city = this.getAddress.city
          this.address.zipcode = this.getAddress.zipcode
        }
      },
    },
    mounted(){
      this.ifAddress()
    },
    computed: {
      ...mapGetters([
        'getAddress'
      ])
    }
  }

</script>

<style lang="scss" scoped>
  .vw27 {
    width: 27vw;
  }

  main {
    height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-family: fira_sansmedium;
    margin-bottom: 25px;
  }

  section {
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    width: 67vw;
  }

  .p5 {
    padding: 0 5%;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .label_group {
    display: flex;
    flex-direction: column;
    width: 27vw;
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

  .city {
    display: flex;
    flex-direction: column;
    input {
      width: 18vw;
      margin-right: 23px;
    }
  }

  .zip {
    display: flex;
    flex-direction: column;
    input {
      width: 7vw;
    }
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

  p{
    font-size: 1rem;
    margin-top: 10px;
  }

  a{
    color: #ff7900;
    text-decoration: none;
    transition: all ease 0.8s;
    &:hover{
      text-decoration: underline;
    }
  }

</style>
