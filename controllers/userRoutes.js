const User = require('../models/user')

getAllUsers = async (req, res, next) => {
    try {
        let users = await User.getAll();
        res.send(users)
    } catch (error) {
        console.log(error);
        next();
    }
}
module.exports.getAllUsers = getAllUsers;

createNewUser = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let user = new User(user, password);
        user = await user.save();
        res.redirect('/users/login');
    } catch (err) {
        if(err.errno===1062){
        // error 1062 duplicate row is found by MySQL
        res.render('register', {error: "Username is taken."});
    }
    else{console.log(err)}
    }
}
module.exports.createNewUser = createNewUser;

login = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let user = new User(username, password);
        let result = await user.getUserByLoginCreds();
        if (result.length>0){
            req.session.user = result[0];
            res.redirect('/cats');
        }
        else {
            res.render('login', {error: "Login credentials are incorrect"});
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports.login = login;

getUserById = async (req, res, next) => {
    try {
        let user = await User.getById(req.params.id);
        res.send(user);
    } catch (error) {
        console.log(error)
    }
}

module.exports.getUserById = getUserById;

getRegisterForm = (req, res) => {
    res.render('register',{error:''});
}

module.exports.getRegisterForm = this.getRegisterForm;

getLoginForm = (req, res) => {
    res.render('login',{error:''});
}

module.exports.getLoginForm = getLoginForm;

checkAuth = (req, res, next) => {
    if(!req.session.user){
        res.status(401).redirect('/users/login');
    }
    else{
        next();
    }
}
module.exports.checkAuth = checkAuth;

checkAuthAjax = (req, res, next) => {
    if(!req.session.user){ res.status(401).json({"message": "error"});
    }
    else {
        next();
    }
}
module.exports.checkAuthAjax = checkAuthAjax;

signout = (req, res) => {
    if(req.session.user){
        delete req.session.user;
    }
    res.redirect('/');
}
module.exports.signout = signout;

checkRole = (role) => {
    return (req, res, next) => {
        let user = req.session.user;
        let userPermissionLevel = User.getPermissionLevel(user.usertype);
        let requiredPermissionLevel = User.getPermissionLevel(role);
        if(userPermissionLevel < requiredPermissionLevel){
            res.status(401).render("notAuthorized");
        }
        else{
            next();
        }
    }
}
module.exports.checkRole = checkRole;