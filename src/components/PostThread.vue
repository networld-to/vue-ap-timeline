<script lang="ts">
import { format } from 'date-fns';
import { defineComponent } from 'vue';
import { getThread } from '../services/ActivityPub';
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
            },
          },
        ],
      },
    };
  },
  watch: {
    orgPost: function() {
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
        getThread(this.instanceHost, this.orgPost.id)
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
      <p><br/></p>
    </div>
    <div
      v-for="(post, index) in thread.ancestors"
      :key="index"
      class="thread-post"
    >
      <div v-if="post.id">
        <h5>
          <span
            v-html="
              formatName(
                post.account.display_name,
                post.account.username,
                post.account
              )
            "
          ></span>
        </h5>
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
      <h5>
        <span
          v-html="
            formatName(
              orgPost.account.display_name,
              orgPost.account.username,
              orgPost.account
            )
          "
        ></span>
      </h5>
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
        <h5>
          <span
            v-html="
              formatName(
                post.account.display_name,
                post.account.username,
                post.account
              )
            "
          ></span>
        </h5>
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
  box-shadow: var(--thread-original-post-box-shadow) 0px 2px 5px -1px, var(--thread-original-post-box-shadow) 0px 1px 3px -1px;
  background-color: var(--thread-original-post-bg);
  padding: 15px;
}

.text-right {
  text-align: right;
}
</style>
