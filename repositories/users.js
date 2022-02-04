const { User } = require('../models')

module.exports = {

getAllUsers() {

return User.findAll();

},

// méthodes à implémenter

getUsers(offset = 0, limit = 20) {

return User.findAll({ offset: parseInt(offset), limit: parseInt(limit)});

},

getAdmins() {

return User.findAll({ where:{ role:"admin" } });

},

getAuthors() {

return User.findAll({ where:{ role:"author" } });

},

getGuests(){

return User.findAll({ where:{ role:"guest" } });

},

getUser(id) {

return User.findByPk(id);

},

getUserByEmail(email) {

return User.findOne({ where: { email: email } });

},

addUser(user) {

return User.create({

username: user.username,

email: user.email,

password: user.password,

role: user.role

});

},

updateUser( user ) {

const userObject = User.findByPk(user.id);

return userObject.update( {}, { where: { id: user.id}});

},

deleteUser(id) {

return User.findOne( { where: { id: id}} ).then( user=>{ User.destroy( { where: { id: user.id}}); return user; })
 

},

// D'autres méthodes jugées utiles

}