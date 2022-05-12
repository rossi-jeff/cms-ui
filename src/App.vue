<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script type="text/javascript">
import NavBar from "./components/layout/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style></style>
