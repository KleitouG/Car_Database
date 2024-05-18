const Cars = require("../models/Cars");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const cars = await Cars.find({Origin: "America"});
        res.render("america", { cars: cars, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list cars"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Cars.findByIdAndRemove(id);
        res.redirect("/america");
    } catch (e) {
        res.status(404).send({
            message: `could not delete car ${id}.`
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const cars = await Cars.findById(id);
        res.render('update-cars', { cars: cars, id: id});
    } catch (e) {
        res.status(404).send({
            message: `could not find car ${id}`
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try{
        const cars = await Cars.updateOne({ _id: id}, req.body);
        res.redirect('/america');
    } catch (e) {
        res.status(404).send({
            message: `could not find car ${id}`
        });
    }
};