<template lang="html">
  <div class="loading-page" v-if="loading">
		<mdb-navbar dark id="navbar" position="top" class="white z-depth-0 border border-light border-top-0 border-left-0 border-right-0 border-bottom-0" >
      <mdb-container fluid class="navbar-container">
          <mdb-navbar-brand href="/" class="logo">
            <img src="~assets/image/logo.png"/>
          </mdb-navbar-brand>
          <mdb-navbar-toggler>
            <mdb-navbar-nav right>
              <mdb-input v-model="searchValue" ref="searchInput" class="mr-sm-2 search-input" type="text" placeholder="Search account / key / tx / block" aria-label="Search" maxlength="64" @keyup.enter.native="search()" style="width:600px;"/>
              <img src="~/assets/image/search-icon.png" class="icon-search" v-on:click="search()"/>
            </mdb-navbar-nav>
          </mdb-navbar-toggler>
      </mdb-container>
    </mdb-navbar>
		<main id="main">
			<div class="div_center">
				<img src="~assets/image/main_logo.png"/><br/>
				<div class="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</main>
		<footer>
        <div>
          <div class="footer-copyright text-center py-4 my-3">
            <container fluid>
              Copyright &copy; 2018 EOSBLACK PTE. LTD. All Rights Reserved.
            </container>
          </div>
        </div>
      </footer>
  </div>
</template>

<script>
export default {
	layout: 'result',
  data: () => ({
		loading: false,
		searchValue: '',
  }),
  methods: {
    start () {
    	console.log("loading start")
      this.loading = true
    },
    finish () {
        console.log("loading finish")
			setTimeout(() => {
				this.loading = false
			}, 500);
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif !important;
  background-color: #16181d !important;
}

div,img,a {
  z-index: 1;
}

nav {
  background-color: #16181d !important;
}

#navbar {
  justify-content: flex-start;
}

main {
  flex: 1;
  /* //position: relative; */
}

.navbar-container {
  position: relative;
  display: flex;
  justify-content: initial !important;  
}

.logo,
.search-input,
.gnb {
  flex: 0 0 auto;
}

.logo {
  padding-left: 7px;
}

.search-input {
  display: flex;
  padding-right: 0px !important;
  margin-right: 0px !important;
  width: 50vw;
}

.icon-search {
  width: 25px;
  height: 25px;
  position:absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
}

.div_center{
	position: absolute;top: 50%;left: 50%;width:100%;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);

}
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
	z-index: 100;
}

nav::before, footer::before, main::before  {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('~assets/image/body_bg.png');
  background-repeat: repeat;
  opacity: 0.5;
  z-index: 0;
}

footer {
  position:absolute;
	bottom:0;
	width:100%;
  z-index: 100;
  flex: initial;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.31;
  letter-spacing: 1.6px;
  text-align: center;
  color: #565c69;
  border: 1px solid #252831;
}
.lds-ellipsis {
	display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #16b4ff !important;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
<style>



</style>