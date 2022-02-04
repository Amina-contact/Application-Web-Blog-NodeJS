'use strict';
var faker = require('faker');
const {User,Article,Tag}  = require('../models');
module.exports = {
  up: async (queryInterface, Sequelize) => {
   //user
     var user = []
     var year = 2021
     for(var i=0;i<20;i++){
      var date = new Date()
      date.setFullYear(--year)
      user.push({
        username: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.randomize([ 'admin', 'author', 'guest']),
        createdAt: date,
        updatedAt: date
       })
     }
      
  await queryInterface.bulkInsert('Users', user, {});

       // tags:
       var tag = []
       for(var i=0;i<10;i++){
        date.setFullYear(--year)
        tag.push({
          name: faker.random.words(3),
          createdAt: new Date(),
          updatedAt: new Date()
         })
       }

       await queryInterface.bulkInsert('Tags', tag, {});
       
         // articles:
         var article = []
         var users = await User.findAll();
        for(user of users)
        {
          var number = faker.datatype.number({'min':2,'max':10})
          for(var i = 0;i<number;i++)
          {
                var date = new Date(user.createdAt)
                date.setDate(date.getDate()+i)
                article.push(
                {
                  title: faker.name.title()+i,
                  content: faker.lorem.text(),
                  /*image: faker.image.imageUrl(),*/
                  published : true,
                  UserId :user.id,
                  createdAt:date,
                  updatedAt:date
                })
          }
        }
        await queryInterface.bulkInsert('Articles', article, {});
        

     // ArticleTags:
     var articleTags = []
     var articles = await Article.findAll();
     var tags = await Tag.findAll({
      attributes: ['id']
     });
     for(article of articles)
     {

       var number = faker.datatype.number({'min':2,'max':6})
       var TagIds = faker.random.arrayElements(tags,number);
       
       for(const TagId of TagIds)
       {
             articleTags.push(
             {
               TagId :TagId.id,
               ArticleId :article.id,
               createdAt:article.createdAt,
               updatedAt:article.createdAt
             })
       }
     }
     await queryInterface.bulkInsert('ArticleTags', articleTags, {});

     //comments:
     var comments = []

  for(article of articles)
     {

       var number = faker.datatype.number({'min':0,'max':10})
      
       for(var i = 0;i<number;i++)
       {
             comments.push(
             {
               content : faker.lorem.text(),
               ArticleId :article.id,
               createdAt:article.createdAt,
               updatedAt:article.createdAt
             })
       }
     }
    await queryInterface.bulkInsert('Comments',comments, {});
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('ArticleTags', null, {});
     await queryInterface.bulkDelete('Comments', null, {});
     await queryInterface.bulkDelete('Articles', null, {});
     await queryInterface.bulkDelete('Users', null, {});
     await queryInterface.bulkDelete('Tags', null, {});
  }
};