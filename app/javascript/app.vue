<template>
  <div id='app'>
    {{ message }}
    
    <!--<p>{{ message }}</p>
    {{1+2+3}}
    {{12/4}}-->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to Cinematronix!"
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
  color: blue;
}
</style>
