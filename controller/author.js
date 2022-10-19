const Author = require('../model/Author');

exports.create = async (req, res, next) => {
    const data = req.body;
    try {
        const author = new Author(data);
        await author.save();
        return res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

exports.index = async (req,res,next) => {
    try {
        const authors =await Author.find();
        return res.status(200).json(authors);
    }catch(error){
        next(error)
    }
};
