<template>
  <header>
    <div class="header">
      <img
        src="@/assets/app-logo.png"
        alt="logo"
        class="logo"  
      >
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>
  .header {
    padding: 10px 50px;
    box-shadow: 0 2px 20px 0 hsl(0deg 0% 72% / 15%);
  }
  .logo {
    width: 200px;
  }
</style>