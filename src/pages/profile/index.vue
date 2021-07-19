<template>
  <div style="background-color: #f1f3f5; height: 100vh">
    <div class="top-section__wrapper">
      <div class="profile">
        <div class="profile__leading">
          <div class="profile__avatarImg-wrapper">
            <image
              mode="aspectFit"
              class="profile__avatarImg"
              :src="config.contentApi + '/uploads/Wechat_IMG_168_d4d1ded7bf.jpeg'"
            />
            <div class="profile__avatarImg-bg"></div>
          </div>

          <div class="profile__texts">
            <text class="profile__name">江户川柯南</text>
            <br />
            <text class="profile__instruction">点按来查看资料卡</text>
          </div>
        </div>
        <div class="profile__trailing">
          <div class="notification">
            <image
              class="notification__icon"
              mode="aspectFit"
              :src="config.contentApi + '/uploads/bell_445b5b6d5f.png'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="section-card__wrapper">
      <div class="section-card section-card--profile">
        <div class="section-card__header">
          <div class="section-card__header-leading">
            <text class="section-card__header-title">个人资料</text>
            <br />
            <text class="section-card__header-instruction"
              >充分完善个人资料能使你更容易找到队友哦</text
            >
          </div>
          <div class="section-card__header-trailing">
            <image
              class="section-card__header-icon"
              :src="config.contentApi + '/uploads/bx_help_circle_05b0824561.png'"
            />
          </div>
        </div>
        <div class="section-card__body">
          <div class="profile-card__wrapper">
            <div class="profile-card profile-card--purple">
              <image
                class="profile-card__img"
                :src="config.contentApi + '/uploads/comp_expect_icon_719e6c3939.png'"
              />
              <text class="profile-card__title">比赛期望</text>
            </div>
            <div class="profile-card profile-card--orange">
              <image
                class="profile-card__img"
                :src="config.contentApi + '/uploads/comp_expect_icon_719e6c3939.png'"
              />
              <text class="profile-card__title">学术成绩</text>
            </div>
            <div class="profile-card profile-card--green">
              <image
                class="profile-card__img"
                :src="config.contentApi + '/uploads/comp_expect_icon_719e6c3939.png'"
              />
              <text class="profile-card__title">比赛经历</text>
            </div>
          </div>
        </div>
        <div class="section-card__bottom">
          <div class="profile-entry">
            <text class="profile-entry__text">编辑/更新个人信息</text>
            <image
              :src="config.contentApi + '/uploads/chevron_95ca02f15f.png'"
              class="profile-entry__icon"
            />
          </div>
        </div>
      </div>
      <div class="section-card">
        <div class="section-card__header">
          <div class="section-card__header-leading">
            <text class="section-card__header-title">更多</text>
          </div>
        </div>
         <div class="section-card__body">
           <div class="functional-btn__wrapper">
             <div class="functional-btn">
               <image :src="config.contentApi + '/uploads/'">
             </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    data() {
      return {
        config,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
