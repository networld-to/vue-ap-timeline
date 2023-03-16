<script lang="ts">
import { defineComponent } from 'vue';

import { getPost } from '../services/ActivityPub';
import { formatContent, formatDate, formatName } from '../services/Utility';

import PostThread from './PostThread.vue';
import Profile from './Profile.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faStar,
  faRocket,
  faQuoteLeft,
  faAnglesRight,
  faReply,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

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
  data() {
    return {
      faStar: faStar,
      faRocket: faRocket,
      faQuoteLeft: faQuoteLeft,
      faAnglesRight: faAnglesRight,
      faReply: faReply,
      faComments: faComments,
      parentPost: {
        id: '',
        content: '',
        emojis: [{}],
        account: {
          acct: '',
          avatar_static: '',
          display_name: '',
          username: '',
          url: '',
          note: '',
          statuses_count: 0,
          followers_count: 0,
          following_count: 0,
          emojis: {},
          fields: [
            {
              name: '',
              value: '',
              verified_at: '',
            },
          ],
        },

        url: '',
      },
      orgPost: {} as Record<string, any>,
      orgThreadPost: {} as Record<string, any>,
    };
  },
  components: {
    FontAwesomeIcon,
    PostThread,
    Profile,
  },
  beforeMount() {
    // If the post is a boost aka. reblog set the orgPost variable reblog, otherwise keep the root post.
    if (
      this.post.content == '' &&
      this.post.reblog != null &&
      this.post.reblog.content != null
    ) {
      this.orgPost = this.post.reblog;
    } else {
      this.orgPost = this.post;
    }

    if (this.post.in_reply_to_id != null) {
      var that = this;
      getPost(this.instanceHost, this.post.in_reply_to_id).then(
        (response: any) => {
          that.parentPost = response;
        }
      );
    }
  },
  methods: {
    formatDate: formatDate,
    formatContent: formatContent,
    formatName: formatName,
  },
});
</script>

<template>
  <div class="ap-post">
    <p class="ap-boost-text" v-if="post.reblog && post.reblog.content">
      <font-awesome-icon :icon="faRocket" />
      <img
        :src="post.account.avatar_static"
        class="ap-boost-avatar"
        v-if="!post.content"
      />
      <a
        :href="post.account.url"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#' + post.id"
        aria-controls="offcanvasBottom"
      >
        <span
          v-html="
            formatName(
              post.account.display_name,
              post.account.username,
              post.account
            )
          "
        ></span>
      </a>
      boosted
    </p>

    <p class="ap-reply-text" v-if="parentPost.account.username">
      <font-awesome-icon :icon="faReply" />&nbsp;&nbsp;reply to
      <img
        :src="parentPost.account.avatar_static"
        class="ap-reply-avatar"
      />
      <a
        :href="parentPost.account.url"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#' + parentPost.id"
        aria-controls="offcanvasBottom"
      >
        <span
          v-html="
            formatName(
              parentPost.account.display_name,
              parentPost.account.username,
              parentPost.account
            )
          "
        ></span>
      </a>
    </p>
    <!-- BEGIN: Offcanvas to show booster profile-->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      :id="post.id"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Profile</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <Profile :post="post"></Profile>
      </div>
    </div>
    <!-- END: Offcanvas to show booster profile-->

    <!-- BEGIN: Post Thread -->
    <div class="ap-thread" v-if="post.id">
      <a
        data-bs-toggle="offcanvas"
        :href="'#offcanvas-thread-' + post.id"
        role="button"
        aria-controls="offcanvas-thread-' + post.id"
        @click="orgThreadPost = orgPost"
      >
        <font-awesome-icon :icon="faComments" class="comments-icon" />
      </a>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        :id="'offcanvas-thread-' + post.id"
        :aria-labelledby="'offcanvas-thread-' + post.id + '-label'"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasThreadLabel">Post Thread</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <PostThread :orgPost="orgThreadPost" :instance-host="instanceHost" />
        </div>
      </div>
    </div>
    <!-- END: Post Thread -->

    <!-- Profile Information Header -->
    <div class="ap-avatar-box">
      <img
        :src="orgPost.account.avatar_static"
        class="ap-avatar"
      />

      <!-- Show the content of the original post -->
      <h6 class="ap-title" v-if="orgPost.content">
        <a
          :href="orgPost.account.url"
          data-bs-toggle="offcanvas"
          :data-bs-target="'#' + orgPost.id"
          aria-controls="offcanvasBottom"
        >
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
          <span class="ap-username">
            <a :href="orgPost.account.url" target="_blank">
              @{{ orgPost.account.username }}
            </a>
          </span>
        </a>
      </h6>
    </div>

    <!-- BEGIN: Offcanvas to show poster profile-->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      :id="orgPost.id"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Profile</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <Profile :post="orgPost"></Profile>
      </div>
    </div>
    <!-- END: Offcanvas to show poster profile-->

    <hr />

    <!-- BEGIN: Direct parent post of this reply -->
    <div class="card" v-if="parentPost.account.username">
      <div class="card-header">
        <a
          :href="parentPost.account.url"
          data-bs-toggle="offcanvas"
          :data-bs-target="'#' + parentPost.id"
          aria-controls="offcanvasBottom"
        >
          <font-awesome-icon :icon="faQuoteLeft" />&nbsp;&nbsp; @<span
            v-text="parentPost.account.acct"
          ></span>
        </a>
      </div>

      <!-- BEGIN: Offcanvas to show parent poster profile-->
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        :id="parentPost.id"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel">Profile</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <Profile :post="parentPost"></Profile>
        </div>
      </div>
      <!-- END: Offcanvas to show parent poster Profile-->

      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <a :href="parentPost.url" target="_blank">
            <span v-html="parentPost.content"></span>
          </a>
          <footer class="blockquote-footer">
            <img
              :src="parentPost.account.avatar_static"
              class="ap-boost-avatar"
            />
            <span
              v-html="
                formatName(
                  parentPost.account.display_name,
                  parentPost.account.username,
                  parentPost.account
                )
              "
            ></span>
          </footer>
        </blockquote>
      </div>
    </div>
    <!-- END: Direct parent post of this reply -->

    <!-- BEGIN: Original Post Content -->
    <div class="ap-content" v-if="orgPost.content">
      <p
        v-html="formatContent(orgPost.content, orgPost.emojis)"
        class="lead"
      ></p>
    </div>
    <!-- END: Original Post Content -->

    <!-- BEGIN: Multimedia (Image) View -->
    <div
      :id="'carousel-' + orgPost.id"
      class="carousel slide"
      v-if="orgPost.media_attachments[0]"
    >
      <div class="carousel-inner">
        <div
          :class="{ 'carousel-item': true, active: index == 0 }"
          v-for="(media, index) in orgPost.media_attachments"
          :key="index"
        >
          <a :href="media.url" target="_blank">
            <img
              :src="media.url"
              class="d-block w-100"
              :alt="media.description"
              v-if="media.type == 'image'"
            />
            <img
              :src="media.preview_url"
              class="d-block w-100"
              :alt="media.description"
              v-if="media.type == 'video'"
            />
          </a>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        :data-bs-target="'#carousel-' + orgPost.id"
        data-bs-slide="prev"
        v-if="orgPost.media_attachments.length > 1"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        :data-bs-target="'#carousel-' + orgPost.id"
        data-bs-slide="next"
        v-if="orgPost.media_attachments.length > 1"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- END: Multimedia (Image) View -->

    <!-- BEGIN: Link Preview Card -->
    <div class="card mb-3" v-if="orgPost && orgPost.card">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="orgPost.card.image"
            class="img-fluid rounded-start"
            v-if="orgPost.card.image"
            :alt="orgPost.card.title"
          />
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0, 0, 1400, 780"
            class="ap-placeholder-image"
            v-if="!orgPost.card.image"
          >
            <g id="Background">
              <rect x="0" y="0" width="1400" height="780" fill="#363A3E" />
            </g>
            <g id="Background" />
            <g id="Background">
              <g>
                <path
                  d="M463.326,212.495 L936.674,212.495 L936.674,567.505 L463.326,567.505 z"
                  fill-opacity="0"
                  stroke="#43474B"
                  stroke-width="30"
                  stroke-miterlimit="10"
                />
                <path
                  d="M605.33,309.136 C605.33,328.961 589.259,345.032 569.435,345.032 C549.61,345.032 533.539,328.961 533.539,309.136 C533.539,289.312 549.61,273.241 569.435,273.241 C589.259,273.241 605.33,289.312 605.33,309.136 z"
                  fill="#43474B"
                />
                <path
                  d="M878.689,507.548 L523.284,507.548 L570.618,406.173 L600.597,450.352 L700.789,298.092 L772.58,405.778 L806.503,368.699 z"
                  fill="#43474B"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <a :href="orgPost.card.url" class="stretched-link" target="_blank">
              <h5 class="card-title" v-html="orgPost.card.title"></h5>
              <p class="card-text" v-html="orgPost.card.description"></p>
              <p class="card-text">
                <small
                  class="text-muted"
                  v-text="orgPost.card.provider_name"
                ></small>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Link Preview Card -->

    <!-- BEGIN: Footer with statistics and date with link to post -->
    <div class="post-footer">
      <p class="ap-stats">
        <a :href="orgPost.url" target="_blank">
          <font-awesome-icon :icon="faReply" />&nbsp;&nbsp;{{
            orgPost.replies_count
          }}
        </a>
        &nbsp;
        <a :href="orgPost.url" target="_blank">
          <font-awesome-icon :icon="faRocket" />&nbsp;&nbsp;{{
            orgPost.reblogs_count
          }}
        </a>
        &nbsp;
        <a :href="orgPost.url" target="_blank">
          <font-awesome-icon :icon="faStar" />&nbsp;&nbsp;{{
            orgPost.favourites_count
          }}
        </a>
      </p>
      <p class="ap-post-link">
        <a
          :href="orgPost.url"
          target="_blank"
          class="text-xl font-bold text-center"
        >
          {{ formatDate(orgPost.created_at) }}
          <font-awesome-icon :icon="faAnglesRight" />
        </a>
      </p>
    </div>
    <!-- END: Footer with statistics and date with link to post -->
  </div>
</template>

<style>
a {
  text-decoration: none !important;
}

.ap-post {
  position: relative;
  background-color: var(--post-bg) !important;
  color: var(--post-text-color);
  padding: 25px 40px 25px 40px;
  box-shadow: 0 15px 35px var(--post-box-shadow-1),
    0 5px 15px var(--post-box-shadow-2) !important;
  border-bottom: 1px solid var(--post-bottom-border);
}

.ap-content {
  padding-top: 20px;
  padding-bottom: 10px;
}

.ap-content p {
  font-size: 1.1rem;
}

.ap-content a {
  font-weight: 400;
  color: var(--content-color);
}

.invisible {
  font-size: 0;
  line-height: 0;
  display: inline-block;
  width: 0;
  height: 0;
  position: absolute;
}

.comments-icon {
  color: var(--boost-text);
  opacity: 0.1;
}

/* BEGIN: Boosted Note */
.ap-boost-text, .ap-reply-text {
  position: absolute;
  top: 17px;
  left: 45px;
  font-size: 0.8rem;
  opacity: 0.4;
  font-weight: 700;
  color: var(--boost-text);
}

.ap-boost-text a, .ap-reply-text a {
  color: var(--boost-text);
}

.ap-boost-avatar, .ap-reply-avatar {
  height: 18px;
  width: 18px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
  vertical-align: top;
}

.ap-boost-text img.ap-display-name-emoji {
  width: 15px;
  height: 15px;
}
/* BEGIN: Boosted Note */

/* BEGIN: Post Thread */
.ap-thread {
  position: absolute;
  top: 8px;
  right: 35px;
}

.ap-thread .offcanvas a {
  font-size: 1rem;
  color: var(--ap-light-link-color);
}

.ap-thread a {
  text-align: center;
  font-size: 1.75rem;

  color: rgba(0, 0, 0, 0.2);
  top: 8px;
  right: 60px;
  color: rgba(255, 255, 255, 0.2);
}
/* END: Post Thread */

/* BEGIN: Profile Header */
.ap-avatar-box {
  text-align: center;
  margin-top: 25px;
  height: 50px;
  font-size: 1.75rem;
}

.ap-avatar {
  position: absolute;
  width: 55px;
  height: 55px;
  left: 40px;
  border-radius: 5px;
}

.ap-title {
  position: absolute;
  margin-top: 7px;
  left: 110px;
  width: 100%;
  text-align: left;
  font-weight: 600;
}

/* .ap-title a {
  color: var(--account-name);
} */

.ap-display-name-emoji {
  width: 20px;
  height: 20px;
  vertical-align: top;
}

.ap-username a {
  font-size: 0.8rem;
}
/* END: Profile Header */

/* BEGIN: Parent Post */
.ap-boost-avatar {
  height: 18px;
  width: 18px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50%;
  vertical-align: top;
}

.card p {
  font-size: 1rem;
}

.card-body a {
  color: var(--card-body);
}

.blockquote a {
  color: var(--card-body);
}
/* END: Parent Post */

.ap-placeholder-image {
  max-width: 100%;
  height: auto;
}

.fedihandle-subheader {
  font-size: 0.9rem !important;
  opacity: 0.7 !important;
}

/* BEGIN: Multimedia */
.carousel {
  max-height: 400px;
  margin-bottom: 25px;
}

.carousel a img {
  max-height: 400px;
  width: cover;
  object-fit: cover;
  margin-bottom: 25px;
}
/* END: Multimedia */

/* BEGIN: Footer */
.post-footer {
  padding-top: 40px;
}
.ap-stats {
  position: absolute;
  bottom: 20px;
  left: 50px;
  font-size: 0.8rem !important;
  opacity: 0.7;
}

.ap-stats a {
  color: var(--post-footer-link);
}

.ap-post-link {
  position: absolute;
  bottom: 20px;
  right: 50px;
  font-size: 0.8rem !important;
}

.ap-post-link a {
  color: var(--post-footer-link);
}
/* END: Footer */
</style>
