import Vue from 'vue'
import NumberUtil from '@/utils/NumberUtil'

const globalFilters = [
  {
    name:'comma', 
    action: value => {
      if(isNaN(value))
        return 0

      if(!(NumberUtil.intCheck(value) || NumberUtil.floatCheck(value))) {
        return value
      }
      var parts = value.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
  },
  {
    name:'toFixed', 
    action: (value, decimals) => {
      if(!(NumberUtil.intCheck(value) || NumberUtil.floatCheck(value))) {
        return value
      }
      
      return parseFloat(value).toFixed(decimals)
    }
  },
  {
    name:'formatByte', 
    action: (bytes, decimals) => {
      if(bytes == 0) return '0 Byte';
      var k = 1024,
          dm = decimals <= 0 ? 0 : decimals || 2,
          sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  },
  {
    name:'suffix', 
    action: (value, suffix = '') => {
      if (!value) return ''
      return value + suffix
    }
  },
  {
    name:'lowerCase', 
    action: value => {
      return value.toLowerCase()
    }
  },
  
];

globalFilters.map(filter => {
  Vue.filter(filter.name, filter.action)
});