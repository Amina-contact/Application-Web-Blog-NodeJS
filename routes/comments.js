var express = require('express');
var router = express.Router();
const commentsRepo = require('../repositories/comments');


router.get('/', async function(req, res, next) {
  res.send(await  commentsRepo.getAllComment())
});

router.delete('/:id',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const id = req.params.id
    res.send( await commentsRepo.deleteComment(id))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.put('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const comment = req.body
    res.send(await commentsRepo.updateComment(comment))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.post('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const comment = req.body
    res.send(await commentsRepo.addComment(comment))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.get('/:id', async function(req, res, next) {
    res.send(await commentsRepo.getComment(req.params.id))
})





module.exports = router;
