<template>
  <Layout>
    <!-- Page Header-->
       <header
      class="masthead"
      :style="{backgroundImage: 'url('+`http://localhost:1337${tagCover}`+')'}"
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="post-heading text-center">
              <h1>{{ $page.tag.attributes.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <!-- Post preview-->
          <template v-for="(post, index) in posts">
            <div class="post-preview" :key="post.id">
              <g-link :to="`post/${post.id}`">
                <h2 class="post-title">{{ post.attributes.title }}</h2>
                <h3 class="post-subtitle">
                  {{ post.attributes.description }}
                </h3>
              </g-link>
              <!-- <p class="post-meta">
                Posted by
                <a href="#!">
                  {{ post.attributes.author.data.attributes.name }}
                </a>
                on {{ post.node.attributes.createdAt }}
              </p> -->

              <!-- <p class="post-meta">
                <button
                  class="tag"
                  v-for="tag in tags(post.attributes)"
                  :key="tag"
                >
                  {{ tag }}
                </button>
              </p> -->

              <hr class="my-4" v-if="index <posts.length - 1" />
            </div>
            <!-- Divider-->
          </template>

          <!-- Pager-->
          <div class="d-flex justify-content-center mb-4">
            <!-- <Pager
              :info="$page.posts.pageInfo"
              linkClass=" btn btn-primary text-uppercase"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id:ID!,$page:Int) {
   posts: allStrapiArticles (perPage: 3, page: $page) @paginate {
    pageInfo {
        totalPages
        currentPage
    }
    edges {
      node {
        id
        attributes {
          title
          createdAt
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
  }
  tag:strapiCategories (id:$id) {
        id
        attributes {
          name
           image {
            data {
              id
              attributes {
                url
              }
            }
          }
          articles {
            data {
              id
              attributes {
                title
                description
                createdAt
              }
            }
          }  
      }
  }
}
</page-query>


<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  computed: {
    tagCover(){
        return this.$page.tag.attributes.image.data.attributes.url
    },
    posts(){
      const tag=this.$page.tag
        const list= this.$page.posts.edges.filter(post=>{
          console.log(post.node,this.$page)
          const {categories}=post.node.attributes
          return categories.data.find(c=>c.id==tag.id)?true:false;
        }).map(v=>{
          return {id:v.id,...v.node}
        })
        return list
    }
  },
  metaInfo: {
    title: "home!",
  },
};
</script>

<style scoped>
.tag {
  border: 0;
  font-size: 0.8rem;

  margin-right: 0.5rem;
  background: #f5f5f5;
  color: #333;
  transition: all 0.2s ease-in-out;
}

.tag:hover {
  background: var(--bs-cyan);
  color: white;
}
</style>
