<template>
  <mdb-container class="p-0" fluid>
    <mdb-card class="w-100 z-depth-0">
      <mdb-card-header class="z-depth-0 header">
        <div class="d-inline-block">
          <strong class="header-title">Permissions</strong>
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
          <mdb-card-body class="pt-0" style="overflow-x: auto; padding-bottom: 10px;">
            <mdb-row class="d-block">
              <mdb-col class="d-block">
                <div class="permission-box" v-if="ownerKey && ownerKey.keys">
                  <div class="permission-box-col1">
                    <span>owner</span>
                  </div>
                  <div class="permission-box-col2">
                    <div class="permission-box-text" v-for="owner in ownerKey.keys" :key="owner.key">
                      <span class="permission-box-text-weight">{{owner.weight}}/{{ownerKey.threshold}}</span>
                      <span class="permission-box-text-key">{{owner.key}}</span>
                    </div>
                  </div>
                </div>

                <div class="permission-box" v-if="activeKey && activeKey.keys">
                  <div class="permission-box-col1">
                    <span>active</span>
                  </div>
                  <div class="permission-box-col2">
                    <div class="permission-box-text" v-for="active in activeKey.keys" :key="active.key">
                      <span class="permission-box-text-weight">{{active.weight}}/{{activeKey.threshold}}</span>
                      <span class="permission-box-text-key">{{active.key}}</span>
                    </div>
                  </div>
                </div>

                <div class="permission-box" v-if="addListKey && addListKey.keys">
                  <div class="permission-box-col1">
                    <span>addlist</span>
                  </div>
                  <div class="permission-box-col2">
                    <div class="permission-box-text" v-for="addList in addListKey.keys" :key="addList.key">
                      <span class="permission-box-text-weight">{{addList.weight}}/{{addListKey.threshold}}</span>
                      <span class="permission-box-text-key">{{addList.key}}</span>
                    </div>
                  </div>
                </div>
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
    permissionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    
  },
  data() {
    return {
      collapse: true,
      activeKey  : {},
      ownerKey  : {},
      addListKey  : {},
    }
  },
  mounted() {
    this.collapse = this.show;
    if(this.actives().length > 0)
      this.activeKey = this.actives()[0].requiredAuth;
    if(this.owners().length > 0)
      this.ownerKey = this.owners()[0].requiredAuth;
    if(this.addLists().length > 0)
      this.addListKey = this.addLists()[0].requiredAuth;
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
    },
    afterEnter(el) {
      el.style.height = this.$refs.collapseContent.children[0].clientHeight + 'px';
      el.style.marginTop = '10px';
    },
    beforeLeave(el) {
      el.style.height = '0';
      el.style.marginTop = '0px';
    },
    actives () {
      return this.permissionData.list.filter(permission => {
        return permission.permName == 'active'
      })
    },
    owners () {
      return this.permissionData.list.filter(permission => {
        return permission.permName == 'owner'
      })
    },
    addLists () {
      return this.permissionData.list.filter(permission => {
        return permission.permName == 'addlist'
      })
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
.header {
  border-bottom: 1px solid #252831;
  /* margin-bottom: 10px; */
}
.collapse-item {
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;
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
.collapse-item {
  overflow: hidden;
  padding: 0;
  transition: height 0.3s;
}
.permission-box {
  width: 100%;
  min-width: 550px;
  border-radius: 4px;
  border: 1px solid #333744;
  background-color: #191b20;
  margin-top: 10px;
}

.permission-box-col1 {
  display: inline-block;
  width: 10vw;
  padding: 0.75rem;
}
.permission-box-col1 span {
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.27;
  letter-spacing: 0.8px;
  text-align: left;
  color: #7f8fa4;
}

.permission-box-col2 {
  display: inline-block;
  padding: 0.75rem;
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.27;
  letter-spacing: 1.5px;
  text-align: left;
  color: #16b4ff;
}

.permission-box-text a {
  text-decoration: none;
}

.permission-box-text-weight {
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.27;
  letter-spacing: 1.5px;
  text-align: left;
  color: #e2e5ea;
}

.permission-box-text-key {
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.27;
  letter-spacing: 1.5px;
  text-align: left;
  color: #7f8fa4;
  padding-left: 43px;
}
</style>
<style scoped>
  @import url('../../assets/css/components/account/permissions/mobile.css');
  @import url('../../assets/css/components/account/permissions/tablet.css');
  @import url('../../assets/css/components/account/permissions/laptop.css');
</style>

