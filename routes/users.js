var express = require('express');
var router = express.Router();
const usersRepo = require('../repositories/users')
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

router.get('/', async function(req, res, next) {
  const  page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  res.send(await  usersRepo.getUsers(offset,limit))
});



router.delete('/:id',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const id = req.params.id
    await usersRepo.deleteUser(id)
    res.send({id})
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
  
})

router.put('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const user = req.body
  res.send(await usersRepo.updateUser(user))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.post('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
    const user = req.body
    const retrievedUser = await usersRepo.getUserByEmail(user.email) 
    if(!retrievedUser){
      res.send(await usersRepo.addUser(user))
    }else{
      res.status(400).json({ message: 'Email already exists!' })
    }
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.get('/:id',async function(req, res, next) {
      res.send(await usersRepo.getUser(req.params.id))
})

router.post('/authenticate', async function(req, res, next) {
  const credentials = req.body
  console.log(req.body);
  const retrievedUser = await usersRepo.getUserByEmail(credentials.email) 
  if(!retrievedUser) res.status(400).json({ message: 'incorrect Email!' })
  else if(retrievedUser.dataValues.password != credentials.password) res.status(400).json({ message: 'password incorrect!' })
  else{
    const {password,...authenticatedUser} = retrievedUser.dataValues
    const token = jwt.sign({username: authenticatedUser.username,  role: authenticatedUser.role}, config.secret, { expiresIn: '1m' });
    res.status(200).send({authenticatedUser,token})
  } 
})

router.get('/articles/:id', async function(req, res, next) {
  res.send(await usersRepo.findUserArticles(req.params.id))
})



module.exports = router;
