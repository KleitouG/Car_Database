const Cars = require("../models/Cars");


exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message
    const cars = await Cars.find({});
    res.render("allcars", { cars: cars, message: message });
  } catch (e) {
    res.status(404).send({ message: "could not list cars" });
  }
};



exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Cars.findByIdAndRemove(id);
    res.redirect("/allcars");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
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
          message: `could not find cars ${id}`
      });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try{
      const cars = await Cars.updateOne({ _id: id}, req.body);
      res.redirect('/allcars');
  } catch (e) {
      res.status(404).send({
          message: `could not find cars ${id}`
      });
  }
};

exports.create = async (req, res) => {

  try {
    const cars = new Cars({ 
        Car_name: req.body.Car_name,
        Origin: req.body.Origin,
        Brand: req.body.Brand,
        Horsepower: req.body.Horsepower,
        Cylinders: req.body.Cylinders,
        Year_made: req.body.Year_made,
        Engine: req.body.Engine,
        Electric: req.body.Electric
      });
    await cars.save();
    res.redirect('/allcars')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-cars', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
};