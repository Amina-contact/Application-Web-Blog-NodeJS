const { Tag } = require('../models')
const Sequelize = require('sequelize');


module.exports = {
    getAllTags() {
        return Tag.findAll();
    },
    getTag(id){
        return Tag.findOne({ where: { id: id } });
    },
    getTagByName(name){
        return Tag.findOne({ where: { name: name } });
    },
    addTag(tag) {
        return Tag.create({
            name: tag.name,
        });
    },
    updateTag( tag ) { 
        let tagid = tag.id;
        delete tag.id;
        tag.updatedAt = new Date();
        return Tag.update( tag, { where: { id: tagid} }).then(rA=>{
            if(rA==1)
                return Tag.findOne({ where: {id: tagid} }).then( tg=>Promise.resolve(tg))
            return Promise.resolve(null);
        });
    },
    deleteTag(id) { 
        return Tag.destroy( { where: { id: id}});
    },
    
    getTagArticles(id){
        return Tag.findOne({ where: { id: id } }).then( tag=>tag.getArticles());
    },

    checkTags(tags){
        const Op = Sequelize.Op;
        return Tag.count({ where: { id: { [Op.in]: tags }  }   });
    }
}