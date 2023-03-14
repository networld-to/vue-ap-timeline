import { App } from 'vue';
import VueApTimeline from './components/VueApTimeline.vue';

export default {
  // Add the following to main.ts:
  //
  //    import VueApTimeline from 'vue-ap-timeline';
  //    import 'vue-ap-timeline/dist/style.css'
  //    var app = createApp(App)
  //    app.use(VueApTimeline)
  install: (app: App<any>): any => {
    app.component('VueApTimeline', VueApTimeline);
  },
};
