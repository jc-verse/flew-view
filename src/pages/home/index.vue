<template>
  <div style="background: #f1f3f5">
    <div class="header">
      <div class="header__body">
        <text class="header__heading">快速匹配队友</text>
        <text class="header__subheading">视界帮你快速找到队友</text>
      </div>
      <div class="header__append">
        <image class="header__illustration" src="@/static/illustration/home_header.png" />
      </div>
    </div>
    <div class="section">
      <div class="section__header">
        <text class="section__title">比赛分类</text>
        <button class="button--light">全部比赛</button>
      </div>

      <div class="section__content">
        <div class="categories-wrapper">
          <div v-for="(category, index) in categories" :key="index" class="category-card">
            <image class="category-card__image" :src="category.imageUrl"></image>
            <text class="category-card__text">{{ category.name }}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__header">
        <text class="section__title">推荐热门比赛</text>
      </div>

      <div class="section__content"> </div>
    </div>
    <div class="section">
      <div class="section__header">
        <text class="section__title">赛圈动态</text>
      </div>

      <div class="section__content"> </div>
    </div>
  </div>
</template>

<script>
  import categories from './categories'
  export default {
    data() {
      return {
        categories: categories,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
