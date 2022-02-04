const { Article } = require('../models')
module.exports = {
    getArticles(offset = 0, limit = 10) { 
        return Article.findAll({  offset: parseInt(offset), limit: parseInt(limit)});
    },
    getAllArticles(){
        return Article.findAll();
    },
    getArticle(id) { 
        return Article.findOne({ where: { id: id } });
    },
    getArticleByTitle(title) { 
        return Article.findOne({ where: { title: title } });
    },
    addArticle(article) {
        return Article.create({
            title: article.title,
            content: article.content,
            /*image: article.image,*/
            UserId: article.userid,
        }).then( R_article => {
            if (article.tags)
                return this.getArticle(R_article.id).then( art=> art.addTags(article.tags).then( anything=>Promise.resolve(R_article) ) );
            
            return Promise.resolve(R_article) 
        });
    },
    updateArticle( article ) { 
        const articleID = article.id;
        delete article.id;
        article.updatedAt = new Date();
        return Article.update( article, { where: { id: articleID} }).then( affectedArticles => { 
            if( affectedArticles==1 )
                return this.getArticle(articleID).then( Rarticle=>{
                    if (article.tags) 
                        return Rarticle.setTags(article.tags).then( any=>Promise.resolve(Rarticle)); 
                    return Promise.resolve(Rarticle);
                })
            return Promise.resolve(null); 
        });
    },
    deleteArticle(id) { 
        return Article.destroy( { where: { id: id}});
    },
    getArticleUser(id){
        return this.getArticle(id).then( article=> article.getUser() ) ;
    },
    getArticleComments(id){
        return this.getArticle(id).then( article=> article.getComments() ) ;
    },
    
    getArticleTags(id){
        return this.getArticle(id).then( article=> article.getTags() )        
    },
  
    
}