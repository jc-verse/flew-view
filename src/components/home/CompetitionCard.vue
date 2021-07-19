<template>
  <div class="competition-card">
    <image
      mode="aspectFit"
      class="competition-card__image"
      :src="config.contentApi + data.logo_img.url"
    />
    <div class="competition-card__texts">
      <text class="competition-card__title">{{ data.Name }}</text>
      <div class="competition-card__type-wrapper">
        <image
          mode="aspectFit"
          style="width: 13px; height: 15.27px"
          :src="config.contentApi + '/uploads/cube_outline_457c994251.png'"
        />
        <text class="competition-card__type">{{ data.competition_type.Name }}</text>
      </div>

      <text class="competition-card__description">{{ data.english_name }}</text>
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
  .competition-card {
    margin-left: 8px;
    width: 200px;
    flex: none;
    background-color: white;
    border-radius: 14px;
    padding: 32px 16px;
    &__texts text {
      display: block;

      color: $gray-300;
      font-size: 12px;
    }
    &__description {
      width: 80%;
    }
    &__image {
      width: 150px;
      height: 50px;
      object-fit: cover;
    }
    &__title {
      color: black !important;
      font-size: 16px !important;
    }
    &__type-wrapper {
      display: flex;
      align-items: center;
      margin: 6px 0;
      flex: none;
    }
    &__type {
      margin-left: 4px;
      font-size: 14px !important;
    }
  }
</style>
