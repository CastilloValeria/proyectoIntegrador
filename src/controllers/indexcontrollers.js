const fs = require("fs");
const path = require("path");
const db = require('../database/models')
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const indexcontrollers = {
  home: function (req, res) {
    let{limit=5,page=1}= req.query;
        limit= parseInt(limit)
        const offset= limit *(parseInt (page-1));
    db.Product.findAll({
      include:
            [{
                association: "Images"
            },{
              association: "brands",
            },],limit , offset
    } )
    .then( (product)=>{
      res.render("index", { title: "ElectroGroup",toThousand,product,usuario:req.session.user });
    })
    .catch(error => {
      console.log(error);
  });
    
  },
  about: function (req, res) {
    res.render("../views/links footer/quienes.ejs", { title: "about" });
  },
  contact: function (req, res) {
    res.render("../views/links footer/contactano.ejs", { title: "contactactanos"});
  },
  search:  (req, res) => {
    const {keywords} = req.query;
    let productsSearch = db.Product.findAll({
      where : {
        [Op.or] : [
         
          {
            titulo: {
              [Op.substring]: keywords
            }
          },
          {
            price: {
              [Op.substring]: keywords
            }
          },
        ]
      },
      include: [
        {
          association: "Images",
        },
        {
          association: "brands",
        },
      ]
    })  
        Promise.all([productsSearch])
      .then(([products]) => {
        return res.render('search', {
          title: "Resultados",
          products : products,
          keywords,toThousand,usuario:req.session.user 
        })
      })
      .catch(error => console.log(error))
},
sucursales: function (req, res) {
  res.render("../views/links footer/sucursales.ejs", { title: "sucursales" });
},
term: function (req, res) {
  res.render("../views/links footer/baseycond.ejs", { title: "Bases y Condiciones" });
},
pregu: function (req, res) {
  res.render("../views/links footer/preguntaF.ejs", { title: "Preguntas Frecuentes" });
},
garantia: function (req, res) {
  res.render("../views/links footer/garantias.ejs", { title: "Garantias" });
}
}

module.exports = indexcontrollers;
