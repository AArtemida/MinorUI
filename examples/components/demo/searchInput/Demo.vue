<template>
  <div class="search-input-demo">
    <mi-search-input
      v-model="keyword"
      placeholder="搜索关键词后回车"
      :maxlength="20"
      @search="handleSearch"
      @blur="handleBlur"
    ></mi-search-input>
    <p class="search-input-demo__tip" v-if="searched">搜索：{{ searched }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const keyword = ref('')
const searched = ref('')

const handleSearch = (val: string) => {
  searched.value = val
}

const handleBlur = (val: string) => {
  console.log('blur', val)
}
</script>

<style lang="scss" scoped>
.search-input-demo {
  padding: 10px 0;
  &__tip {
    margin-top: 12px;
    font-size: 13px;
    color: #909399;
  }
}
</style>
