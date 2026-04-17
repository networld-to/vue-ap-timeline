<script setup lang="ts"></script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Vue AP Timeline Example</h1>
    <div class="row">
      <div class="col-md-6">
        <h2 class="h5 mb-3">Dark Theme</h2>
        <VueApTimeline
          fediverseHandle="@Mastodon@mastodon.social"
          fediversePlatform="mastodon"
          numberOfPosts="5"
          theme="dark"
        />
      </div>
      <div class="col-md-6">
        <h2 class="h5 mb-3">Light Theme</h2>
        <VueApTimeline
          fediverseHandle="@Mastodon@mastodon.social"
          fediversePlatform="mastodon"
          numberOfPosts="5"
          theme="light"
        />
      </div>
    </div>
  </div>
</template>
