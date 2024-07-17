const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { validationResult } = require("express-validator");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const detailcontrollers = {
  productDetail: function (req, res) {
    const { id } = req.params;
    db.Product.findByPk(id, {
      include: [
        {
          association: "Images",
        },
        {
          association: "brands",
        },
      ],
    })
      .then((products) => {
        res.render("products/productDetail", {
          title: "Product detail",
          products,
          toThousand,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // revisar
  productCart: function (req, res) {
    let product = db.Product.findByPk(req.params.id, {
      include: [
        {
          association: "Images",
        },
      ],
    });
    Promise.all([product])
      .then(([product]) => {
        return res.render("products/productCart", {
          product,
          usuario: req.session.user,
          title: "Carrito",
        });
      })
      .catch((error) => console.log(error));
  },

  productcreate: function (req, res) {
    res.render("products/productcreate", { title: "productcreate" });
  },

  dashboard: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "Images",
        },
      ],
      where: {
        id: { [Op.ne]: req.session.user.id },
      },
    })
      .then((products) => {
        res.render("products/dashboard", {
          title: "Dashboard",
          products,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  formCreate: async (req, res) => {
    const brands = await db.Brand.findAll();
    res.render("products/createProduct", {
      title: "Create Product",
      usuario: req.session.user,
      brands,
    });
  },

  formEdit: (req, res) => {
    const { id } = req.params;
    db.Product.findByPk(id, {
      include: [
        {
          association: "brands",
        },
        // {
        //   association:"descriptions"
        // }
      ],
    })

      .then((product) => {
        console.log("ESTE ES EL PRODUCTO DEL FORM EDIT: ", product);
        res.render("products/editProduct", {
          title: db.Product.titulo,
          product,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  create: async function (req, res) {
    const { titulo, discount, description, price, brand } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("products/createProduct", {
        title: "Create Product",
        usuario: req.session.user,
        errors: errors.mapped(),
        old: req.body,
      });
    } else {
      try {
        const brands = await db.Brand.create({
          name: brand,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const descript = await db.Description.create({
          name: description,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const product = {
          titulo,
          description_id: descript.id,
          brand_id: brands.id,
          discount,
          price,
        };
        const productos = await db.Product.create(product);

        if (req.files) {
          await db.Image.create({
            name: req.files[0].filename,
            path: null,
            product_id: productos.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        const imagenproduct = await db.Product.findByPk(productos.id, {
          include: [{ association: "Images" }],
        });

        res.redirect("/products/dashboard");
      } catch (error) {
        console.error(error);
      }
    }
  },
  productofertas: (req, res) => {
    let { limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    const offset = limit * parseInt(page - 1);
    db.Product.findAll({
      include: [
        {
          association: "Images",
        },
        {
          association: "brands",
        },
      ],
      limit,
      offset,
    })
      .then((products) => {
        res.render("products/productsoferta", {
          title: "ElectroGroup",
          products,
          toThousand,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  products: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "Images",
        },
        {
          association: "brands",
        },
      ],
    })
      .then((products) => {
        res.render("products/productsGeneral", {
          title: "ElectroGroup",
          products,
          toThousand,
          usuario: req.session.user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  formUpdate: (req, res) => {
    const { id } = req.params;

    db.Products.findByPk(id)
      .then((product) => {
        res.render("products/createProduct", {
          title: product.nombre,
          product,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    await db.Image.destroy({
      where: { product_id: id },
    });

    await db.Product.destroy({
      where: { id },
    });

    res.redirect("/products/dashboard");
  },

  editProduct: (req, res) => {
    const { id } = req.params;

    const { titulo, discount, brand, description, image, price } = req.body;
    db.Product.update(
      {
        titulo,
        brand,
        discount,
        price,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: { id },
      }
    )
      .then((resp) => {
        db.Image.update(
          {
            name: req.files ? req.files[0].filename : image,
            path: null,
            product_id: resp.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            where: { product_id: id },
          }
        );
      })
      .then(() => {
        res.redirect("/products/dashboard");
      })
      .catch((error) => console.log(error));
  },
//   cart: (req, res) => {
//     res.render("products/productCart", { title: "Carrito de compra", usuario: req.session.user });
// },
  cart: async (req, res) => {
    const products = await db.Cart.findAll({
      where: { user_id: req.session.user.id },
      include: { association: "product" , include: [{ association: "Images" }]},
    });

    const total = products.reduce((acumulador,curretValue) => acumulador + (curretValue.product.price * curretValue.count), 0)
    const totalProducts = products.reduce((acumulador,curretValue) => acumulador + ((curretValue.count + curretValue.count)/2), 0)
    res.render(("products/productCart"),{title: "ElectroGroup",products ,total,totalProducts, usuario: req.session.user,});
    // res.send({products,total,totalProducts})
  },
};
module.exports = detailcontrollers;
