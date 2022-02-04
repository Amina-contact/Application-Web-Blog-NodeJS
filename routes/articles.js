var express = require('express');
var router = express.Router();
const articlesRepo = require('../repositories/articles');


router.get('/', async function(req, res, next) {
  const  page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  res.send(await  articlesRepo.getArticles(offset,limit))
});



router.delete('/:id',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const id = req.params.id
    res.send(await articlesRepo.deleteArticle(id))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.put('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const article = req.body
    res.send(await articlesRepo.updateArticle(article))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.post('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const article = req.body
    res.send(await articlesRepo.addArticle(article))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.get('/:id', async function(req, res, next) {
    res.send(await articlesRepo.getArticle(req.params.id))
})



router.get('/:id/comments', async function(req, res, next) {
  res.send(await articlesRepo.getArticleWithComments(req.params.id))
})

module.exports = router;
