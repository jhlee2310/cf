<template>
  <mdb-container class="p-0" fluid>
    <mdb-card class=" z-depth-0">
      <mdb-card-header class="z-depth-0 header">
        <div class="d-inline-block">
          <strong class="header-title">Tokens</strong>
          <span class="header-title-kind-in-total">{{tokenTransfers.length}} Kinds in Total {{totalAmount | toFixed(2) | comma}} USD</span>
        </div>
        <div class="d-inline-block float-right card-toggle-box">
          <mdb-btn 
            flat
            class="header-title-collapse"
            @click="collapse = !collapse"
          >
            {{ collapse? 'Collapse' : 'Expand' }}
            <mdb-icon :icon="collapse?'angle-down':'angle-up'" class="ml-1"/>
          </mdb-btn>
        </div>
      </mdb-card-header>
      <transition @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave">
        <div v-if="collapse" ref="collapseContent" class="collapse show collapse-item">
          <mdb-card-body class="pt-0">
            <mdb-row>
              <mdb-col 
                v-for="token in tokenTransfers"
                :key="token.symbol"
                class="token-column"
                style="margin-top: 20px"
              >
                <mdb-card class="box-token z-depth-0">
                  <mdb-card-body style="padding: 20px 0px 18px 16px">
                    <mdb-card-text class="m-0">
                      <span class="box-token-balance">{{token.balance | comma}}</span>
                      <span class="box-token-symbol">{{token.symbol}}</span>
                    </mdb-card-text>
                    <mdb-card-text class="m-0">
                      <span>{{token.code}}</span>
                    </mdb-card-text>
                    <img 
                      :src="`https://s3.ap-northeast-2.amazonaws.com/eostics/dev/icon/token/${token.symbol.toLowerCase()}.png`" 
                      onError="this.src='https://s3.ap-northeast-2.amazonaws.com/eostics/dev/icon/token/default.png'"
                      class=" z-depth-0 rounded-circle" 
                      alt="token image"
                    />
                  </mdb-card-body>
                  <mdb-card-footer class="box-token-footer">
                    <span class="box-token-footer-balance">$ {{ token.amount || 0 | toFixed(2) | comma }}</span>
                    <span class="box-token-footer-currency">USD</span>
                  </mdb-card-footer>
                </mdb-card>
              </mdb-col>
            </mdb-row>
          </mdb-card-body>
        </div>
      </transition>
    </mdb-card>
  </mdb-container>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    tokenData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tokenTransfers () {
      return this.tokenData.list.filter(token => {
        return token.symbol !== 'EOS'
      })
    }
  },
  data() {
    return {
      collapse: true,
      totalAmount: 0,
      height: 0
    }
  },
  mounted() {
    this.height = this.$refs.collapseContent.clientHeight;
    this.collapse = this.show;
    this.tokenTransfers.forEach(token =>{
        this.totalAmount += parseFloat(token.amount)
    })
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
    },
    afterEnter(el) {
      el.style.height = this.height + 'px';
    },
    beforeLeave(el) {
      el.style.height = '0';
    },
  },
}
</script>
<style scoped>
.currency {
  color: #ced4da;
}
.card {
  background-color: #16181d !important;
}
.progress {
  background-color: #262c38;
}
.header {
  border-bottom: 1px solid #252831;
}
.collapse-item {
  overflow: hidden;
  padding: 0;
  transition: height 0.3s ease;
}
.type {
  
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: left;
  color: #7f8fa4;
}
.value {
  
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: right;
  color: #ffffff;
}
.symbol {
  font-size: 14px;
  letter-spacing: 0.7px;
  color: #7f8fa4;
}
.header-title {
  
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  text-align: left;
  color: #656c79;
}
.header-title-kind-in-total {
  
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.8px;
  text-align: left;
  color: #7f8fa4;
  margin-left: 179px;
}
.header-title-collapse {
  
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: right;
  color: #7f8fa4;
  padding: 0;
}
.box-token {
  /* width: 280px; */
  border-radius: 4px;
  background-color: #191b20;
  border: 1px solid #333744;
}
.box-token img {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 15px;
}
.box-token-balance {
  
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: left;
  color: #e2e5ea;
}
.box-token-symbol {
  font-size: 12px;
  letter-spacing: 0.6px;
  color: #16b4ff;
}
.box-token-footer {
  border-top: 1px solid #333744;
  padding: 13px 0px 13px 16px;
}
.box-token-footer-balance {
  
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: left;
  color: #e2e5ea;
}
.box-token-footer-currency {
  font-size: 12px;
  letter-spacing: 0.6px;
  color: #7f8fa4;
}
</style>
<style scoped>
  @import url('../../assets/css/components/account/tokens/mobile.css');
  @import url('../../assets/css/components/account/tokens/tablet.css');
  @import url('../../assets/css/components/account/tokens/laptop.css');
  @import url('../../assets/css/components/account/tokens/desktop.css');
</style>


