// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
console.log(process.env.GRIDSOME_API_URL)

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['articles','categories'],
        populate:['author','categories','image','articles'],
        singlePopulate:['cover'],
        singleTypes: ['home','about','contact'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: '' 
        // }
      }
    }
  ],
  templates: {
    StrapiArticles: [
      {
        path: '/post/:id',
        name:"post",
        component: './src/templates/Post.vue'
      },
    ],
    StrapiCategories:[
      {
        path: '/tag/:id',
        name:"tag",
        component: './src/templates/tag.vue' 
      }
    ]
  }
}
