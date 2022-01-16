<template>
  <div class="layout">
    <div class="header">
      <!-- Navigation-->
      <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div class="container px-4 px-lg-5">
          <g-link class="navbar-brand" to="/">Start Bootstrap</g-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto py-4 py-lg-0">
              <li class="nav-item">
                <g-link class="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</g-link>
              </li>
              <li class="nav-item">
                <g-link class="nav-link px-lg-3 py-3 py-lg-4" to="/about/">About</g-link>
                
              </li>
              <li class="nav-item">
                <g-link class="nav-link px-lg-3 py-3 py-lg-4" to="/post/">Sample Post</g-link>
              </li>
              <li class="nav-item">
                <g-link class="nav-link px-lg-3 py-3 py-lg-4" to="/contact/">Contact</g-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <slot />

    <footerCom />
  </div>
</template>




<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>



<script>
import FooterCom from "@/components/Footer.vue";
export default {
  components: {
    FooterCom,
  },
};
</script>

<style>
</style>
