/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

//import Vue from "vue";
//import App from "../app.vue";

//document.addEventListener("DOMContentLoaded", () => {
// const el = document.body.appendChild(document.createElement("hello"));
//const app = new Vue({
// el,
//mess: "Hello Vue!",
//render: h => h(App)
//});

//console.log(app);
//});

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>

import Vue from "vue/dist/vue.esm";
import App from "../app.vue";
import Datetime from "vue-datetime";
import axios from "axios-on-rails";
// You need a specific loader for CSS files

Vue.use(Datetime, axios);

document.addEventListener("DOMContentLoaded", () => {
  const app = new Vue({
    el: "#hello",
    data: {
      message: "Can you say hello?",
      t1: [],
      activeAppo: [],
      isoedDate: '',
      modSunday: [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5],
      fechaCita: false,
      appoOk: false,
      maxDate: "2019-10-31T00:00:00.000-05:00",
      dateEmpty: "",
      timeEmpty: ""
    },
    components: {
      App
    },
    watch: {
      dateEmpty: function () {
        if (this.dateEmpty !== "") {
          this.fechaCita = true;
        }
      },
      timeEmpty: function () {
        if (this.timeEmpty !== "") {
          this.appoOk = true;
        }
      },
      sunday: function () {

      }
    },
    computed: {
      now: function () {
        return new Date().toISOString();
      },

      isoedD: function () {
        this.isoedDate = new Date().toLocaleString();
      }
    },
    created: function () {
      this.verPac();
      this.isoedD();
    },
    methods: {
      verPac() {
        let uri = "http://localhost:3000/citasAjax";
        axios.get(uri).then(response => {
          console.log(response.data);
          this.t1 = response.data;
        });
      },
      newConsulta(a) {
        this.activeAppo = a;
        this.appoOk = true;
      },

      isoedD: function () {
        this.isoedDate = new Date().toLocaleString().slice(0, 10);
      }
    },
    mounted: {}
  });
});

//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })