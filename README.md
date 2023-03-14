# Vue Component Library for ActivityPub Timelines

## Getting Started

TBD: Write here a guide how to integrate this vue component library into a vue app.

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
├── style.css
├── vue-ap-timeline.es.js
└── vue-ap-timeline.umd.js
```

### Testing Locally

```bash
$ npm pack

# Copy the generated .tgz file to your project and include it in package.json
# and include it with "vue-ap-timeline": "./vue-ap-timeline-0.1.0.tgz" or similar
```

```bash
# In this repository
$ npm link

# In the vue test repository where you want to use this component library.
# Must be run in the same terminal where we run `npm link` (see above)
$ npm link vue-ap-timeline
```