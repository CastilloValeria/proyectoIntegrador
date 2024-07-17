const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../../database/models");

const apiControllers = {
  productDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await db.Product.findByPk(id, {
        include: { association: "Images" },
      });
      if (!product) {
        throw new Error(
          "el id ingresado no coincide con ningun producto existente"
        );
      }
      return res.status(200).send(product);
    } catch (error) {
      console.log("----->Error:", error);
      res.status(400).send(error.message);
    }
  },

  create: async function (req, res) {
    const { titulo, description, price, brand } = req.body;

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

      return res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  },

  products: async (req, res) => {
    let { limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    const offset = limit * parseInt(page - 1);
    try {
      const product = await db.Product.findAll({
        include: {
          association: "Images",
        },
        limit,
        offset,
      });
      return res.status(200).send(product);
    } catch (error) {
      console.log("----->Errorenlistado:", error);
      res.status(400).send(error.message);
    }
  },

  destroy: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      if (!Number.isInteger(id)) {
        throw new Error(
          "Los ID corresponde a numeros enteros, ingrese el valor correcto"
        );
      }
      const product = await db.Product.findOne({
        where: { product_id: id },
      });
      if (product) {
        fs.unlink(
          path.join(__dirname, `../../../public/img/${product.image}`),
          (err) => {
            if (err) throw err;
          }
        );
        await db.Product.destroy({
          where: { id },
        });
        res.status(200).send("El producto ID fue eliminado");
      } else {
        throw new Error(
          "El ID indicado no corresponde a un producto existente"
        );
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  editProduct: async (req, res) => {
    const { id } = req.params;

    const { titulo, brand, description, image, price } = req.body;

    try {
      const product = await db.Product.update(
        {
          titulo,
          brand,
          price,
          description,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          where: { id },
        }
      );
      const image = await db.Image.update(
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
      return res.status(200).send(product);
    } catch (error) {
      console.log("----->ErroreneditProduct:", error);
      res.status(400).send(error.message);
    }
  },

  addCart: async (req, res) => {
    const { user_id, product_id } = req.body;

    await db.Cart.create({
      user_id,
      product_id,
      count: 1,
    });

    res.status(200).send("ok");
  },
}

module.exports = apiControllers;
