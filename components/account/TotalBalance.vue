<template>
  <mdb-container class="p-0" fluid>
    <mdb-card class="w-100 z-depth-0">
      <mdb-card-header class="z-depth-0 header">
        <div class="d-inline-block">
          <strong class="header-title">Total Balance</strong>
          <div class="header-sub">
            <span class="header-title-eos">{{ balanceData.eosAmount | comma }}</span> <span class="header-title-eos-currency">EOS</span>
            <span class="header-title-usd">${{ balanceData.totalEosPrice | toFixed(2) | comma }}</span> <span class="header-title-usd-currency"> USD (${{ balanceData.eosPrice }}/EOS)</span>
          </div>
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
        <div v-if="collapse" ref="collapseContent" class="collapse show collapse-item" >
          <mdb-card-group>
            <mdb-card> 
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">Unstaked</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <span class="value ml-2">{{ balanceData.unstaked | toFixed(4) | comma }}</span>
                    <span class="symbol">EOS</span>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress :value="calculateUnstakedRemainStatePer()"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
            <mdb-card>
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">Staked</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <span class="value ml-2">{{ balanceData.staked | toFixed(4) | comma }}</span>
                    <span class="symbol">EOS</span>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress color="#1991eb" :value="calculateStakedRemainStatePer()"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
            <mdb-card>
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">Refunding</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <span class="value ml-2">{{ balanceData.refund | toFixed(4) | comma }}</span>
                    <span class="symbol">EOS</span>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress color="#1991eb" :value="calculateRefundRemainStatePer()"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
          </mdb-card-group>
          <mdb-card-group>
            <mdb-card>
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">RAM used</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <div v-if="resourceData.ram.max !== -1">
                      <span class="value mr-1">{{ resourceData.ram.used / 1024 | toFixed(2) | comma }}</span><span class="symbol">KB</span> /
                      <span class="value mr-1">{{ resourceData.ram.max / 1024 | toFixed(2) | comma }}</span><span class="symbol">KB</span>
                    </div>
                    <div v-else>
                      <span class="value"></span>∞<span class="symbol"></span>/<span class="value"></span>∞<span class="symbol"></span>
                    </div>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress color="#1991eb" :value="resourceData.ram.max !== -1? calculateRamRemainStatePer() : 100"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
            <mdb-card>
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">CPU used</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <div v-if="resourceData.cpu.max !== -1">
                      <span class="value mr-1">{{ resourceData.cpu.used / 1000 | comma }}</span><span class="symbol">ms</span> /
                      <span class="value mr-1">{{ resourceData.cpu.max / 1000 | comma }}</span><span class="symbol">ms</span>
                      <span v-if="resourceData.cpu.weight" class="weight">
                        (<span class="value mr-1">{{ resourceData.cpu.weight.split(" ")[0] }}</span><span class="symbol">{{ resourceData.cpu.weight.split(" ")[1] }}</span>)
                      </span>
                    </div>
                    <div v-else>
                      ∞/∞
                    </div>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress color="#1991eb" :value="resourceData.cpu.max !== -1? calculateCpuRemainStatePer() : 100"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
            <mdb-card>
              <mdb-card-body>
                <mdb-card-text class="clearfix">
                  <div class="d-inline-block">
                    <span class="type">NET used</span>
                  </div>
                  <div class="d-inline-block float-right">
                    <div v-if="resourceData.net.max !== -1">
                      <span class="value mr-1">{{ resourceData.net.used / 1024 | toFixed(2) | comma }}</span><span class="symbol">KB</span> /
                      <span class="value mr-1">{{ resourceData.net.max / 1024 | toFixed(2) | comma }}</span><span class="symbol">KB</span>
                      <span v-if="resourceData.net.weight" class="weight">
                        (<span class="value mr-1">{{ resourceData.net.weight.split(" ")[0] }}</span><span class="symbol">{{ resourceData.net.weight.split(" ")[1] }}</span>)
                      </span>
                    </div>
                    <div v-else>
                      <span class="value"></span>∞<span class="symbol"></span>/<span class="value"></span>∞<span class="symbol"></span>
                    </div>
                  </div>
                </mdb-card-text>
                <mdb-progress-wrapper :height="8">
                  <mdb-progress color="#1991eb" :value="resourceData.net.max !== -1? calculateNetRemainStatePer() : 100"></mdb-progress>
                </mdb-progress-wrapper>
              </mdb-card-body>
            </mdb-card>
          </mdb-card-group>
        </div>
      </transition>
    </mdb-card>
  </mdb-container>
</template>
<script scoped>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    resourceData: {
      type: Object,
      required: true,
    },
    balanceData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      collapse: true,
      height: 0,
    }
  },
  mounted() {
    this.height = this.$refs.collapseContent.clientHeight;
    this.collapse = this.show;
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
    calculateCpuRemainStatePer() {
      return _.floor((this.resourceData.cpu.used / this.resourceData.cpu.max) * 100, 2) || 0
    },
    calculateRamRemainStatePer() {
      return _.floor((this.resourceData.ram.used / this.resourceData.ram.max) * 100, 2) || 0
    },
    calculateNetRemainStatePer() {
      return _.floor((this.resourceData.net.used / this.resourceData.net.max) * 100, 2) || 0
    },
    calculateUnstakedRemainStatePer() {
      return _.floor((this.balanceData.unstaked / this.balanceData.total) * 100, 2) || 0
    },
    calculateStakedRemainStatePer() {
      return _.floor((this.balanceData.staked / this.balanceData.total) * 100, 2) || 0
    },
    calculateRefundRemainStatePer() {
      return _.floor((this.balanceData.refund / this.balanceData.total) * 100, 2) || 0
    },
  },
}
</script>
<style scoped>

.card {
  background-color: #16181d !important;
}
.progress {
  background-color: #262c38;
}
.progress-bar {
  background-color: initial;
  background-image: linear-gradient(to left, #1991eb, #2ea1f8);
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
.weight {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: left;
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
.header-sub {
  display: inline-block;
}
.header-title-eos {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1.2px;
  color: #16b4ff;
  margin-left: 95px;
}
.header-title-eos-currency {
  
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.7px;
  color: #7f8fa4;
}
.header-title-usd {
  
  margin-left: 42px;
  font-size: 24px;
  font-weight: normal;
  letter-spacing: 1.2px;
  color: #ffffff;
}
.header-title-usd-currency {
  
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: left;
  color: #7f8fa4;
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

</style>
<style scoped>
  @import url('../../assets/css/components/account/totalbalance/mobile.css');
  @import url('../../assets/css/components/account/totalbalance/tablet.css');
  @import url('../../assets/css/components/account/totalbalance/laptop.css');
</style>

