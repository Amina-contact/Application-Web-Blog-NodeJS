const { Comment, sequelize } = require('../models')
const { QueryTypes } = require('sequelize');


module.exports = {
    getAllComments() {
        return sequelize.query(" SELECT articles.*, count(comments.ArticleId) as nbrComments from articles, comments where articles.id = comments.ArticleId GROUP BY comments.ArticleId", { mapToModel: true,type: QueryTypes.SELECT  });
    },
    getComment(id) { 
        return Comment.findOne({ where: { id: id } });
    },
    addComment(comment) {
        const date = new Date();
        return Comment.create({
            content: comment.content,
            ArticleId: comment.articleid,
            UserId: comment.userid,
            createdAt: date,
            updatedAt : date
        });
    },
    updateComment( comment ) { 
        const cmtId = comment.id;
        delete comment.id;
        comment.updatedAt = new Date();
        return Comment.update( comment, { where: { id: cmtId } }).then( rA=>{ 
            if(rA==1) 
                return Comment.findOne({ where: {id: cmtId} }).then(comment=>Promise.resolve(comment)); 
            return Promise.resolve(null);
        });
    },
    deleteComment(id) { 
        return Comment.destroy( { where: { id: id}});
    },
    getCommentUser(id){
        return this.getComment(id).then( comment=> comment.getUser() ); 
    },
    getCommentArticle(id){
        return this.getComment(id).then( comment=> comment.getArticle()  );
    },
    

}