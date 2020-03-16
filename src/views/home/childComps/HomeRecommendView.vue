<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }

}
</script>

<style>
  .recommends {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 10px 0 35px;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommends-item {
    flex: 1;
  }
  .recommends-item img {
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
  }

</style>