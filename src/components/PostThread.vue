<script lang="ts">
import { format } from 'date-fns';
import { defineComponent } from 'vue';
import { getMastodonThread } from '../services/Mastodon';
import { formatContent, formatName } from '../services/Utility';

export default defineComponent({
  props: {
    orgPost: {
      type: Object,
      required: true,
    },
    instanceHost: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      thread: {
        ancestors: [
          {
            id: '',
            content: '',
            url: '',
            created_at: '',
            emojis: [{}],
            account: {
              acct: '',
              display_name: '',
              username: '',
              avatar_static: '',
            },
          },
        ],
        descendants: [
          {
            id: '',
            content: '',
            url: '',
            created_at: '',
            emojis: [{}],
            account: {
              acct: '',
              display_name: '',
              username: '',
              avatar_static: '',
            },
          },
        ],
      },
    };
  },
  watch: {
    orgPost: function () {
      this.load();
    },
  },
  // TBD: Move those functions out of here. The same are used in PostEntry.vue (copy & paste)
  methods: {
    formatDate(strDate: string) {
      return format(new Date(strDate), 'MMM do, yyyy, H:mm');
    },
    formatName: formatName,
    formatContent: formatContent,
    load() {
      var that = this;
      if (this.orgPost && this.orgPost.id) {
        getMastodonThread(this.instanceHost, this.orgPost.id)
          .then((response: any) => {
            that.thread = response;
          })
          .finally(() => {
            that.loading = false;
          });
      }
    },
  },
});
</script>

<template>
  <div v-if="orgPost.id">
    <div class="text-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p><br /></p>
    </div>
    <div
      v-for="(post, index) in thread.ancestors"
      :key="index"
      class="thread-post"
    >
      <div v-if="post.id">
        <div class="thread-avatar-box">
          <img :src="post.account.avatar_static" class="thread-avatar" />

          <!-- Show the content of the original post -->
          <h5 class="thread-title" v-if="post.content">
            <span
              v-html="
                formatName(
                  post.account.display_name,
                  post.account.username,
                  post.account
                )
              "
            ></span>
            <br />
            <span class="thread-username">
              <span>@{{ post.account.username }}</span>
            </span>
          </h5>
        </div>
        <p v-html="formatContent(post.content, post.emojis)"></p>
        <p class="text-right">
          <small>
            &mdash; <span v-text="formatDate(post.created_at)"></span>
          </small>
        </p>
        <hr />
      </div>
    </div>

    <div class="original-post">
      <div class="thread-avatar-box">
          <img :src="orgPost.account.avatar_static" class="thread-avatar" />

          <!-- Show the content of the original orgPost -->
          <h5 class="thread-title" v-if="orgPost.content">
            <span
              v-html="
                formatName(
                  orgPost.account.display_name,
                  orgPost.account.username,
                  orgPost.account
                )
              "
            ></span>
            <br />
            <span class="thread-username">
              <span>@{{ orgPost.account.username }}</span>
            </span>
          </h5>
        </div>
      <p v-html="formatContent(orgPost.content, orgPost.emojis)"></p>
      <p class="text-right">
        <small>
          &mdash; <span v-text="formatDate(orgPost.created_at)"></span>
        </small>
      </p>
    </div>
    <hr />

    <div
      v-for="(post, index) in thread.descendants"
      :key="index"
      class="thread-post"
    >
      <div v-if="post.id">
        <div class="thread-avatar-box">
          <img :src="post.account.avatar_static" class="thread-avatar" />

          <!-- Show the content of the original post -->
          <h5 class="thread-title" v-if="post.content">
            <span
              v-html="
                formatName(
                  post.account.display_name,
                  post.account.username,
                  post.account
                )
              "
            ></span>
            <br />
            <span class="thread-username">
              <span>@{{ post.account.username }}</span>
            </span>
          </h5>
        </div>
        <p v-html="formatContent(post.content, post.emojis)"></p>
        <p class="text-right">
          <small>
            &mdash; <span v-text="formatDate(post.created_at)"></span>
          </small>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.original-post {
  box-shadow: var(--thread-original-post-box-shadow) 0px 2px 5px -1px,
    var(--thread-original-post-box-shadow) 0px 1px 3px -1px;
  background-color: var(--thread-original-post-bg);
  padding: 15px;
}

.text-right {
  text-align: right;
}

.thread-avatar-box {
  position: relative;
  text-align: center;
  margin-top: 10px;
  height: 60px;
}

.thread-avatar {
  position: absolute;
  width: 45px;
  height: 45px;
  left: 10px;
  border-radius: 5px;
}

.thread-title {
  position: absolute;
  left: 70px;
  width: 100%;
  padding-top: 4px;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
}

.thread-username {
  font-size: 0.75rem;
}
</style>
