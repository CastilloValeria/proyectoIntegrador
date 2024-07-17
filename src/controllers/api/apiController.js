const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const db = require("../../database/models");
const { log } = require("console");
const { Json } = require("sequelize/lib/utils");

const apiControllers = {
    productDetail:async(req, res)=> {
    try {
        const { id } = req.params;
        const product= await db.Product.findByPk(id, {
        include: {association: "Images"}
        }) 
        if(!product){
            throw new Error("el id ingresado no coincide con ningun producto existente")
        }
        return res.status(200).send(product);
        
    } catch (error) {
        console.log("----->Error:",error);
        res.status(400).send(error.message)
    }
    },

    // create: async function (req, res) {
    // const { titulo, description, price, brand } = req.body;

    // try {
    //   const brands = await db.Brand.create({
    //     name: brand,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });

    //   const descript = await db.Description.create({
    //     name: description,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });

    //   const product = {
    //     titulo,
    //     description_id: descript.id,
    //     brand_id: brands.id,
    //     price,
    //   };
    //   const productos = await db.Product.create(product);

    //   if (req.files) {
    //     await db.Image.create({
    //       name: req.files[0].filename,
    //       path: null,
    //       product_id: productos.id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });
    //   }

    //   const imagenproduct = await db.Product.findByPk(productos.id, {
    //     include: [{ association: "Images" }],
    //   });

    //   return res.status(200).send(product);
    // } catch (error) {
    //   console.error(error);
    //   res.status(400).send(error.message) 
    // }
    // },
    create: async function (req, res) {
        const { titulo,discount, description, price, brand } = req.body;
        console.log(description, "aqui va la descripcion");
        try {
          const product = {
            titulo,
            discount:+discount,
            description: JSON.parse(description),
            brand_id: brand,
            price,
          };
    
          const producto = await db.Product.create(product);
          
          if (req.files) {
            req.files.forEach( async (file) => {
              await db.Image.create({
                name: file.filename,
                path: null,
                product_id: producto.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            });
          }
    
          res.status(200).send(producto);
        } catch (error) {
          console.error(error);
        }
      },
    products:async (req, res) => {
        let{limit=10,page=1}= req.query;
        limit= parseInt(limit)
        const offset= limit *(parseInt (page-1));
        try {
            const product= await db.Product.findAll({
              include:[
              {
                association: "Images",
            },
            {
              association: "brands",
          }],
            })
            return res.status(200).send(product);
            
        } catch (error) {
            console.log("----->Errorenlistado:",error);
            res.status(400).send(error.message) 
        }

    },
    lastProduct: async (req, res) => {
      try {
        const latestProduct = await db.Product.findOne({
          order: [['createdAt', 'DESC']], 
          limit: 1, 
          include: [
            { association: "Images" },
            { association: "brands" },
          ],
        });
    
        if (!latestProduct) {
          return res.status(400).send({ message: 'No products found' }); 
        }
    
        return res.status(200).send(latestProduct);
      } catch (error) {
        console.error("Error latest product:", error);
        res.status(500).send({ message: 'Internal Server Error' }); 
      }
    },

    destroy: async (req, res) => {
    const id = parseInt( req.params.id);
        try {
            if(!Number.isInteger(id)){
                throw new Error('Los ID corresponde a numeros enteros, ingrese el valor correcto')
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
                        })
                        ;res.status(200).send("El producto ID fue eliminado");
                    }else{
                    throw new Error("El ID indicado no corresponde a un producto existente")
                    }
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    editProduct:async (req, res) => {
    const { id } = req.params;

    const { titulo, brand, description, image, price } = req.body;

    try {
      const product =await db.Product.update(
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
          )
          const image=await db.Image.update(
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
      console.log("----->ErroreneditProduct:",error);
      res.status(400).send(error.message) 
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
deleteProductCart: async(req,res)=>{
  try {
    const id= req.params.id;
    await db.Cart.destroy({where:{product_id:id}});
    res.status(200).send("ok");
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send('Error al eliminar el producto');
  }
}
}
module.exports = apiControllers;
