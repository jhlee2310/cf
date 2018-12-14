<template>
  <mdb-row>
    <mdb-col>
      <mdb-container fluid class="pt-5">
      <mdb-card>
        <mdb-card-body class="pl-3 pr-3 pt-2 pb-0">
          <mdb-row class="block-example border-bottom border-grey">
              <mdb-col md="12" class="pb-4">
                <span class="tx_title">Block Number</span> <small class="transactionTxt">{{ block }}</small>
              </mdb-col>
          </mdb-row>
          <mdb-row class="dtl block-example border-bottom border-grey">
            <mdb-col md="4" class="block-example border-right border-grey">
              <mdb-row style="padding-left: 24px; margin-top: 30px; margin-bottom: 32px;">
                <span class="tx_status">Block Hash</span>
              </mdb-row>
              <mdb-row style="margin-bottom: 33px;">
                <mdb-col col=12 style="white-space: nowrap; padding-left: 24px;">
                <div class="blockId" v-if="blocks && blocks.blockId">
                  {{ blocks.blockId }}
                </div>
                </mdb-col>
              </mdb-row>
            </mdb-col>
            <mdb-col md="4" class="block-example border-right border-grey">
              <mdb-row style="margin-top: 30px; margin-bottom: 29px;">
                <mdb-col col=12 style="white-space: nowrap; padding-left: 36px; padding-right: 38px;">
                  <div class="tx_status">Block Producer
                    <span class="producer" v-if="blocks && blocks.blockProducer">
                      <router-link :to="`/account/${blocks.blockProducer}`" style="color: #17cd28;">
                        {{ blocks.blockProducer }}
                      </router-link>
                    </span>
                  </div>
                </mdb-col>
              </mdb-row>
              <mdb-row style="margin-bottom: 32px;">
                <mdb-col col=12 style="white-space: nowrap; padding-left: 36px; padding-right: 38px;">
                  <div class="tx_status">Timestamp
                    <span class="dateTime" v-if="blocks && blocks.timestamp">
                      {{ formatDateFull(blocks.timestamp) }}
                    </span>
                  </div>
                </mdb-col>
              </mdb-row>
            </mdb-col>
            <mdb-col md="4">
              <mdb-row style="margin-top: 30px; margin-bottom: 29px;">
                <mdb-col col=12 style="white-space: nowrap; padding-left: 35px; padding-right: 36px;">
                  <div class="tx_status">Prev Block
                    <router-link :to="'/block/' + (block-1)" class="producer">
                      {{ block-1 }}
                    </router-link>
                  </div>
                </mdb-col>
              </mdb-row>
              <mdb-row style="margin-bottom: 32px;">
                <mdb-col col=12 style="white-space: nowrap; padding-left: 35px; padding-right: 36px;">
                  <div class="tx_status">Next Block
                    <router-link :to="'/block/' + (1+Number(block))" class="producer">
                      {{ 1+Number(block) }}
                    </router-link>
                  </div>
                </mdb-col>
              </mdb-row>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
      </mdb-container>
      <mdb-container fluid class="pt-2">
      <mdb-card>
        <mdb-card-body>
          <div class="tx_title">Transactions</div>
          <mdb-row class="block-example border-top border-bottom border-grey p-2 act_header">
            <mdb-col col="1" style="min-width: 100px;">
              Tx ID
            </mdb-col>
            <mdb-col col="2">
              Type
            </mdb-col>
            <mdb-col col="9">
              Data
            </mdb-col>
          </mdb-row>
          <div class="pr-2">
          <div v-if="blocks.transactionActions && blocks.transactionActions.length > 0">
            <div v-for="(action, index) in blocks.transactionActions" :key="action.actionId">
          <mdb-row class="block-example border-bottom border-grey p-2 pt-3 mt-1 pb-4">
            <mdb-col col="1" style="min-width: 100px;">
                <router-link :to="`/transaction/${action.transactionId}`" class="transaction">
                  {{ action.transactionId }}
                </router-link>
            </mdb-col>
            <mdb-col col="2" class="type">
              <mdb-btn v-if="dataJson(action.data) && dataJson(action.data).from && dataJson(action.data).to" rounded size="sm" color="blue-grey" disabled>{{action.actionName}}</mdb-btn>           
              <mdb-btn v-else rounded size="sm" color="blue-grey" disabled>{{action.contract}} - {{action.actionName}}</mdb-btn>
            </mdb-col>
            <mdb-col col="9">
              <mdb-row>
                <mdb-col>
              <div v-if="dataJson(action.data) && dataJson(action.data).from && dataJson(action.data).to">
                <router-link :to="`/account/${dataJson(action.data).from}`" class="rink_account">
                  {{ dataJson(action.data).from }}
                </router-link><span class="arrow">→</span>
                <router-link :to="`/account/${dataJson(action.data).to}`" class="rink_account">
                  {{ dataJson(action.data).to }}
                </router-link>
                <span class="pl-3 trf_qty">{{ dataJson(action.data).quantity }}</span>
                <div class="data_memo" v-if="dataJson(action.data).memo">(Memo: {{ dataJson(action.data).memo }})</div>
              </div>
              <div v-else>
                <vue-json-pretty :data="dataJson(action.data)"></vue-json-pretty>
              </div>
                </mdb-col>
              </mdb-row>
              <mdb-row v-for="childAction in action.childAction" :key="childAction.actionId" class="mt-3 ml-2">
                <mdb-col>
                <div v-if="dataJson(childAction.data) && dataJson(childAction.data).from && dataJson(childAction.data).to">
                  <mdb-btn rounded size="sm" outline="blue-grey" disabled class="text-capitalize">{{childAction.actionName}}</mdb-btn>
                  <!-- <span class="block-example border border-dark pl-2 pr-2 text-capitalize">{{childAction.actionName}}</span> -->
                  <div class="child_act_data">
                  <div>Action Receiver: <span>{{childAction.receiver}}</span></div>
                  <div><span>{{ dataJson(childAction.data).from }}</span> -> <span class="pr-2">{{ dataJson(childAction.data).to }}</span> {{ dataJson(childAction.data).quantity }} </div>
                  <div v-if="dataJson(childAction.data).memo" class="data_memo">Memo: {{ dataJson(childAction.data).memo }}</div>
                  </div>
                </div>
                <div v-else>
                  <span class="child_act_data">
                  <mdb-btn rounded size="sm" outline="blue-grey" disabled>{{childAction.contract}} - {{childAction.actionName}}</mdb-btn>
                  <div>Action Receiver: <span>{{childAction.receiver}}</span></div>
                  <vue-json-pretty :data="dataJson(childAction.data)" class="child_json"></vue-json-pretty>
                  </span>
                </div>
                </mdb-col>
              </mdb-row>
            </mdb-col>
          </mdb-row>
            </div>
            </div>
          </div>
        </mdb-card-body>
      </mdb-card>
      </mdb-container>
    </mdb-col>
  </mdb-row>
</template>
<script>

export default {
  layout: 'result',
  async asyncData({app, params,error}) {
    try {
      const response = await app.$axios.get(`/block/${params.block}`)

      console.log("response",response)

      if(response.data.resultCode==200){
        const blocks = response.data.data
  
        return {
          blocks,
          block: params.block,
        }
      }else{
        error({ statusCode: response.data.resultCode})
      }


    }catch(e){
      error({ statusCode: '404', message: 'Post not found' })
    }
  },
  data () {
    return {
      loading: true,
      error: false,
    }
  },
  methods: {
    formatDateFull(dateArr) {
      return this.$moment(dateArr).format('lll')
    },
    dataJson(data){
      return JSON.parse(data)
    },
  }
}
</script>

<style scoped>

.transaction {
    display:block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 100px;
  }

a {
  color: #16b4ff;
}

.btn.disabled {
  opacity: 1;
  font-weight: normal !important;
  font-style: normal !important;
  font-stretch: normal !important;
  line-height: normal !important;
  letter-spacing: 0.7px;
  border-radius: 24.5px;
  margin: 0;
  margin-right: 10px;
  white-space:nowrap;
}

.btn-outline-success {
  font-size: 14px;
  /* margin: 27px 10px 0 0; */
  text-align: center;
  color: #17cd28 !important;
  background-color: #1e2126 !important;
  padding: 2px 15px 2px 16px !important;
  border-color: #17cd28 !important; 
}

.btn-outline-blue-grey {
  background-color: #1e2126 !important;
  text-transform : none;
  font-size: 14px;
  font-weight: 300 !important;
  font-style: normal !important;
  font-stretch: normal !important;
  line-height: normal !important;
  letter-spacing: 1.4px !important;
  text-align: left;
  padding: 2px 14px 2px 15px !important;
  border: 1px solid!important;
  border-color: #516173 !important;
  margin-bottom: 10px !important;

}

.btn-blue-grey {
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: left;
  text-transform : none !important;
  background-color: #516173 !important;
  padding: 5px 23px 5px 21px !important;
}


.card {
  background-color: #16181d !important;
  box-shadow: none !important;
}
  
.tx_title {
  font-size: 24px;
  font-weight: 100;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  text-align: left;
  color: #656c79;
}

.transactionTxt {
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.2px;
  text-align: left;
  color: #16b4ff;
  padding-left: 82px;
}

.blockId {
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: left;
  color: #e2e5ea;
  white-space: normal;
}

.tx_status {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.9px;
  text-align: left;
  color: #7f8fa4;
  /* padding: 37px 0; */
  vertical-align:middle;
  white-space: nowrap;
  width: 100%;
}

.dtl {
  background-color: rgba(0, 0, 0, 0.35);
}

.border-right, .border-bottom {
    border-color: #252831!important;
}

.producer {
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: right;
  float: right;
  white-space: normal;
}

.dateTime {
  font-size: 17px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  float: right;
  color: #e2e5ea;
  white-space: normal;
}

.used {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: right;
  color: #e2e5ea;
  float: right; 
}

.used .unit {
  color: #7f8fa4;
}

.act_header {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
  color: #a1abbd;
  margin-top: 19px !important; 
  padding-top: 23px !important; 
  padding-bottom: 18px !important;
}

.rink_account {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
}

.trf_qty {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
  color: #ffffff;
}

.child_act_data {
  font-size: 14px;
  font-weight: 200;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: 1.4px;
  text-align: left;
  color: #7f8fa4;
}

.child_act_data span {
  color: #e2e5ea;
}

.data_memo {
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: 1.4px;
  text-align: left;
  color: #565c69;
}

.arrow {
  font-size: 16px;
  font-weight: 100;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #7f8fa4;
}


.border-danger {
    color: red;
  }

  .child_json span{
    color: #565c69;
  }
  
  .blockNum {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .preloader-wrapper.small {
    width: 1rem;
    height: 1rem;
  }


  .btn[class*="btn-outline-"].btn-sm {
    font-weight: bold;
    vertical-align: middle;
  }
  .preloader-wrapper.small{
    vertical-align: middle;
  }
  .type {
    min-width: 230px;
  }
  .container-fluid {
    padding: 0 35px;
  }
</style>

<style>
.vjs__tree {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 200;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.86;
  letter-spacing: 1.4px;
  text-align: left;
}
.vjs__tree__content {
    border-left: none !important;
    color: #ff3333;
}
.vjs__tree__node {
    color: #7f8fa4;
}
.vjs__tree .vjs__value__string {
  color: #3389ff;
}
.vjs__tree .vjs__value__number {
  color: #33ff33;
}

.child_json .vjs__tree__content{
  color: #565c69;
}

.child_json .vjs__value__string, .child_json .vjs__value__number{
  color: #7f8fa4;
}
</style>
