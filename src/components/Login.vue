<template>
  <div>
    <div class="login" v-if="!loggedin">
      <h1 class="login__heading"> Log in </h1>
      <div class="login__inner">
        <div class="login__content">
          <p class="login__subheading">To log in enter your credentials below:</p>
          <label>Username</label>
          <input type="text" name="login" class="textfield login__username">
          <label>Password</label>
          <input type="password" name="login" class="textfield login__password">
        </div>
        <div class="login__buttons">
          <button @click="login(true)" class="button login__login">Login</button>
        </div>
      </div>
    </div>
    <div class="logged-in" v-if="loggedin">
      <h1 class="logged-in__heading">Logged in</h1>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'login',
    methods: {
      login: function() {
        const username = document.querySelector('.login__username').value;
        const password = document.querySelector('.login__password').value;

        if (username === 'admin', password === 'qwerty') {
          this.$store.commit('login', true);
        } else {
          alert('Wrong username or password');
        }
      }
    },
    computed: {
      ...mapGetters({
        loggedin: 'loggedin'
      }),
      logged: {
        get(){
          return this.loggedin
        },
        set(newLoggedIn){
          return newLoggedIn
        }
      }
    }
  }
</script>
