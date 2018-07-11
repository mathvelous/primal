<template>
  <main>
    <section>
      <div>
        <h1 class="title">Connectez-vous</h1>
        <form @submit.prevent="signin" class="p5">
          <h2>Entrez vos <span>identif</span><span>iants</span></h2>
          <div class="row space_between m_column">
            <div class="label_group">
              <label for="mail">Adresse mail</label>
              <input v-model="conn.mail" id="mail" type="email">
            </div>
            <div class="label_group">
              <label for="password">Mot de passe</label>
              <input v-model="conn.password" id="password" type="password">
            </div>
          </div>
          <p>Vous n'avez pas <router-link :to="{ name: 'SignUp'}">de compte ?</router-link></p>
          <div class="row justify-center">
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
  export default {
    name: 'SignUp',
    data() {
      return {
        conn:{
          mail: '',
          password: '',
        }
      }
    },
    methods: {
      signin: function() {
        this.$http.post(`${process.env.URL}users/conn`, {
          data: this.conn
        })
          .then(response => {
            console.log(response.data)
            if (response.data != 'Erreur de connection'){
              this.$cookies.set('user', response.data, '14d')
              if (window.location.search == '')
                this.$router.push('/account')
              else
                this.$router.push('/cart')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
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
    font-family: 'fira_sansmedium';
  }

  h2 {
    font-family: 'fira_sansmedium';
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

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(50%);
    button {
      border-radius: 5px;
      background-color: #53E093;
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
  }

  a{
    color: #ff7900;
    text-decoration: none;
    transition: all ease 0.8s;
    &:hover{
      text-decoration: underline;
    }
  }


  /*********** Responsive ***********/

  @media screen and (max-width: 480px) {
    section {
      width: 80vw;
    }

    .title {
      transform: translateY(-50%);
      width: 255px;
      margin-left: 0%;
    }

    main{
      height: 80vh;
    }

    .label_group {
      width: 70vw;
    }
  }

  @media all and (min-width: 481px) and (max-width: 768px) {

  }

  @media all and (min-width: 769px) and (max-width: 1024px) {

  }

  @media screen and (min-width: 1224px) {

  }

</style>
