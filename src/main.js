// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../static/asset/css/index.css"

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  console.log(process.env.GRIDSOME_IMG_URL,"lllll")
  Vue.mixin({
    data(){
      return {
        beseUrl:process.env.GRIDSOME_API_URL,
        imgUrl:process.env.GRIDSOME_IMG_URL
      }
    }
  })
  Vue.component('Layout', DefaultLayout)
}
