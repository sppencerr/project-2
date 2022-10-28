const Category = require('../models/cat');
const Post = require('../models/post');

getAllCats = async (req, res, next) => {
    try {
        let categories = await Category.getAll();
        res.render('categories', {
            categories: categories,
            title:"Categories",
            user: req.session.user,
            currentPath: req.baseUrl,
            error:''
        });
    } catch (error) {
        // error 1062 duplicate row is found by MySQL
        if (error.errno === 1062) {
            res.render('categories', {error: "Duplicate category exists"});

        } else {console.log(err)}
    }
}
module.exports.getAllCats = this.getAllCats;

getAddCatStructure = async (req, res) => {
    res.render('addCat');

}

module.exports.getAddCatStructure = this.getAddCatStructure;

addCat = async (req, res) => {
    try {
        let category = new Category(req.body.category, req.session.user.id);
        await category.save();
        res.redirect('/cats');

    } catch (error) {
        console.log(error);
    }
}

module.exports.addCat = this.addCat;


