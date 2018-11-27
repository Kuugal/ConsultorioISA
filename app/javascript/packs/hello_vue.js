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
      dateFormat: "yyyy-MM-dd",
      timeFormat: "HH:mm",
      t1: [],
      t3: [],
      activeAppo: [],
      isoedDate: "",
      dia: "",
      modSunday: [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5],
      fechaCita: false,
      appoOk: false,
      t2: "",
      maxDate: "2019-10-31T00:00:00.000-05:00",
      dateEmpty: "",
      timeEmpty: "",
      newProcedimientosM: false
    },
    components: {
      App
    },
    watch: {
      dateEmpty: function() {
        if (this.dateEmpty !== "") {
          this.fechaCita = true;
          var a = this.dateEmpty.slice(0, 4);
          var m = this.modSunday[this.dateEmpty.slice(5, 7) - 1];
          var d = this.dateEmpty.slice(8, 10);
          this.dia = (
            (((a - 1) % 7) +
              (((a - 1) / 4 - (3 * ((a - 1) / 100 + 1)) / 4) % 7) +
              m +
              (d % 7)) %
            7
          ).toFixed(0);
          var h = this.timeEmpty.slice(11, 13);
          if (this.dia == 6) {
            this.fechaCita = false;
          } else if (this.dia == 5) {
            if (h >= 9 && h < 13) {
              this.t2 = "SabOk";
              this.appoOk = true;
            } else {
              this.t2 = "horario no laborable joven";
              this.appoOk = false;
            }
          } else {
            if (h >= 9 && h < 18) {
              this.t2 = this.timeEmpty.slice(11, 16);
              this.appoOk = true;
            } else {
              this.t2 = "horario no laborable joven";
              this.appoOk = false;
            }
          }
        }
      },
      timeEmpty: function() {
        if (this.timeEmpty !== "") {
          var h = this.timeEmpty.slice(11, 13);

          if (this.dia == 6) {
            this.fechaCita = false;
          } else if (this.dia == 5) {
            if (h >= 9 && h < 13) {
              this.t2 = this.timeEmpty.slice(11, 16);
              this.appoOk = true;
            } else {
              this.t2 = "horario no laborable joven";
              this.appoOk = false;
            }
          } else {
            if (h >= 9 && h < 18) {
              this.appoOk = true;
            } else {
              this.appoOk = false;
            }
            this.t2 = this.timeEmpty.slice(0, 16);
          }
          var i;

          for (i = 0; i < this.t1.length; i++) {
            if (this.timeEmpty.slice(11, 16) == this.t1[i].hora) {
              if (this.timeEmpty.slice(0, 10) == this.t1[i].dia) {
                this.appoOk = false;
                this.t2 = "Ya está => " + this.t1[i].hora;
              }
            }
          }
        }
      },
      isSunday: function() {
        if (this.dateEmpty !== "") {
          this.t2 = this.dateEmpty;
        }
      }
    },
    computed: {
      now: function() {
        return new Date().toISOString();
      },

      isoedD: function() {
        this.isoedDate = new Date().toLocaleString();
      }
    },
    created: function() {
      this.verPac();
      this.verProc();
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
      verProc() {
        let uri = "http://localhost:3000/procAjax";
        axios.get(uri).then(response => {
          console.log(response.data);
          this.t3 = response.data;
        });
      },
      fixProc: function(name) {
        j = 0;

        for (i = 0; i < this.t3.length; i++) {
          if (this.t3[i].paciente == name) {
            j++;
          }
        }
        if (j > 1) {
          for (i = this.t3.length; i == 0; i--) {
            if (this.t3[i].paciente == name) {
              z = this.t3[i].procedimiento;
            }
          }
          return z;
        } else {
          return name;
        }
      },

      newConsulta(a) {
        this.activeAppo = a;
        this.appoOk = true;
      },

      isoedD: function() {
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
