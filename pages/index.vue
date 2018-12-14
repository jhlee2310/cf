<template>
  그ㅑㄴㅇ
  </container>
</template>

<script>
export default {
  name: 'mainPage',
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    search() {
      let value = this.searchValue.trim()

      if(!value) {
        return false
      }
      
      if (value.length === 64) {
        this.$router.push({ path: `/transaction/${value}` })
      } else if (!isNaN(value)) {
        this.$router.push({ path: `/block/${value}` })
      } else {
        this.$router.push({ path: `/account/${value}` })
      }
    },
    goEosBlack() {
      window.open('https://eosblack.io/?utm_source=eostics&utm_medium=link&utm_campaign=gnb','_blank')
    }
  }
};
</script>

<style scoped>
#main_logo>img{
  margin-right: 12px; margin-bottom: 22px;
}

i {
  color: #656c79;
}

.container {
  height: 90vh;
}

.justify-content-center{padding-top: 35vh};
input::placeholder {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #656c79 !important;
}

#main_logo span{
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: left;
  color: #1585d8;
}

.col-example {
  padding: 1rem;
  background-color: #33b5e5;
  border: 2px solid #fff;
  color: #fff;
  text-align: center;
}

.searchInput {
  border-radius: 2rem !important;
  padding: 0.275rem 2.5rem 0.275rem 1.25rem !important;
  width: 500px;
  height: 45px;
  /* border-radius: 22.5px; */
  background-color: #e3e9f2 !important;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #656c79 !important;
}

.searchInput::placeholder {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #656c79 !important;
}

.worldmap {
  position: fixed;
  top: 57%;
  left: 14.5%;
}

.line {
  position: fixed;
  left: 3.9%;
  top: 9.9%;
}

.group14 {
  position: fixed;
  left: 22.9%;
  top: -23px;
}

.group15 {
  position: fixed;
  top: 34.7%;
  left: -13px;
}

.group16 {
  position: fixed;
  top: 68.4%;
  left: 12.1%;
}

.group17 {
  position: fixed;
  top: 76.5%;
  right: 15.3%;
}

.ellipse2 {
  position: fixed;
  top: 67.5%;
  left: -10px;
}

.ellipse2copy {
  position: fixed;
  top: 42.9%;
  right: 22.1%;
}

.shape1 {
  position: fixed;
  top: -50px;
  right: -91px;
}

.shape1copy {
  position: fixed;
  top: 79.8%;
  left: -81px;
}
.shape1copy2 {
  position: fixed;
  top: 56.9%;
  right: -44px;
}

.shape1copy3 {
  position: fixed;
  top: 47.7%;
  right: 25%;
}

.shape4 {
  position: fixed;
  top: 20.7%;
  right: 13.4%;
}

.cenDiv {
  width: 500px;
  margin: 0px auto;
  position: relative;
}

.searchIcon {
  position: absolute;
  right: 22px;
  z-index: 1;
  cursor: pointer;
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
  display:block !important;
}

.txtSearch {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #7f8fa4;
  text-align: center;
  margin-top: 30px;
  z-index: 2;
}

.txtSearch:hover {
  color: #16b4ff !important;
  text-decoration: underline;
}
</style>
<style scoped>
@import url('~/assets/css/components/index/mobile.css');
</style>

