<template>
  <main>
    <section class="marge section1">
      <div class="card">
        <h1 class="title">Contact client</h1>
        <div class="p5">
          <div class="row align-center">
            <div class="picto">
              <img src="../assets/images/mail.svg" alt="email">
            </div>
            <h2>client@primal.com</h2>
          </div>
          <div class="row align-center">
            <div class="picto">
              <img src="../assets/images/phone.svg" alt="téléphone">
            </div>
            <h2>0123456789</h2>
          </div>
        </div>
      </div>
      <div class="card">
        <h1 class="title">Contact médias</h1>
        <div class="p5">
          <div class="row align-center pb15">
            <div class="picto">
              <img src="../assets/images/mail.svg" alt="mail">
            </div>
            <h2>medias@primal.com</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="img_contact"></section>
  </main>
</template>

<script>
  export default {
    name: 'Contact',
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>

  main {
    display: flex;
    align-items: center;
  }

  section {
    width: 50vw;
    height: 92vh;
  }

  .section1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .img_contact {
    background-image: url("../assets/images/img-contact.jpg");
    background-size: cover;
    background-position: center;

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
    margin-bottom: 15px;
  }

  h1 {
    font-size: 1.5rem;
    font-family: fira_sansmedium;
  }

  .card {
    background-color: #FBFBFB;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:first-of-type {
      margin-bottom: 80px;
    }
  }

  .picto img {
    width: 50px;
    height: auto;
    margin-right: 25px;
  }

  .p5 {
    padding: 0 5%;
    transform: translateY(-20%);
  }

  .pb15{
    padding-bottom: 15px;
  }
</style>
