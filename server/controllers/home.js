const Cars = require('../models/Cars');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const allCars = await Cars.find({}).count();
        const allBrands = await Cars.aggregate([
            { $group: { _id: "$Brand", total: { $sum: 1}}},
            { $count: "total"}
        ])

        const allOrigins = await Cars.aggregate([
            { $group: { _id:"$Origin", total: { $sum: 1}}},
            { $count: "total"}
        ])

        console.log(allCars)
        
        res.render("index", {allCars: allCars, allBrands: allBrands[0].total, allOrigins: allOrigins[0].total});
    }catch (e) {
        console.log(e)
        res.status(404).send({
            message: 'error rendering page',
        });
    }
}