<template>
  <container id="accountContainer" fluid>
    <mdb-row class="pt-4">
      <mdb-col>
        <mdb-container class="p-0" fluid>
          <mdb-card class="w-100 z-depth-0">
            <mdb-card-body>
              <div class="account-name-text">{{ accountName }}</div>
              <span class="account-create-text">
                <small v-if="!!creator" calss="text-muted">Created by
                  <nuxt-link 
                    :to="`/account/${creator}`"
                    style="color: #ffffff"
                  >
                    {{ creator }}
                  </nuxt-link>
                  at {{formatDateFull(createdDate)}}
                </small>
              </span>
            </mdb-card-body>
          </mdb-card>
        </mdb-container>

      </mdb-col>
    </mdb-row>
    <mdb-row class="pt-2">
      <mdb-col>
        <total-balance :show="true" :resourceData="resource" :balanceData="balance"></total-balance>
        <tokens :show="true" :tokenData="token" class="mt-3"></tokens>
        <permissions :show="true" :permissionData="permission" class="mt-3"></permissions>
        <action-search class="mt-3" :accountName="accountName"></action-search>
      </mdb-col>
    </mdb-row>
  </container>  
</template>
<script>
import TotalBalance from '@/components/account/TotalBalance.vue'
import Tokens from '@/components/account/Tokens.vue'
import Permissions from '@/components/account/Permissions.vue'
import ActionSearch from '@/components/account/ActionSearch.vue'

export default {
  layout: 'result',
  components: {
    TotalBalance,
    Tokens,
    Permissions,
    ActionSearch,
  },
  async asyncData({app, params,error}) {
    try {
      const response = await app.$axios.$get(`/account/${params.account}`)
  
      if(response.resultCode==200){
        const _account = response.data.account
        const _totalBalance = response.data.totalEosBalances
        const _token = response.data.tokenBalances
        const _permission = response.data.account.permissions
    
        // resource 데이터 가공
        let resource = {}
        resource.cpu = _account.cpuLimit
        resource.net = _account.netLimit
        resource.ram = {
          used: _account.ramUsage,
          available: _account.ramQuota - _account.ramUsage,
          max: _account.ramQuota,
        }
    
        if(!!_account.totalResources) {
          resource.cpu.weight = _account.totalResources.cpuWeight
          resource.net.weight = _account.totalResources.netWeight
        }
    
        // Balance 데이터 가공
        const unstaked = parseFloat(_account.coreLiquidBalance)
        const refund = _account.refundRequest? parseFloat(_account.refundRequest.cpuAmount) + parseFloat(_account.refundRequest.netAmount) : 0.0000
        const staked = _account.totalResources? parseFloat(_account.totalResources.netWeight) + parseFloat(_account.totalResources.cpuWeight) : 0.0000
        const total = unstaked + staked
        
        let balance = {}
        balance.eosAmount = parseFloat(_totalBalance.eosAmount)
        balance.eosPrice = _totalBalance.eosPrice
        balance.totalEosPrice = _totalBalance.totalEosPrice
        balance.refund = refund
        balance.unstaked = unstaked
        balance.staked = staked
        balance.total = total
    
        let token = {}
        token.list = _token.sort((a, b) => a.amount > b.amount? 1 : -1).reverse()
    
        let permission = {}
        permission.list = _permission

    
        return {
          accountName: response.data.accountName,
          resource,
          balance,
          token,
          permission,
          createdDate: response.data.createdDate,
          creator: response.data.creator,
        }
      }else{
        error({ statusCode: response.resultCode})
      }
      
    }catch(e){
      error({ statusCode: '404', message: 'Post not found' })
		}
		
  },
  methods: {
    formatDateFull (dateArr) {
      if(!dateArr) {
        return ''
      } else {
        return this.$moment(dateArr.map((v, i) => { if(i===1) return v-1; return v})).format('lll')
      }
    },
  }
}
</script>
<style scoped>
.card {
  background-color: #16181d !important;
}
.account-name-text {
  font-size: 26px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 2.6px;
  text-align: left;
  color: #16b4ff;
  margin-bottom: 0px;
}
.account-create-text {
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.33;
  letter-spacing: 1.8px;
  text-align: left;
  color: #a1abbd;
}
</style>
