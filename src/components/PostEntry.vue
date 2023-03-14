<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
    instanceHost: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
    <div class="post">
      <p v-html="post.content"></p>
    </div>
</template>

<style scoped>
.post {
  border: 1px solid #000;
  color: blue;
  margin: 20px;
  padding: 20px;
}
</style>
