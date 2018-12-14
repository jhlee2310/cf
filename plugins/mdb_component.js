import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import '@/assets/css/global.css'
import * as mdb from 'mdbvue'

for (const key in mdb) {
  if ({}.hasOwnProperty.call(mdb, key)) {
    Vue.component(key, mdb[key]);
  }
}