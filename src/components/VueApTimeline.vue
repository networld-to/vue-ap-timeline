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
  <div class="spin-container" v-if="!posts.length">
    <div class="spin" id="loader"></div>
    <div class="spin" id="loader2"></div>
    <div class="spin" id="loader3"></div>
    <div class="spin" id="loader4"></div>
    <span id="text">LOADING...</span>
  </div>

  <PostEntry
    :data-bs-theme="theme"
    v-for="(post, index) in posts"
    :key="index"
    :post="post"
    :instance-host="instanceHost"
  ></PostEntry>
</template>

<style>
[data-bs-theme='dark'] {
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

[data-bs-theme='light'] {
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

.spin-container {
  text-align: center;
  padding-top: 100px;
  height: 375px;
}
.spin {
  border: 3px solid #0d4b9f;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader2 {
  border: 3px solid #e0edff;
  width: 220px;
  height: 220px;
  position: relative;
  top: -216px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader3 {
  border: 3px solid #005cdc;
  width: 240px;
  height: 240px;
  position: relative;
  top: -452px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader4 {
  border: 3px solid #94b6e5;
  width: 260px;
  height: 260px;
  position: relative;
  top: -708px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(-360deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: rotateZ(360deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
#text {
  color: #0d4b9f;
  font-family: Arial;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  top: -857px;
}

.loading a {
    font-size: 1.5rem;
    padding: 15px;
}

</style>
