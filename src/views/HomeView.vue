<template>
    <div :class="$style['home-page']">
        <header :class="$style['home-page_header']">
            <h1 :class="[$style['home-page_username'], $style['logo']]">{{ appName }}</h1>
        </header>
        <app-home/>
    </div>
</template>

<script setup lang="ts">
import AppHome from '@/components/AppHome.vue';

const appName = import.meta.env.VITE_NAME;

</script>

<style lang="scss" module>
.home-page {
  max-width: 1266px;
  margin: auto;
  margin-top: 41px;

  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
  }
}
.logo {
    font-weight: 700;
    font-size: $font-lg;
    line-height: 39px;
    text-transform: uppercase;
}
</style>