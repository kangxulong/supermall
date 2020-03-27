<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f2f2f2;
    height: 49px;

    font-size: 14px;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;

    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2)
  }
</style>