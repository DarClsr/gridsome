<template>
  <Layout>
    <!-- Page Header-->
    <header
      class="masthead"
      :style="{
        backgroundImage: 'url('+`${imgUrl+about.url}`+')',

      }"
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="page-heading">
              <h1>{{ about.title }}</h1>
              <span class="subheading">{{ about.subTitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
    <main class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7" v-html="mdToHtml()">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              nostrum ullam eveniet pariatur voluptates odit, fuga atque ea
              nobis sit soluta odio, adipisci quas excepturi maxime quae totam
              ducimus consectetur?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              praesentium recusandae illo eaque architecto error, repellendus
              iusto reprehenderit, doloribus, minus sunt. Numquam at quae
              voluptatum in officia voluptas voluptatibus, minus!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              consequuntur magnam, excepturi aliquid ex itaque esse est vero
              natus quae optio aperiam soluta voluptatibus corporis atque iste
              neque sit tempora!
            </p>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>
<page-query>
 query {
  banner:allStrapiAbout {
    edges {
      node {
         id
         data {
            id
            attributes {
              title
              subTitle
              main
              cover {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
      }
    }
   
  }
}
</page-query>

<script>
import { parseObj } from "@/utils/parse";
const MarkdownIt = require('markdown-it');
let md= new MarkdownIt();
export default {
  metaInfo: {
    title: "About us",
  },
  computed: {
    about() {
      const result = parseObj(this.$page.banner, true);
      return result;
    },
  },
  methods:{
      mdToHtml(){
          return  md.render(this.about.main);
      }
  }
};
</script>
