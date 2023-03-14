<script lang="ts">
import { defineComponent } from 'vue'
import PostEntry from './PostEntry.vue';
import { getAccountStatuses } from '../services/ActivityPub';

export default defineComponent({
  components: {
    PostEntry,
  },
  props: {
    instanceHost: {
      type: String,
      required: true,
    },
    accountID: {
      type: String,
      required: true,
    },
    numberOfPosts: {
      type: String,
      required: false,
    },
    excludeReplies: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      posts: [],
    }
  },
  beforeMount() {
    var limit = this.numberOfPosts || "10";
    var noReplies = this.excludeReplies || false;
    getAccountStatuses(this.instanceHost, this.accountID, limit, noReplies).then((data) => {
      this.posts = data;
    })
  }
});
</script>

<template>
  <p>This is a test</p>
  <PostEntry     class="timeline-entry"
    v-for="(post, index) in posts"
    :key="index"
    :post="post"
    :instance-host="instanceHost"></PostEntry>
</template>

<style scoped>
p {
  color: red;
}
</style>
