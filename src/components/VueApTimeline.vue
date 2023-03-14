<script lang="ts">
import { defineComponent } from 'vue';
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
    theme: {
      type: String,
      required: false,
      default: 'dark',
    },
  },
  data() {
    return {
      posts: [],
    };
  },
  beforeMount() {
    var limit = this.numberOfPosts || '10';
    var noReplies = this.excludeReplies || false;
    getAccountStatuses(
      this.instanceHost,
      this.accountID,
      limit,
      noReplies
    ).then((data) => {
      this.posts = data;
    });
  },
});
</script>

<template>
  <PostEntry
    :data-bs-theme="theme"
    v-for="(post, index) in posts"
    :key="index"
    :post="post"
    :instance-host="instanceHost"
  ></PostEntry>
</template>

<style>
[data-bs-theme=dark] {
  --post-bg: #313543;
  --content-color: #babdff;
  --post-bottom-border: #fff;
  --post-text-color: #fff;
  --boost-text: #babdff;
  --account-name: #babdff;
  --card-body: rgba(255, 255, 255, 0.7);
  --post-footer-link: rgba(255, 255, 255, 0.7);
  --post-box-shadow-1: rgba(50, 50, 93, 0.9);
  --post-box-shadow-2: rgba(0, 0, 0, 0.07);
}

[data-bs-theme=light] {
  --post-bg: #fff;
  --content-color: #212529;
  --post-bottom-border: #212529;
  --post-text-color: #212529;
  --boost-text: #212529;
  --account-name: #212529;
  --card-body: rgba(0, 0, 0, 0.7);
  --post-footer-link: rgba(0, 0, 0, 0.7);
  --post-box-shadow-1: rgba(50, 50, 93, 0.9);
  --post-box-shadow-2: rgba(0, 0, 0, 0.07);
}
</style>
