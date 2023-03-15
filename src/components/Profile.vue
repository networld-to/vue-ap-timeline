<script lang="ts">
import { defineComponent } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleDoubleRight, faCheck } from '@fortawesome/free-solid-svg-icons';

import { formatContent, formatName } from '../services/Utility';

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      faCheck: faCheck,
      faAngleDoubleRight: faAngleDoubleRight,
    };
  },
  methods: {
    formatName: formatName,
    formatContent: formatContent,
  },
  components: {
    FontAwesomeIcon,
  },
});
</script>

<template>
  <h5 class="text-center">
    <span
      v-html="
        formatName(
          post.account.display_name,
          post.account.username,
          post.account
        )
      "
    ></span>
    <p class="fedihandle-subheader">
      @<span v-text="post.account.acct"></span>
    </p>
  </h5>
  <p class="text-center">
    <a :href="post.account.url" target="_blank">
      <img
        :src="post.account.avatar_static"
        class="img-thumbnail profile-dialog-avatar"
      />
    </a>
  </p>
  <p class="text-center text-muted profile-dialog-stats">
    <strong>
      <span v-text="post.account.statuses_count" class="profile-count"></span>
    </strong>
    Posts &nbsp;&nbsp;
    <strong>
      <span v-text="post.account.following_count" class="profile-count"></span>
    </strong>
    Following &nbsp;&nbsp;
    <strong>
      <span v-text="post.account.followers_count" class="profile-count"></span>
    </strong>
    Followers
  </p>
  <hr />
  <p v-html="post.account.note"></p>
  <hr />
  <dl
    v-for="(field, index) in post.account.fields"
    :key="index"
    :class="{ 'verified-box': field.verified_at, 'profile-field-box': true }"
  >
    <dt v-html="formatContent(field.name, post.account.emojis)"></dt>
    <dd class="profile-field-value">
      <span v-if="field.verified_at">
        <font-awesome-icon :icon="faCheck" class="verified-badge fa-xl" />
      </span>
      <span v-html="field.value"></span>
    </dd>
  </dl>
  <p class="text-center d-grid p-2">
    <a :href="post.account.url" target="_blank" class="btn btn-secondary btn-small">
      Visit Profile
      <font-awesome-icon :icon="faAngleDoubleRight" />
    </a>
  </p>
</template>

<style scoped>
.profile-dialog-stats {
  font-size: 0.9rem !important;
}

.profile-dialog-avatar {
  max-width: 150px;
}

.profile-field-box {
  padding: 5px 5px 0 7px;
}

.verified-box {
  border: 1px solid #006400;
  background-color: rgba(144, 238, 144, 0.05);
  border-radius: 15px;
}

.profile-field-value {
  margin-left: 10px;
}

.verified-badge {
  color: var(--verified-badge);
  margin-right: 5px;
}
</style>
