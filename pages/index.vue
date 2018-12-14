<template>
  <div class="test">
    12345
  </div>
</template>

<script>
//import {mapMutations} from 'vuex'
export default {
  name: 'mainPage',
  layout:'result',
  data() {
    return {
      searchValue: '',
      kkk:'asdf',
    }
  },
  methods: {
    rend(){
      alert('x')
    },/*
    ...mapMutations({
      increment: 'help/increment'
    }),*/
  },
  created(){
    
  }
};
</script>

<style scoped>
  .test{width:200px;height:200px;background-color:green;z-index:5;color:white}
</style>

