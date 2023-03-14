# Vue Component Library for ActivityPub Timelines

## Demo

Integrate your Fediverse timeline into your Vue 3 with Bootstrap 5 application.
Currently, tested with [Mastodon](https://joinmastodon.org).

![Dark and light themed timeline](https://media.githubusercontent.com/media/networld-to/vue-ap-timeline/main/screenshots/dark-and-light-demo.png)

The picture below shows two timelines for different users with a different
style and the profile dialog. The profile dialog can be opened when clicking
on the Fediverse handle in the quoted parent post.

![Two different timelines with profile dialog open](https://media.githubusercontent.com/media/networld-to/vue-ap-timeline/main/screenshots/two-different-timelines-with-profile-dialog.png)

Integrate a dark or light themed timeline into your own website.

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
import '@networld-to/vue-ap-timeline/dist/style.css'

var app = createApp(App)
app.use(VueApTimeline)
app.mount('#app')
```

Example how to include a dark and light themed timeline side by side.

```vue
<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <VueApTimeline
            instanceHost="https://instance.domain"
            accountID="12345678901234567890"
            theme="dark"
          ></VueApTimeline>
        </div>
        <div class="col-6">
          <VueApTimeline
            instanceHost="https://instance.domain"
            accountID="12345678901234567890"
            theme="light"
          ></VueApTimeline>
        </div>
      </div>
    </div>
  </main>
</template>
```

Currently tested with Mastodon. Should be compatible with other Mastodon API
compatible projects. More projects will be supported in the future.

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