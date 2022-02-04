var express = require('express');
var router = express.Router();
const tagsRepo = require('../repositories/tags');


router.get('/', async function(req, res, next) {
  res.send(await  tagsRepo.getAllTag())
});



router.delete('/:id',async function(req,res,next){ 
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const id = req.params.id
    res.send(await tagsRepo.deleteTag(id))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.put('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const tag = req.body
    res.send(await tagsRepo.updateTag(tag))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.post('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const tag = req.body
  res.send(await tagsRepo.addTag(tag))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.get('/:id', async function(req, res, next) {
    res.send(await tagsRepo.getTag(req.params.id))
})

module.exports = router;
