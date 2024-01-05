<template>
  <nav class="nav"></nav>

  <section class="map"></section>
  <section class="drawer"></section>
</template>

<script>
// https://jsfiddle.net/pj1vnsum/
</script>

<style scoped>
.map {
  position: fixed;
}

.drawer {
  position: relative;
  margin-top: 50vh;
}

/* Boilerplate below */

.nav {
  position: fixed;
  left: 0;
  top: 0;
  background: white;
  width: 100%;
  height: 50px;
  z-index: 2;
  box-shadow: rgb(0 0 0 / 16%) 0 0 6px;
}

.map {
  height: 70vh;
  background-color: rgb(199, 229, 242);
  width: 100vw;
  top: 0;
  left: 0;
  /* Obviously, put a real map widget here */
  background-image: url(https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fc1fc667e4e1e431c826373d9482ae0c7);
  background-position: center center;
  background-size: cover;
}

.drawer {
  margin-top: 50vh;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  height: 200vh;
}
</style>
