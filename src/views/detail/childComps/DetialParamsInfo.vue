<template>
  <div v-if="Object.keys(goodsParams).length !== 0" class="params-info">
    <table v-for="(tables, index) in goodsParams.sizes" :key="index">
      <tr v-for="(tr, indey) in tables" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info">
      <tr v-for="(info, index) in goodsParams.infos" :key="index">
        <td class="info-key">{{info.key}}</td>
        <td class="info-value">{{info.value}}</td>
      </tr>
    </table>
    <div v-if="goodsParams.images.length !== 0" class="params-img">
      <img :src="goodsParams.images" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsParams: {
      type: Object,
      default() {
      }
    }
  }
}
</script>

<style scoped>
  .params-info {
    padding: 20px 10px;
    border-bottom: 5px solid #f2f5f8;
  }

  .params-info table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
  }

  .params-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    height: 35px;
    padding: 2px 5px
  }

  .info-key {
    width: 35%;
  }

  .info-value {
    color: var(--color-tint)
  }
  
  .info {
    border-top: 1px solid rgba(0, 0, 0, .1)
  }

  .params-img {
    margin-top: 10px
  }

  .params-img img {
    width: 100%
  }
</style>