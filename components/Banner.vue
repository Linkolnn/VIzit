<template>
  <div class="banner" :class="{ 'banner--video': isVideo }">
    <div v-if="isVideo" class="banner__video-wrapper">
      <video 
        ref="videoRef"
        class="banner__video" 
        :key="currentMedia"
        :src="currentMedia" 
        autoplay 
        muted 
        playsinline 
        loading="lazy" 
        loop
        @error="handleMediaError"
        @loadeddata="handleMediaLoad"
      ></video>
    </div>
    <div v-else class="banner__image-wrapper">
      <img 
        ref="imageRef"
        class="banner__image" 
        :key="currentMedia"
        :src="currentMedia" 
        :alt="alt"
        @error="handleMediaError"
        @load="handleMediaLoad"
      >
    </div>
    <div class="banner__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  media: {
    type: [String, Array],
    required: true
  },
  alt: {
    type: String,
    default: 'Banner image'
  }
});

// Преобразуем media в массив, если это строка
const mediaSources = computed(() => {
  return Array.isArray(props.media) ? props.media : [props.media];
});

// Текущий индекс медиа-источника
const currentMediaIndex = ref(0);
const mediaLoaded = ref(false);

// Текущий медиа-источник
const currentMedia = computed(() => {
  if (mediaSources.value.length === 0) return '/images/categories/default.jpg';
  return mediaSources.value[currentMediaIndex.value];
});

// Определяем, является ли файл видео или изображением по расширению
const isVideo = computed(() => {
  if (!currentMedia.value) return false;
  const videoExtensions = ['mp4', 'webm', 'ogg'];
  const ext = currentMedia.value.split('.').pop().toLowerCase();
  return videoExtensions.includes(ext);
});

// Обработчик ошибки загрузки медиа
function handleMediaError(event) {
  tryNextMedia();
}

// Пробуем следующий медиа-источник
function tryNextMedia() {
  if (currentMediaIndex.value < mediaSources.value.length - 1) {
    currentMediaIndex.value++;
  } 
}

// Обработчик успешной загрузки медиа
function handleMediaLoad() {
  mediaLoaded.value = true;
}

// Проверка доступности файла
async function checkFileExists(url) {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      cache: 'no-store'
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// При монтировании компонента
onMounted(async () => {
  
  for (let i = 0; i < mediaSources.value.length; i++) {
    const url = mediaSources.value[i];
    const exists = await checkFileExists(url);
    if (exists) {
      currentMediaIndex.value = i;
      return;
    } 
  }
  
  // Если ни один формат не найден, используем последний (обычно fallba
  if (mediaSources.value.length > 0) {
    currentMediaIndex.value = mediaSources.value.length - 1;
  }
});

// Следим за изменением источников медиа
watch(() => props.media, async () => {
  mediaLoaded.value = false;
  
  for (let i = 0; i < mediaSources.value.length; i++) {
    const url = mediaSources.value[i];
    const exists = await checkFileExists(url);
    if (exists) {
      currentMediaIndex.value = i;
      return;
    } 
  }
  
  // Если ни один формат не найден, используем последний
  if (mediaSources.value.length > 0) {
    currentMediaIndex.value = mediaSources.value.length - 1;
  }
}, { deep: true });

// Подавление ошибок в консоли для медиа
onMounted(() => {
  // Перехватываем все ошибки загрузки медиа
  const originalAddEventListener = window.EventTarget.prototype.addEventListener;
  window.EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'error' && this instanceof HTMLImageElement || this instanceof HTMLVideoElement) {
      const originalListener = listener;
      listener = function(event) {
        if (event.target.src && event.target.src.includes('/images/categories/')) {
          // Для наших медиа-файлов подавляем ошибки в консоли
          event.preventDefault();
          event.stopPropagation();
        } else {
          // Для остальных файлов используем обычное поведение
          return originalListener.apply(this, arguments);
        }
      };
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
});

// Ссылки на элементы
const videoRef = ref(null);
const imageRef = ref(null);
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
  margin-bottom: 20px
  
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