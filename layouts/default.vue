<template>
  <div id="wrapper">
    <header>
      <side-nav
        logo="https://mdbootstrap.com/img/logo/mdb-transparent.png"
        :OpenedFromOutside.sync="toggleA"
        color="cyan darken-4"
        hidden
        waves>
        <li>
          <ul class="social">
            <li><a href="#" class="icons-sm fb-ic"><fa icon="facebook" /></a></li>
            <li><a href="#" class="icons-sm pin-ic"><fa icon="pinterest" /></a></li>
            <li><a href="#" class="icons-sm gplus-ic"><fa icon="google-plus" /></a></li>
            <li><a href="#" class="icons-sm tw-ic"><fa icon="twitter" /></a></li>
          </ul>
        </li>
        <li>
          <ul class="collapsible">
            <li>
              <a class="collapsible-header ripple-parent" >
                <fa icon="envelope-o"></fa> 메뉴1
              </a>
            </li>
          </ul>
        </li>
      </side-nav>
<!--       
      <navbar position="top" class="flexible-navbar z-depth-0 border border-light border-top-0 border-left-0 border-right-0" >
        <mdb-navbar-brand href="#/" style="font-weight: bolder;">
          EOStics
        </mdb-navbar-brand>

        <div class="float-right side-menu-toggle">
          <a href="#" data-activates="slide-out" class="button-collapse" @click="toggleA = !toggleA">
            <i class="fa fa-bars"></i><span class="sr-only" aria-hidden="true">Toggle side navigation</span>
          </a>
        </div>
      </navbar> -->
    </header>
    <main class="main">
      <nuxt :key="$router.fullPath"/>
      <footer style="z-index=0">
        <div>
          <div class="footer-copyright text-center py-3">
            <container fluid>
                <span>Copyright &copy; 2018 EOSBLACK PTE. LTD. </span>
                <span class="newline">All Rights Reserved.</span>
            </container>
          </div>
        </div>
      </Footer>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleA: false,
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&subset=korean');

* {
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
}

footer {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight:300;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: #333333;
  font-size: 0.8em
}

#wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #16191e,#282832);
}

.main {
  height: calc(100% - 57px);
  margin-top: 57px;
  z-index: 1;
}

.main:before  {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('~assets/image/pattern.png');
  background-repeat: repeat;
  opacity: 0.1;
  z-index: 0;
}

.flexible-navbar .navbar-toggler {
  display: none !important;
}

.side-menu-toggle {
  display: none !important;
}

footer {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.31;
  letter-spacing: 1.6px;
  text-align: center;
  color: #565c69;
  background-color: transparent;
  padding-bottom: 25px;
}

@media (max-width: 767px) {
  .side-menu-toggle {
    display: inline-block !important;
  }
}
@media screen and (min-width: 576px) and (max-width: 1024px) {
  #wrapper{
    min-height:500px;
    margin-top:0;
  }
}
@media screen and (max-width: 575px) {
  footer{
    font-size:14px;
    min-width:330px;
  }
  footer .newline::before{
    content:'';
    display:block;
    height:0;
  }
  main.main{
    height:100%;
    margin-top:0;
  }
}
</style>

