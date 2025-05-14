<template>
  <div class="banner" :class="{ 'banner--video': isVideo }">
    <div v-if="isVideo" class="banner__video-wrapper">
      <video class="banner__video" :src="media" autoplay muted loop></video>
    </div>
    <div v-else class="banner__image-wrapper">
      <img class="banner__image" :src="media" :alt="alt">
    </div>
    <div class="banner__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  media: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Banner image'
  },
  isVideo: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.banner
  position: relative
  width: 100%
  height: 727px
  overflow: hidden
  margin-bottom: 40px
  
  @include mobile
    height: 354px

.banner__image-wrapper,
.banner__video-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.banner__image,
.banner__video
  width: 100%
  height: 100%
  object-fit: cover

.banner__content
  position: relative
  z-index: 2
  height: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end
  padding: 0 20px 60px
  color: $white
  background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)
  
  @include mobile
    padding: 0 20px 30px

@include tablet
  .banner
    height: 500px
  
  .banner__content
    padding: 0 40px 40px

@include mobile
  .banner__content
    padding: 0 20px 30px
</style>
