<template>
  <footer>
    <div class="logo row justify-center">
      <router-link :to="{ name: 'Home'}">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
    </div>
    <div class="marge">
      <div class="row">
        <div class="menu2">
          <router-link :to="{ name: 'Order'}">Commander</router-link>
          <router-link :to="{ name: 'Contact'}">Contact</router-link>
          <router-link :to="{ name: 'Account'}">Mon compte</router-link>
        </div>
        <div class="menu2">
          <router-link :to="{ name: 'Home'}">Accueil</router-link>
          <router-link :to="{ name: 'What'}">Qu'est ce que c'est?</router-link>
        </div>
      </div>
      <hr>
      <p>© Tous droits réservés primal.cf</p>
      <div class="row flex-end">
        <a href="https://www.instagram.com/" target="_blank" class="network"><img src="../assets/images/instagram.svg"
                                                                                  alt="Instagram"></a>
        <a href="https://www.facebook.com/" target="_blank" class="network"><img src="../assets/images/facebook.svg"
                                                                                 alt="Facebook"></a>
        <a href="https://www.linkedin.com/" target="_blank" class="network"><img src="../assets/images/linkedin.svg" alt="Linkedin"></a>
      </div>
    </div>
    <!-- todo: scroll top on click router links-->
  </footer>
</template>

<style lang="scss">
  footer {
    background-color: #22292E;
    padding: 30px 0;
    .menu2 {
      display: flex;
      flex-direction: column;
      margin-right: 80px;
      line-height: 30px;
      margin-bottom: 20px;
      a {
        color: #fafdfa;
        text-decoration: none;
        font-family: Avenir;
        font-size: 0.9rem;
      }
    }
    .logo img {
      width: 100px;
      height: auto;
      margin-bottom: 20px;
    }
    p {
      color: #fafdfa;
      font-family: Avenir;
      text-align: center;
      margin-top: 30px;
    }
    .network img {
      width: 30px;
      padding: 0 15px;
      &:last-child {
        padding-right: 0;
      }
    }
  }

  hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 0.5px;
    border-color: #fafdfa;
  }

  /*********** Responsive ***********/

  @media screen and (max-width: 960px) {
    footer {
      .menu2 {
        line-height: 20px;
        a {
          font-size: 0.8rem;
        }
      }
    }

    .network img {
      margin-top: 20px;
    }
  }

</style>
