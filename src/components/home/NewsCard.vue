<template>
  <div class="news-card">
    <div class="news-card__image-wrapper"
      ><image
        alt="News Title"
        mode="aspectFit"
        :src="config.contentApi + data.head_img.url"
        class="news-card__image"
    /></div>

    <div class="news-card__texts">
      <h3 class="news-card__title">{{ data.Title }}</h3>
      <p class="news-card__content">{{ data.Content }}</p>
    </div>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    props: {
      data: Object,
    },
    data() {
      return {
        config,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .news-card {
    border-radius: 12px;
    background-color: white;
    display: flex;
    align-items: top;

    margin-top: 8px;
    &__texts {
      margin-left: 12px;
      margin: 14px 8px;
    }
    &__image-wrapper {
      margin: 8px 8px;
      width: 150px;
      height: 85px;
    }
    &__image {
      width: 150px;
      height: 85px;
      border-radius: 8px;
    }
    &__title {
      font-size: 14px;
      color: black;
    }
    &__content {
      font-size: 12px;
      color: $gray-300;
    }
  }
</style>
