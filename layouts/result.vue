<template>
  <div id="wrapper">
    <mdb-navbar dark id="navbar" position="top" class="white z-depth-0 border border-light border-top-0 border-left-0 border-right-0 border-bottom-0" >
      <mdb-container fluid class="navbar-container">
          <mdb-navbar-brand href="/" class="logo">
            <img src="~assets/image/logo.png"/>
            <span class="beta">Beta</span>
          </mdb-navbar-brand>
          <mdb-navbar-nav right>
            <mdb-input v-model="searchValue" ref="searchInput" class="mr-sm-2 search-input" type="text" placeholder="Search account / key / tx / block" aria-label="Search" maxlength="64" @keyup.enter.native="search()"/>
            <img src="~/assets/image/search-icon.png" class="icon-search" v-on:click="search()"/>
          </mdb-navbar-nav>
      </mdb-container>
    </mdb-navbar>
    <main id="main" class="pb-4">
      <mdb-container fluid class="main-container">
        <nuxt :key="$router.fullPath"/>
      </mdb-container>
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
  data() {
    return {
      toggleA: false,
      searchValue: ''
    }
  },
  methods: {
    search() {
      let value = this.searchValue.trim()

      if(!value) {
        return false
      }
      
      let pathaname = window.location.pathname.split('/')

      console.log("window.location.pathname",pathaname[2])
      const param = pathaname[2]

      let path = ''

      if (value.length === 64) {
        path = 'transaction'
      } else if (!isNaN(value)) {
        path = 'block'
        //this.$router.push({ path: `/block/${value}` })
      } else {
        path = 'account'
        //this.$router.push({ path: `/account/${value}` })
      }

      if(value==param){
        this.$router.go()
        //location.reload()
        //this.$router.replace({ path: `/${path}/${value}` })
      }else{
        this.$router.push({ path: `/${path}/${value}` })

      }

      this.searchValue = ''
      this.$refs.searchInput.$el.children[0].value = '';
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

#wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}


#main:before {
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

nav,main,footer {
  background-color: #16181d !important;
}

#navbar {
  justify-content: flex-start;
}

main {
  flex: 1;
  position: relative;
}

.navbar-container {
  position: relative;
  display: flex;
  justify-content: initial !important;
  padding-top: 9px;

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
  width: 600px;
}

.beta {
  font-family: Georgia !important;
  font-size: 14px !important;
  font-weight: normal !important;
  font-style: italic !important;
  font-stretch: normal !important;
  line-height: normal !important;
  letter-spacing: 0.7px !important;
  text-align: left !important;
  color: #565c69 !important;
  display:inline-block !important;
  position: absolute;
  top: 33px;
  padding-left: 5px;
}

.icon-search {
  width: 25px;
  height: 25px;
  position:absolute;
  bottom: 23px;
  right: 20px;
  cursor: pointer;
}

.gnb {
  display: none !important;
  margin-left: auto;
}

.main-container {
  padding-top: 80px;
}

footer {
  position: relative;
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


</style>

<style>
.md-form input[type=text]{
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: left;
  color: #656c79;
  border-bottom: 2px solid #333744 !important;
  padding-left: 10px;
}
.md-form input[type=text]:focus:not([readonly]) {
  border-bottom: 2px solid #16b4ff !important;
}
nav::before, footer::before, .card::before  {
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

div,img,a,select {
  z-index: 1;
}
  @media screen and (min-width: 1025px) and (max-width: 1348px) {
    .search-input{
      width: 500px !important;
    }
    
    .md-form input[type=text]{
      font-size: 16px;
      letter-spacing: 0.8px;
    }
  }
  @media screen and (max-width: 1024px) {
    .search-input{
      width: 398px !important;
    }
    .md-form input[type=text]{
      font-size: 16px;
      letter-spacing: 0.8px;
    }

    .collapse:not(.show) {
        display: none !important;
    }

    .navbar-expand-lg .navbar-toggler {
      display: none !important;
    }

    .navbar-expand-lg .navbar-nav {
      flex-direction: row !important;
    }

    .navbar-expand-lg>.container, .navbar-expand-lg>.container-fluid {
      padding-right: 15px !important;
      padding-left: 15px !important;
    }
  }

  @media screen and (max-width: 575px) {
    .search-input{
      width: 100% !important;
      padding: 21px 0 0 0 !important;
    }

    .navbar-nav {
      width: 100% !important;
    }

    .main-container {
      padding-top: 115px !important;
    }

    .icon-search {
      bottom: 18px !important;
    }
  }

</style>

