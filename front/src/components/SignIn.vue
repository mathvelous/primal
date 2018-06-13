<template>
  <main>
    <section>
      <div>
        <h1 class="title">Connectez-vous</h1>
        <form method="POST" class="p5">
          <h2>Entrez vos identifiants</h2>
          <div class="row space_between">
            <div class="label_group">
              <label for="mail">Adresse mail</label>
              <input id="mail" type="email">
            </div>
            <div class="label_group">
              <label for="password">Mot de passe</label>
              <input id="password" type="password">
            </div>
          </div>
          <p>Vous n'avez pas <router-link :to="{ name: 'SignUp'}">de compte ?</router-link></p>
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
    background-color: white;
    width: 67vw;
    height: 40vh;
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
    background-color: #53E093;
    width: 180px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    letter-spacing: 1px;
    transform: translateY(80%);
    button {
      border: none;
      background-color: transparent;
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

</style>
