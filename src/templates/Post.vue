<template>
  <Layout>
    <!-- Page Header-->
    <header
      class="masthead"
      :style="{backgroundImage: 'url('+`http://localhost:1337${postCover}`+')'}"
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="post-heading">
              <h1>{{ $page.post.attributes.title }}</h1>
              <h2 class="subheading">{{ $page.post.attributes.description }}</h2>
              <span class="meta">
                Posted by
                <a href="#!">{{author.name}}</a>
                on {{$page.post.attributes.createdAt}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Post Content-->
    <article class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7" v-html="$page.post.attributes.content">
          </div>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>
query ($id: ID!){
 post:strapiArticles (id:$id){
    id
    attributes {
      title
      content
      createdAt
      image {
           data {
              id 
              attributes {
                url
              }
            }
      }
      description
          categories {
            data {
              id 
              attributes {
                name
              }
            }
          }
          author {
            data {
              id 
               attributes {
                  name
                }
            }
          }
      
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    tags() {
        console.log(this.$page.post)
      return this.$page.post.categories.data.map((v) => {
        return v.attributes.name;
      });
    },
    author() {
      return this.$page.post.attributes.author.data.attributes
    },
    postCover(){
      return this.$page.post.attributes.image.data.attributes.url
    }
  },
};
</script>