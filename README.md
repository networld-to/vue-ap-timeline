# Vue Component Library for ActivityPub Timelines

[![NPM](https://nodei.co/npm/@networld-to/vue-ap-timeline.png?compact=true)](https://npmjs.org/package/@networld-to/vue-ap-timeline)

Integrate your Fediverse timeline into your Vue 3 with Bootstrap 5 application.
Currently, tested with [Mastodon](https://joinmastodon.org) and
[Akkoma](https://akkoma.social) via Mastodon compatible API calls.

Integrate a dark or light themed timeline into your own website.

![Dark and light themed timeline](https://media.githubusercontent.com/media/networld-to/vue-ap-timeline/main/screenshots/light-and-dark-themed-timelines.png)

## Getting Started

Add the Vue ActivityPub Timeline to your Vue 3 project.

```bash
$ yarn add @networld-to/vue-ap-timeline

# Add the following dependencies
$ yarn add bootstrap@5.3.0-alpha1 @popperjs/core

$ yarn install
$ yarn run dev
```

Add the following to your main.ts file.

```ts
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import VueApTimeline from '@networld-to/vue-ap-timeline';
import '@networld-to/vue-ap-timeline/dist/style.css';

var app = createApp(App);
app.use(VueApTimeline);
app.mount('#app');
```

Example how to include a dark and light themed timeline side by side, with optional
the number of posts specified, to show the latest 10 posts.

```vue
<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <VueApTimeline
            fediverseHandle="username@instance.tld"
            fediversePlatform="mastodon"
            numberOfPosts="10"
            theme="dark"
          ></VueApTimeline>
        </div>
        <div class="col-6">
          <VueApTimeline
            fediverseHandle="username@instance.tld"
            fediversePlatform="mastodon"
            numberOfPosts="10"
            theme="light"
          ></VueApTimeline>
        </div>
      </div>
    </div>
  </main>
</template>
```

Currently only compatible with Mastodon through CORS issue of ActivityPub endpoints
with all the tested Fediverse platforms.

`fediverseHandle` and `fediversePlatform` (with value `mastodon` or `akkoma`) are required.

## Supported ActivityPub Platforms

Through CORS issues making most, if not all, of the ActivityPub native endpoints
inaccessible from the browser a fallback to the native platform API is required.
The following list shows

| Platforms | fediversePlatform value | Supported Via                               | Tested                                    |
| --------- | ----------------------- | ------------------------------------------- | ----------------------------------------- |
| Mastodon  | `mastodon`              | Mastodon API                                | Fully                                     |
| Akkoma    | `akkoma`                | Mastodon Compatible API                     | Partially                                 |
| Lemmy     | N/A                     | Not supported, initial webfinger call fails | first fediverse-helper library call fails |

## More Screenshots

![Dark themed timeline with profile](https://media.githubusercontent.com/media/networld-to/vue-ap-timeline/main/screenshots/dark-themed-timeline-with-profile.png)
![Light themed timeline with profile](https://media.githubusercontent.com/media/networld-to/vue-ap-timeline/main/screenshots/light-themed-profile-with-profile.png)

## Developers

### Getting Started

```bash
$ yarn build
$ tree dist
dist
├── components
│   ├── PostEntry.vue.d.ts
│   └── VueApTimeline.vue.d.ts
├── index.d.ts
├── services
│   └── ActivityPub.d.ts
├── style.css
├── vue-ap-timeline.es.js
└── vue-ap-timeline.umd.js
```

### Testing Locally

Prepare your project by adding the following dependencies to your ../vue-ap-timeline-demo
project. Change the project name and path accordingly.

```bash
# Execute the following from your test project `vue-ap-timeline-demo`
$ yarn add bootstrap@5.3.0-alpha1 @popperjs/core

$ yarn install && cd ../vue-ap-timeline && npm link && cd ../vue-ap-timeline-demo && npm link vue-ap-timeline
```
