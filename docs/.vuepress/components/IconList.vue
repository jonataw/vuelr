<!-- IconList.vue -->
<template>
  <div class="iconlist">
    <div v-for="icon in icons" :key="icon">
      <FLIcon :i="icon" />
      {{ icon }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iconlist {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  > div {
    margin: 24px 0;
    text-align: center;
  }
  .icon {
    font-size: 20px;
    display: block;
  }
}
</style>

<script>
export default {
  data: function() {
    return {
      icons: [
        'archive',
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'calendar',
        'chat',
        'check',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'cloud-download',
        'cloud-up',
        'cloud',
        'copy',
        'cross',
        'disks',
        'download',
        'edit',
        'external',
        'facebook-inverse',
        'facebook',
        'filter',
        'gift',
        'help',
        'home',
        'information',
        'internal',
        'link',
        'linkedin',
        'list',
        'location',
        'lock',
        'logout',
        'mail',
        'menu-horizontal',
        'menu-vertical',
        'menu',
        'minus',
        'navigation',
        'nutshell',
        'package',
        'plus',
        'refresh',
        'search',
        'security',
        'settings',
        'statistics',
        'tag',
        'time',
        'trash',
        'twitter',
        'users',
        'warning',
        'wheel',
        'youtube',
        'trend-up',
        'trend-down',
        'star'
      ]
    };
  }
};
</script>
