const catchError = require('../middlewares/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users);
});


module.exports = {
    getAll,
}