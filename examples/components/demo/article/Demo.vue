<template>
  <mi-article
    :title="demoArt.title"
    :content="demoArt.content"
    :img="demoArt.img"
    @link-detail="linkDetail"
  ></mi-article>
</template>

<script lang="ts" setup>
const demoArt = {
  img: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.Q6OoFmlbBF286e3f6KSf-wHaEV?w=284&h=180&c=7&r=0&o=5&pid=1.7',
  title: '文章的标题',
  content: '这是文章的一段摘要',
}
function linkDetail() {
  alert("点击详情")
}
</script>
