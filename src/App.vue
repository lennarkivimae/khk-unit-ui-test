<template>
  <div class="app">
      <Login />
  </div>
</template>

<script>
import Login from '@/components/Login';

export default {
  name: "App",
  components: {
    Login
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.h-hidden {
  display: none;
}

.login {
  padding: 15px 30px;
  max-width: 400px;
}

.textfield {
  border: 1px solid black;
  padding: 8px 12px;
  margin-top: 4px;
}

.login__heading {
  color: cornflowerblue;
}

.login__subheading {
  margin-bottom: 12px;
}

.login__inner {
  margin-top: 8px;
}

.login__content {
  display: flex;
  flex-direction: column;
}

.login__username,
.login__password{
  margin-bottom: 12px;
}

.button {
  border: 1px solid black;
  padding: 10px 15px;
  background-color: white;
  color: black;
  transition: .3s ease-in-out;
}

.button:hover {
  color: white;
  background-color: black;
}

.logged-in {
  color: green;
}

</style>
