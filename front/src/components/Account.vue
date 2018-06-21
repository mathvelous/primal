<template>
  <main>
    <section class="marge">
      <h1 class="title">mon compte</h1>
      <div class="row space_between">
        <div class="card_account">
          <form action="">
            <h2>Mes informations</h2>
            <div class="row space_between">
              <div class="input_groupe">
                <input type="text">
                <input type="text">
              </div>
              <div class="input_groupe">
                <input type="text">
                <input type="text">
              </div>
            </div>
            <div class="button">
              <button><span>Modif</span><span>ier</span></button>
            </div>
          </form>
        </div>
        <div class="card_account">
          <form action="">
            <h2>Mes adresses</h2>
            <div class="row space_between align-end">
              <input type="text">
              <span class="delete"></span>
            </div>
            <div class="button">
              <button>Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="marge">
      <article>
        <h2>Historique des commandes</h2>
        <div class="column justify-center">
          <div class="row space_around">
            <h3>Date</h3>
            <h3>Prix total</h3>
            <h3>Etat</h3>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>

</script>

<style lang="scss" scoped>
  section {
    margin-top: 50px;
    margin-bottom: 60px;
  }

  .title {
    color: white;
    background-color: #ff7900;
    width: 400px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
  }

  h1 {
    font-size: 1.5rem;
    font-family: fira_sansmedium;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.1rem;
  }

  input {
    margin-bottom: 15px;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid #979797;
    height: 30px;
    font-size: 0.9rem;
    transition: all ease 0.8s;
    background-color: transparent;
    width: 90%;
    &:focus {
      border-bottom: 1px solid #53E093;
      outline: none;
    }
  }

  .input_group {
    display: flex;
    flex-direction: column;
  }

  form {
    display: flex;
    flex-direction: column;
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    padding: 30px;
    padding-left: 45px;
    width: 38vw;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    transform: translateY(120%);
    button {
      background-color: #53E093;
      border-radius: 5px;
      width: 180px;
      height: 40px;
      border: none;
      color: white;
      font-size: 1rem;
      font-family: 'fira_sansmedium';
    }
  }

  .delete {
    position: relative;
    top: -20px;
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

  article {
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    padding: 30px;
  }
</style>
