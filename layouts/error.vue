<template>
<div class="error-page">
  <div class="div_center">
        <div v-if="error.statusCode == 500 || error.statusCode == 900 ">
          <img src="~assets/image/vector-smart-object.png" />
          <p>Nothing Found!</p>
          <div class="content">EOStics supports searching information by Account/key/tx/block #.<br/>
Please confirm the input is correct and try searching again.</div>
        </div>
        <div v-else-if="error.statusCode == 404">
            <img src="~assets/image/vector-smart-object.png" />
          <p>Nothing Found!</p>
        </div>
        <h1 v-else>An error occurred</h1>
  </div>
</div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'result' // you can set a custom layout for the error page
}
</script>

<style scoped>
p {
  font-size: 26px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.69;
  letter-spacing: 1.3px;
  text-align: center;
  color: #e2e5ea;
  margin-bottom: 29px;
  margin-top: 49px;
}

.content {
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 1px;
  text-align: center;
  color: #7f8fa4;
}
.error-page {
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

.error-page::before  {
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

.div_center{
	position: absolute;top: 50%;left: 50%;width:100%;-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);

}
</style>
