<template>
  <mdb-container class="p-0" fluid>
    <mdb-card class="w-100 z-depth-0">
      <mdb-card-header class="z-depth-0 header" >
        <div class="header-area">
          <div class="header-title">
            <strong>Search & Result</strong>
          </div>
          <span class="btn-advanced">Go Advanced</span>
        </div>
        <div class="search-area">
          <div class="search-title"></div>
          <div class="search-form">
            <div class="d-inline-block search-form-area-datepicker">
              <date-picker 
                v-model="searchStartDate" 
                :width="180"
                lang="en"
                placeholder="Start Date"
                @change="settingDate = '-1'"
              ></date-picker>
              <span>~</span>
              <date-picker 
                v-model="searchEndDate" 
                lang="en" 
                :width="180"
                :not-before="searchStartDate"
                placeholder="End Date"
                @change="settingDate = '-1'"
              ></date-picker>
            </div>
            <div class="d-inline-block search-form-area-search" >
              <select
                v-model="settingDate"
                class="filter-symbol browser-default custom-select" 
                style="display: inline-block !important"
                @change="changeSettingDate()"
              >
                <option value="-1">Period</option>
                <option value="1">Yesterday</option>
                <option value="2">Today</option>
                <option value="3">Last Week</option>
                <option value="4">Last Month</option>
                <option value="5">Last 7 Days</option>
                <option value="6">Last 30 Days</option>
                <option value="9" selected>All</option>
              </select>
              <mdb-btn 
                class="z-depth-0 btn-search"
                style="margin-left: 5px"
                size="sm" 
                outline="default" 
                darkWaves 
                rounded 
                @click="search()"
              >
                Date Search
              </mdb-btn>
            </div>
          </div>
        </div>
      </mdb-card-header>
      <mdb-card-body class="filter-box">
        <div class="filter-box-row">
          <div class="filter-box-label">
            <span>Filters</span>
          </div>
          <div class="filter-box-actions">
            <mdb-btn class="button-action button-action-receive" :class="[isActiveAction(actions.receive)? 'button-action-receive-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.receive)">RECEIVE</mdb-btn>
            <mdb-btn class="button-action button-action-send" :class="[isActiveAction(actions.send)? 'button-action-send-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.send)">SEND</mdb-btn>
            <mdb-btn class="button-action button-action-contract" :class="[isActiveAction(actions.contract)? 'button-action-contract-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.contract)">CONTRACT</mdb-btn>
            <mdb-btn class="button-action button-action-account" :class="[isActiveAction(actions.account)? 'button-action-account-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.account)">ACCOUNT</mdb-btn>
            <mdb-btn class="button-action button-action-resource" :class="[isActiveAction(actions.resource)? 'button-action-resource-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.resource)">RAM/CPU/NET</mdb-btn>
            <mdb-btn class="button-action button-action-producer" :class="[isActiveAction(actions.producer)? 'button-action-producer-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.producer)">PRODUCER</mdb-btn>
            <mdb-btn class="button-action button-action-vote" :class="[isActiveAction(actions.vote)? 'button-action-vote-enabled' : 'toggle-disabled']" size="sm" @click.native.prevent="actionToggle(actions.vote)">VOTE</mdb-btn>
          </div>
        </div>
        <div class="filter-box-row">
          <div class="filter-box-label"></div>
          <div class="filter-box-symbols">
            <select 
              v-model="filterSymbol"
              class="filter-symbol browser-default custom-select" 
              style="display: inline-block !important"
            >
              <option value="all">-- All Tokens --</option>
              <option 
                v-for="symbol in filteringSymbol" 
                :key="symbol"
                :value="symbol"
              >
                {{ symbol }}
              </option>
            </select>
            <input v-model="filterMemo" class="d-inline filter-account form-control" placeholder="Search memo" />
          </div>
        </div>
        <div class="filter-box-row">
          <div class="filter-box-label"></div>
          <div class="filter-box-etc">
              <div class="d-inline-block">
                <span class="switch-name">Hide Small Balances</span>
                <label class="bs-switch">
                  <input v-model="hideSmallBalance" type="checkbox">
                  <span class="slider round"></span>
                </label>
            </div>
            <a class="reset-all-filters" href="javascript:void(0)" @click="resetAllFilter">Reset All Filters</a>
          </div>
        </div>
      </mdb-card-body>
      <mdb-card-body style="overflow-x: auto; z-index: 0;">
        <div>
          <mdb-table class="table-tx" fixed>
            <mdb-tbl-head>
              <tr>
                <th style="width: 150px">Tx ID</th>
                <th style="width: 200px">Date</th>
                <th style="width: 175px">Type</th>
                <th style="width: 600px">Data</th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body v-if="filteringData.length === 0">
              <tr scope="row">
                <td colspan="4" style="color: #7f8fa4;">No Transactions Found</td>
              </tr>
            </mdb-tbl-body>
            <mdb-tbl-body v-else>
              <tr 
                v-for="(data, index) in filteringData"
                :key="index"
                scope="row"
              >
                <td scope="row">
                  <nuxt-link 
                    :to="`/transaction/${data.transactionId}`"
                    class="table-tx-id"
                    style="color: #e2e5ea !important"
                  >
                    {{ data.transactionId.substring(0,10) }}...
                  </nuxt-link>
                </td>
                <td>
                    <span class="table-tx-date">{{ formatDateFull(data.timestamp) }}</span>
                  </td>
                <td>
                  <mdb-btn 
                    v-if="data.actionName === 'transfer' && data.dataFrom !== accountName"
                    class="button-action type-action-receive" size="sm"
                  >
                    RECEIVE
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'transfer' && data.dataFrom === accountName"
                    class="button-action type-action-send" size="sm"
                  >
                    SEND
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'delegatebw'"
                    class="button-action type-action-resource" size="sm"
                  >
                    CPU/NET - Staked
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'undelegatebw'"
                    class="button-action type-action-resource" size="sm"
                  >
                    CPU/NET - unStaked
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'buyrambytes' || data.actionName === 'buyram'"
                    class="button-action type-action-resource" size="sm"
                  >
                    RAM - buy
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'sellram'"
                    class="button-action type-action-resource" size="sm"
                  >
                    RAM - sell
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'newaccount' || data.actionName === 'updateauth'"
                    class="button-action type-action-account" size="sm"
                  >
                    {{data.actionName === 'newaccount'? 'new account' : 'update auth'}}
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'claimrewards'"
                    class="button-action type-action-producer" size="sm"
                  >
                    Claim rewards
                  </mdb-btn>
                  <mdb-btn 
                    v-else-if="data.actionName === 'voteproducer'"
                    class="button-action type-action-vote" size="sm"
                  >
                    VOTE
                  </mdb-btn>
                  <mdb-btn 
                    v-else
                    class="button-action type-action-vote" size="sm"
                  >
                    {{data.actionName}}
                  </mdb-btn>
                </td>
                <td>
                  <!-- 토큰 주고받기(transfer) 데이터 포맷 정의 -->
                  <div 
                    v-if="data.actionName === 'transfer'"
                  > 
                    <div>
                      <nuxt-link 
                        :to="`/account/${data.jsonData.from}`" 
                      >
                        {{ data.jsonData.from }}
                      </nuxt-link>
                      <span class="transfer-arrow"></span>
                      <nuxt-link 
                        :to="`/account/${data.jsonData.to}`"
                      >
                        {{ data.jsonData.to }}
                      </nuxt-link>
                      <span class="data-transfer-quantity"> {{ data.jsonData.quantity }}</span>
                    </div>
                    <div v-if="!!data.jsonData.memo">
                      <span class="data-memo">(memo : {{ data.jsonData.memo }})</span>
                    </div>
                  </div>
                  <!-- CPU/NET Staked 데이터 포맷 정의 -->
                  <div
                    v-else-if="data.actionName === 'delegatebw'"
                  >
                    <nuxt-link 
                      :to="`/account/${data.jsonData.from}`"
                    >
                      {{ data.jsonData.from }}
                    </nuxt-link>
                    <span class="data-text">delegated from the account</span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.receiver}`"
                    >
                      {{ data.jsonData.receiver }}
                    </nuxt-link>
                    <span class="data-transfer-quantity">{{ data.jsonData.stake_net_quantity }}</span> <span class="data-text">for NET, and</span> <span class="data-transfer-quantity">{{ data.jsonData.stake_cpu_quantity }}</span> <span class="data-text">for CPU</span>
                  </div>
                  <!-- CPU/NET UnStaked 데이터 포맷 정의 -->
                  <div
                    v-else-if="data.actionName === 'undelegatebw'"
                  >
                    <nuxt-link 
                      :to="`/account/${data.jsonData.from}`"
                    >
                      {{ data.jsonData.from }}
                    </nuxt-link>
                    <span class="data-text">undelegated from the account </span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.receiver}`"
                    >
                      {{ data.jsonData.receiver }}
                    </nuxt-link>
                    <span class="data-transfer-quantity">{{ data.jsonData.unstake_net_quantity }}</span> <span class="data-text">for NET, and</span> <span class="data-transfer-quantity">{{ data.jsonData.unstake_cpu_quantity }}</span> <span class="data-text">for CPU</span>
                  </div>
                  <!-- RAM 구매 데이터 포맷 정의 -->
                  <div
                    v-else-if="data.actionName === 'buyrambytes' || data.actionName === 'buyram'"
                  >
                    <nuxt-link 
                      :to="`/account/${data.jsonData.payer}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ data.jsonData.payer }}
                    </nuxt-link>
                    <span v-if="!!data.jsonData.quant" class="data-transfer-quantity">{{ data.jsonData.quant }}</span>
                    <span v-if="!!data.jsonData.bytes" class="data-transfer-quantity">{{ data.jsonData.bytes }} bytes</span>
                    <span class="data-text">RAM for</span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.receiver}`"
                    >
                      {{ data.jsonData.receiver }}
                    </nuxt-link>
                  </div>
                  <!-- 계정 생성 데이터 포맷 -->
                  <div
                    v-else-if="data.actionName === 'newaccount'"
                  >
                    <span class="data-text">New User</span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.name}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ data.jsonData.name }}
                    </nuxt-link>
                    <span class="data-text">created by</span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.creator}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ data.jsonData.creator }}
                    </nuxt-link>
                  </div>
                  <!-- Vote 데이터 포맷 -->
                  <div
                    v-else-if="data.actionName === 'voteproducer'"
                  >
                    <nuxt-link 
                      :to="`/account/${data.jsonData.voter}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ data.jsonData.voter }}
                    </nuxt-link>
                    <span class="data-text">voted for block producers</span>
                    <nuxt-link 
                      v-for="producer in data.jsonData.producers"
                      :key="producer"
                      :to="`/account/${producer}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ producer }}
                    </nuxt-link>
                  </div>
                  <!-- producer(Claim Rewards) 데이터 포맷 -->
                  <div
                    v-else-if="data.actionName === 'claimrewards'"
                  >
                    <span class="data-text">Producer rewards for</span>
                    <nuxt-link 
                      :to="`/account/${data.jsonData.owner}`"
                      style="margin-right:0.3em !important"
                    >
                      {{ data.jsonData.owner }}
                    </nuxt-link>
                  </div>
                  <!-- ETC 데이터 포맷 -->
                  <div
                    v-else
                  >
                    <div
                      v-for="(value, key) in data.jsonData" 
                      :key="key" 
                    >
                      <strong style="color: #7f8fa4">{{ key }}:</strong> <span class="data-text"> {{ value }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-table>
        </div>
        <mdb-row class="mt-3">
          <mdb-col>
            <div class="d-inline-block">
              <span class="data-total-item-label">Total Item : </span>
              <span class="data-total-item-value">{{ filteringData.length }}</span>
            </div>
            <div class="d-inline-block float-right">
              <input 
                v-model.number="goPageNumber"
                type="number" 
                class="form-control form-control-sm d-inline-block" 
                style="width: 150px"
                placeholder="Page No"
                min="1"
                :max="lastPage"
                maxlength="10"
                @keyup.enter="goPage"
              />
              <span class="d-inline-block gopage" @click="goPage()">Go Page</span>
            </div>
            <div class="d-inline-block float-right" style="padding-top: 5px; margin-right: 20px;">
              <img :src="images.leftArrow" class="left-arrow" style="cursor: pointer;" @click="prev()">
              <span class="paging-text"><span style="color: #16b4ff">{{ currentPage }}</span> of {{ lastPage }} pages</span>
              <img :src="images.rightArrow" class="right-arrow" style="cursor: pointer;" @click="next()">
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>
<script>
export default {
  name: 'actionSearch',
  props: {
    accountName: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      images: {
        leftArrow: require('@/assets/image/left-arrow.png'),
        rightArrow: require('@/assets/image/right-arrow.png'),
      },
      searchStartDate: null,
      searchEndDate: null,
      searchOriData: [],
      currentPage: 1,
      pageOffset: 50,
      actions: {
        receive: 'receive',
        send: 'send',
        contract: 'contract',
        account: 'account',
        resource: 'resource',
        producer: 'producer',
        vote: 'vote',
      },
      activeActions: [],
      filterSymbol: 'all',
      filterMemo: '',
      hideSmallBalance: true,
      settingDate: '9',
      goPageNumber: '',
      totalItemCount: 0,
      lastPage: 1,
    }
  },
  mounted() {
    this.search()
  },
  computed: {
    filteringData() {
      let filterData = this.searchOriData.filter( data => {
        if(_.isEmpty(this.activeActions)) {
          return true
        } else {
          let _check = false
          
          if(!_check && this.activeActions.find( v => v === this.actions.receive )) {
            _check = data.actionName === 'transfer' && data.dataFrom !== this.accountName
          }
          if(!_check && this.activeActions.find( v => v === this.actions.send )) {
            _check = data.actionName === 'transfer' && data.dataFrom === this.accountName
          }
          if(!_check && this.activeActions.find( v => v === this.actions.contract )) {
            _check = data.account.toLowerCase() !== 'eosio' && data.account.toLowerCase() !== 'eosio.token'
          }
          if(!_check && this.activeActions.find( v => v === this.actions.resource )) {
            _check = data.actionName === 'delegatebw'
              || data.actionName === 'undelegatebw'
              || data.actionName === 'buyrambytes'
              || data.actionName === 'buyram'
              || data.actionName === 'sellram'
          }
          if(!_check && this.activeActions.find( v => v === this.actions.account )) {
            _check = data.actionName === 'newaccount' || data.actionName === 'updateauth'
          }
          if(!_check && this.activeActions.find( v => v === this.actions.producer )) {
            _check = data.actionName === 'claimrewards'
          }
          if(!_check && this.activeActions.find( v => v === this.actions.vote )) {
            _check = data.actionName === 'voteproducer'
          }

          return _check
        }
      })

      // 2차 필터 (symbol, hideSmallBalance, account, memo)
      return filterData.filter(data => {
        let _check = true
        const jsonData = JSON.parse(data.data)

        // symbol filter
        if(this.filterSymbol !== 'all' ) {
          _check = jsonData.quantity? jsonData.quantity.split(" ")[1] === this.filterSymbol : false
        }

        // hideSmallBalances filter
        if(_check && this.hideSmallBalance) {
          _check = jsonData.quantity? parseFloat(jsonData.quantity.split(" ")[0]) >= 0.0010 : _check
        }

        if(_check && this.filterMemo.trim()) {
          _check = jsonData.memo? jsonData.memo.indexOf(this.filterMemo) !== -1 : false
        }

        return _check
      }).map(data => {
        data.jsonData = JSON.parse(data.data)
        return data
      })
    },
    filteringSymbol() {
      const symbols = this.searchOriData.map( data => {
        const jsonData = JSON.parse(data.data)
        if(jsonData.quantity) {
          return jsonData.quantity.split(" ")[1]
        }
      }).filter( v => !!v)

      return _.uniq(symbols)
    },
  },
  methods: {
    async search() {
      if(this.searchEndDate && !this.searchStartDate) {
        this.$toasted.error('empty StartDate', {
          theme: "bubble", 
          position: "bottom-center", 
          duration : 1000
        })
        return false;
      } else if (this.searchStartDate && !this.searchEndDate){
        this.$toasted.error('empty EndDate', {
          theme: "bubble", 
          position: "bottom-center", 
          duration : 1000
        })
        return false;
      }

      const _params = {
        startDate: this.searchStartDate? this.$moment(this.searchStartDate).format('YYYYMMDD') : '',
        endDate: this.searchEndDate? this.$moment(this.searchEndDate).format('YYYYMMDD') : '',
        pagePerSize: this.pageOffset,
        pageNum: this.currentPage, 
        accountName: this.accountName,
      }

      const response = await this.$axios.$get('/account/transactions', {
        params: _params
      })

      const {totalCnt, accountTransactionList} = response.data

      console.log("accountTransactionList", accountTransactionList)

      this.searchOriData = accountTransactionList.reverse()
      this.totalItemCount = totalCnt
      this.lastPage = Math.ceil(totalCnt / this.pageOffset)
    },
    formatDateFull(dateArr) {
      return this.$moment(dateArr.map((v, i) => { if(i===1) return v-1; return v})).format('lll')
    },
    actionToggle(action) {
      const index = this.activeActions.indexOf(action)
      index === -1? this.activeActions.push(action) : this.activeActions.splice(index,1)
    },
    isActiveAction(action) {
      return this.activeActions.indexOf(action) === -1? false : true
    },
    prev() {
      this.currentPage = Math.max(1, this.currentPage - 1)
      this.search()
    },
    next() {
      this.currentPage = Math.min(this.lastPage, this.currentPage + 1)
      this.search()
    },
    resetAllFilter() {
      this.activeActions = []
      this.filterSymbol = 'all'
      this.filterMemo = ''
      this.hideSmallBalance = true
    },
    changeSettingDate() {
      switch(this.settingDate) {
        // 맞춤
        // case '-1' :
        //   this.searchStartDate = null
        //   this.searchEndDate = null
        //   break
        // 어제
        case '1' :
          this.searchStartDate = this.$moment().subtract(1, 'days')
          this.searchEndDate = this.$moment().subtract(1, 'days')
          break
        // 오늘
        case '2' :
          this.searchStartDate = this.$moment()
          this.searchEndDate = this.$moment()
          break
        // 지난 주
        case '3' :
          this.searchStartDate = this.$moment().subtract(6, 'days').startOf('week')
          this.searchEndDate = this.$moment().subtract(6, 'days').endOf('week')
          break
        // 지난 달
        case '4' :
          this.searchStartDate = this.$moment().subtract(1, 'months').startOf('month')
          this.searchEndDate = this.$moment().subtract(1, 'months').endOf('month')
          break
        // 최근 7일전
        case '5' :
          this.searchStartDate = this.$moment().subtract(6, 'days')
          this.searchEndDate = this.$moment()
          break
        // 최근 30일전
        case '6' :
          this.searchStartDate = this.$moment().subtract(29, 'days')
          this.searchEndDate = this.$moment()
          break
        // 전체
        case '9' :
          this.searchStartDate = null
          this.searchEndDate = null
          break
      }
      this.search()
    },
    goPage() {
      if(this.goPageNumber > 0) {
        this.currentPage = Math.min(this.lastPage, this.goPageNumber)
      }
      this.goPageNumber = ''
    }
  }
}
</script>
<style scoped>
.btn-default:not([disabled]):not(.disabled):active {
  background-color: transparent !important;
}
.card {
  background-color: #16181d !important;
}
.header-title {
  display: inline-block;
  width: 220px;
  margin-right: 10px;
}
.header-title strong {
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  text-align: left;
  color: #656c79;
  vertical-align: middle;
}
.search-area {
  margin-top: 15px;
}
.search-form {
  display: inline-block;
}
.search-title {
  display: inline-block;
  width: 220px;
  margin-right: 10px;
}
.search-form-area-datepicker {
  margin-right: 12px
}
.search-form-area-datepicker span {
  font-size: 17px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #333744;
  padding: 0px 5px;
}
.btn-advanced {
  display: inline-block;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: right;
  color: #ffba00;
}
.btn-advanced:after {
  content: '';
  width: 105px;
  display: block; 
  position: absolute; 
  margin-top: 5px; 
  border-bottom: 1px solid #ffba00;
}
.btn-search {
  border-radius: 20.5px;
  border: 2px solid #16b4ff !important;
  
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #16b4ff !important;
  text-transform: initial;
  margin: 0px;
  padding: 12px 23px
}
.filter-box {
  padding: 5px 20px;
  background-color: #000000;
  z-index: 0;
}
.filter-box-row {
  margin: 15px 0px;
}
.filter-box-label {
  display: inline-block;
  width: 250px;
}
.filter-box-label span {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.9px;
  text-align: left;
  color: #7f8fa4; 
}
.filter-box-actions,
.filter-box-symbols,
.filter-box-etc {
  display: inline-block;
}
a {
  color: #007bff !important;
}
a:hover {
  color: #0056b3 !important;
}
.value {
  color: black;
  font-weight: 500;
}
.symbol {
  font-size: 0.7em;
  color: #ced4da;
}

.button-action {
  border-radius: 15px;
  background-color: transparent !important;
  font-size: 13px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  text-align: center;
  padding: 5px 20px !important;
  margin-left: 0px;
}

.button-action-receive-enabled {
  border: 2px solid #17cd28 !important;
  background-color: #17cd28 !important;
  color: #ffffff !important;
}
.type-action-receive {
  border: 2px solid #17cd28 !important;
  color: #17cd28 !important;
}

.button-action-send-enabled {
  border: 2px solid #f7981c !important;
  background-color: #f7981c !important;
  color: #ffffff !important;
}
.type-action-send {
  border: 2px solid #f7981c !important;
  color: #f7981c !important;
}

.button-action-contract-enabled {
  border: 2px solid #1991eb !important;
  background-color: #1991eb !important;
  color: #ffffff !important;
}
.type-action-contract {
  border: 2px solid #1991eb !important;
  color: #1991eb !important;
}

.button-action-account-enabled {
  border: 2px solid #e52b6d !important;
  background-color: #e52b6d !important;
  color: #ffffff !important;
}
.type-action-account {
  border: 2px solid #e52b6d !important;
  color: #e52b6d !important;
}

.button-action-resource-enabled {
  border: 2px solid #a635d5 !important;
  background-color: #a635d5 !important;
  color: #ffffff !important;
}
.type-action-resource {
  border: 2px solid #a635d5 !important;
  color: #a635d5 !important;
}

.button-action-producer-enabled {
  border: 2px solid #f03700 !important;
  background-color: #f03700 !important;
  color: #ffffff !important;
}
.type-action-producer {
  border: 2px solid #f03700 !important;
  color: #f03700 !important;
}

.button-action-vote-enabled {
  border: 2px solid #516173 !important;
  background-color: #516173 !important;
  color: #ffffff !important;
}
.type-action-vote {
  border: 2px solid #516173 !important;
  color: #516173 !important;
}

.switch-name {
  font-size: 13px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: right;
  color: #7f8fa4;
}

.bs-switch {
  margin-bottom: 0rem;
  width: 44px;
  min-width: 44px;
  height: 15px;
}
.bs-switch .slider {
  height: 20px;
}
.bs-switch input:checked + .slider {
  background-color: #1d93ed;
}
.bs-switch .slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
.reset-all-filters {
  display: inline-block;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #16b4ff !important;
}
.reset-all-filters:hover {
  color: #1585d8 !important;
}

.filter-symbol {
  width: 12em;
  height: 33px;
  font-size: 0.8em;
}

.filter-account {
  width: 15em;
  height: 34px;
  font-size: 0.8em; 
  margin-left: 0.6em;
}

.toggle-disabled {
  border: 2px solid #333744 !important;
  color: #656c79 !important;
}
.gopage {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: right;
  color: #16b4ff;
  margin-left: 24px;
}
.gopage:after {
  content: '';
  width: 4.1em;
  display: block; 
  position: absolute; 
  margin-top: 5px; 
  border-bottom: 1px solid #16b4ff;
}

.table-tx th {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
  color: #a1abbd;
  border-top: 1px solid #252831;
  border-bottom: 1px solid #252831;
}

.table-tx td {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
  border-top: 1px solid #252831;
}
.table-tx-date {
  color: #7f8fa4;
}
.table-tx a {
  color: #16b4ff !important;
  margin-right: 0px !important;
}

.data-transfer-quantity {
  color: #ffffff;
}
.data-memo {
  font-size: 13px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.3px;
  text-align: left;
  color: #565c69;
}
.data-text {
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: left;
  color: #7f8fa4;
}
.data-total-item-label {
  
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: left;
  color: #7f8fa4;
}
.data-total-item-value {
  
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: left;
  font-weight: bold;
  color: #16b4ff;;
}
.paging-text {
  
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1.6px;
  text-align: center;
  color: #7f8fa4;
  padding: 0px 20px;
}

/* hover가 가능한 device만  */
@media (hover:hover) {
  .button-action-receive:hover {
    border: 2px solid #17cd28 !important;
    background-color: transparent !important;
    color: #17cd28 !important;  
  }
  .button-action-send:hover {
    border: 2px solid #f7981c !important;
    background-color: transparent !important;
    color: #f7981c !important;
  }
  .button-action-contract:hover {
    border: 2px solid #1991eb !important;
    background-color: transparent !important;
    color: #1991eb !important;
  }
  .button-action-account:hover {
    border: 2px solid #e52b6d !important;
    background-color: transparent !important;
    color: #e52b6d !important;
  }
  .button-action-resource:hover {
    border: 2px solid #a635d5 !important;
    background-color: transparent !important;
    color: #a635d5 !important;
  }
  .button-action-producer:hover {
    border: 2px solid #f03700 !important;
    background-color: transparent !important;
    color: #f03700 !important;
  }
  .button-action-vote:hover {
    border: 2px solid #516173 !important;
    background-color: transparent !important;
    color: #516173 !important;
  }
}
</style>
<style scoped>
  @import url('../../assets/css/components/account/actionsearch/mobile.css');
  @import url('../../assets/css/components/account/actionsearch/tablet.css');
  @import url('../../assets/css/components/account/actionsearch/laptop.css');
</style>
