<template>
  <div id="app">
    <v-header></v-header>
    <div class="links">
      <router-link :to="{path:'/goods'}" tag="div">商品</router-link>
      <router-link :to="{path:'/ratings'}" tag="div">评价</router-link>
      <router-link :to="{path:'/seller'}" tag="div">商家</router-link>
    </div>
    <keep-alive>
      <router-view></router-view> 
    </keep-alive>
  </div>
</template>

<script>

  	import header from './components/header/Header.vue';

  	export default {
  	    components:{
            'v-header' : header
        },
        created(){
            this.$store.dispatch('getSeller');
        }
  	}

</script>

<style lang='less' scoped>
  .links{
    display: flex;
    width: 100%;
    > div{
      flex:1;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(7,17,27,.1);
      height: .8rem;
      font-size: .28rem;
      color: rgb(7,17,27);
      text-align: center;
      line-height: .8rem;
      background-color: white;
    }
    .active{
      color: rgb(240,20,20);
    }
  }
</style>
