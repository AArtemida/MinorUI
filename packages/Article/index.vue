<script lang="ts" setup>
defineOptions({
  name: 'MiArticle',
})

const props = defineProps({
  // 标题
  title: String,
  // 摘要
  content: String,
  img: String,
  // 显示更多按钮
  showMore: {
    type: Boolean,
    default: true,
  },
  moreTxt: {
    type: String,
    default: '查看详情',
  },
})

const emits = defineEmits(['link-detail'])
const linkDetail = () => {
  emits('link-detail', props)
}
</script>

<template>
  <mi-card class="mi-article">
    <div class="mi-article__header">
      <slot name="image">
        <div class="mi-article__bg">
          <div
            class="mi-article__image"
            v-if="props.img"
            :style="{ 'background-image': `url(${props.img})` }"
          ></div>
          <div v-else class="mi-article-image__default">
            <mi-icon
              icon="icon-charutupian"
              class="mi-article-img__icon"
            ></mi-icon>
          </div>
        </div>
      </slot>

      <slot name="title">
        <div class="mi-article__title absolute-title">
          <h3 @click="linkDetail">{{ props.title }}</h3>
        </div>
      </slot>
    </div>
    
    <div class="mi-article__details">
      <slot name="content">
        <p class="mi-article__abstract">
          {{ props.content }}
        </p>
      </slot>
      <slot name="operate">
        <div class="mi-article__cta">
          <a
            v-if="props.showMore"
            class="mi-btn mi-article__more"
            @click="linkDetail"
          >
            {{ props.moreTxt }}
          </a>
        </div>
      </slot>
    </div>
  </mi-card>
</template>
