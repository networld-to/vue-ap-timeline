<script lang="ts">
import { defineComponent } from 'vue';
import PostEntry from './PostEntry.vue';

import FediverseAccount from '@networld-to/fediverse-helper';
import {
  getMastodonAccountStatuses,
  getMastodonAccountID,
} from '../services/Mastodon';

export default defineComponent({
  components: {
    PostEntry,
  },
  props: {
    fediverseHandle: {
      type: String,
      required: true,
    },
    fediversePlatform: {
      type: String,
      required: true,
    },
    numberOfPosts: {
      type: String,
      required: false,
      default: '10',
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
      instanceHost: '',
      accountID: '',
      loading: true,
      error: '',
      posts: [],
    };
  },
  async beforeMount() {
    const fediAccount = new FediverseAccount(this.fediverseHandle);
    if (
      this.fediversePlatform.toLowerCase() == 'mastodon' ||
      this.fediversePlatform.toLowerCase() == 'akkoma'
    ) {
      this.instanceHost = await fediAccount.getInstanceHost();
      this.accountID = await getMastodonAccountID(
        this.instanceHost,
        this.fediverseHandle
      );

      getMastodonAccountStatuses(
        this.instanceHost,
        this.accountID,
        this.numberOfPosts,
        this.excludeReplies
      )
        .then((data) => {
          this.loading = false;
          this.posts = data;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    } else {
      console.error(
        `Fediverse Platform ${this.fediversePlatform} not yet supported.`
      );
    }
  },
});
</script>

<template>
  <div class="spin-container" v-if="!posts.length && loading">
    <div class="spin" id="loader"></div>
    <div class="spin" id="loader2"></div>
    <div class="spin" id="loader3"></div>
    <div class="spin" id="loader4"></div>
    <span id="text">LOADING...</span>
  </div>

  <div class="alert alert-danger" role="alert" v-if="error">
    Loading the timeline failed. Error:
    <strong><span v-text="error"></span></strong>
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
  --boost-text: #fff;
  --account-name: #babdff;
  --card-body: rgba(255, 255, 255, 0.7);
  --post-footer-link: rgba(255, 255, 255, 0.7);
  --post-box-shadow-1: rgba(50, 50, 93, 0.9);
  --post-box-shadow-2: rgba(0, 0, 0, 0.07);
  --verified-badge: green;
  --thread-original-post-bg: #313543;
  --thread-original-post-box-shadow: black;
  --loading-text: #0d4b9f;
}

[data-bs-theme='light'] {
  --post-bg: #fff;
  --content-color: #212529;
  --post-bottom-border: #d2d2d2;
  --post-text-color: #212529;
  --boost-text: #000;
  --account-name: #212529;
  --card-body: rgba(0, 0, 0, 0.7);
  --post-footer-link: #212529;
  --post-box-shadow-1: rgba(0, 0, 0, 0.07);
  --post-box-shadow-2: transparent;
  --verified-badge: darkgreen;
  --thread-original-post-bg: #eee;
  --thread-original-post-box-shadow: gray;
  --loading-text: #0d4b9f;
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
  color: var(--loading-text);
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
