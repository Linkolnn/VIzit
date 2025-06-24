<template>
  <div class="banner" :class="{ 'banner--video': isVideo }">
    <div v-if="isVideo" class="banner__video-wrapper">
      <video 
        v-if="currentMedia"
        ref="videoRef"
        class="banner__video" 
        :src="currentMedia" 
        autoplay 
        muted 
        playsinline 
        loading="lazy" 
        loop
        @error="handleMediaError"
      ></video>
    </div>
    <div v-else class="banner__image-wrapper">
      <img 
        v-if="currentMedia"
        ref="imageRef"
        class="banner__image" 
        :src="currentMedia" 
        :alt="alt"
        @error="handleMediaError"
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

// Текущий медиа-источник
const currentMedia = computed(() => {
  if (mediaSources.value.length === 0) return '';
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
function handleMediaError() {
  // Тихо обрабатываем ошибку без вывода в консоль
  tryNextMedia();
}

// Пробуем следующий медиа-источник
function tryNextMedia() {
  if (currentMediaIndex.value < mediaSources.value.length - 1) {
    currentMediaIndex.value++;
  }
}

// Проверяем доступность файла
async function checkMediaAvailability(url) {
  try {
    // Используем fetch с опцией catch для подавления ошибок в консоли
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // Timeout after 1 second
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal,
      // Предотвращаем логирование ошибок в консоль
      cache: 'no-store'
    }).catch(() => ({ ok: false }));
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    // Тихо обрабатываем ошибку без вывода в консоль
    return false;
  }
}

// Ссылки на элементы
const videoRef = ref(null);
const imageRef = ref(null);

// Проверяем доступность первого медиа-источника при монтировании компонента
onMounted(async () => {
  if (mediaSources.value.length > 0) {
    // Проверяем все источники по очереди, пока не найдем доступный
    let foundValid = false;
    
    for (let i = 0; i < mediaSources.value.length; i++) {
      const isAvailable = await checkMediaAvailability(mediaSources.value[i]);
      if (isAvailable) {
        currentMediaIndex.value = i;
        foundValid = true;
        break;
      }
    }
    
    // Если ни один источник не доступен, используем последний (обычно это fallback)
    if (!foundValid && mediaSources.value.length > 0) {
      currentMediaIndex.value = mediaSources.value.length - 1;
    }
  }
});

// Следим за изменением источников медиа
watch(() => props.media, async () => {
  // Проверяем все источники по очереди, пока не найдем доступный
  let foundValid = false;
  
  for (let i = 0; i < mediaSources.value.length; i++) {
    const isAvailable = await checkMediaAvailability(mediaSources.value[i]);
    if (isAvailable) {
      currentMediaIndex.value = i;
      foundValid = true;
      break;
    }
  }
  
  // Если ни один источник не доступен, используем последний (обычно это fallback)
  if (!foundValid && mediaSources.value.length > 0) {
    currentMediaIndex.value = mediaSources.value.length - 1;
  }
}, { deep: true });
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