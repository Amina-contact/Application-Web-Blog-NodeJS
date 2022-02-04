'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User)
      Article.hasMany(models.Comment)
      Article.belongsToMany(models.Tag, {through: 'ArticleTags'})
    }
  };
  Article.init({
    title: {
      type: DataTypes.STRING,
      unique: true
    },

    content: DataTypes.TEXT,
    /*image: DataTypes.TEXT,*/

    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};