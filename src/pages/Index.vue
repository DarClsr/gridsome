<template>
  <Layout>
    <!-- Page Header-->
    <header
      class="masthead"
      :style="{
        backgroundImage: 'url(`${beseUrl+banner.url}`)',
      }"
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="site-heading">
              <h1>{{ banner.title }}</h1>
              <span class="subheading">{{ banner.subTitle }}</span>
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
          <template v-for="(post, index) in $page.posts.edges">
            <div class="post-preview" :key="post.node.id">
              <g-link :to="`post/${post.node.id}`">
                <h2 class="post-title">{{ post.node.attributes.title }}</h2>
                <h3 class="post-subtitle">
                  {{ post.node.attributes.description }}
                </h3>
              </g-link>
              <p class="post-meta">
                Posted by
                <a href="#!">
                  {{ post.node.attributes.author.data.attributes.name }}
                </a>
                on {{ post.node.attributes.createdAt }}
              </p>

              <p class="post-meta">

                <g-link :to="`tag/${tag.id}`" class="tag"   v-for="tag in tags(post.node.attributes)"
                  :key="tag">
                  {{ tag.name }}
                </g-link>
              </p>

              <hr class="my-4" v-if="index < $page.posts.edges.length - 1" />
            </div>
            <!-- Divider-->
          </template>

          <!-- Pager-->
          <div class="d-flex justify-content-center mb-4">
            <Pager
              :info="$page.posts.pageInfo"
              linkClass=" btn btn-primary text-uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
  posts:  allStrapiArticles (perPage: 3, page: $page) @paginate {
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

    banner:allStrapiHome {
    edges {
      node {
         id
         data {
            id
            attributes {
              title
              subTitle
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
import { Pager } from "gridsome";
import { parseObj } from "@/utils/parse";
export default {
  components: {
    Pager,
  },
  computed: {
    tags() {
      return ({ categories }) => {
        return categories.data.map((v) => {
          return {
            name:v.attributes.name,
            id:v.id
          };
        });
      };
    },
    banner() {
      const result = parseObj(this.$page.banner, true);
      return result;
    },
  },
  metaInfo: {
    title: "home!",
  },
  mounted(){
    console.log(this.$page)
  }
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
