const db = require("../database/models");
const { Op, DATE } = require("sequelize");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { imageProfile } = require("./api/apiUserController");
const { parse } = require("@formkit/tempo");

const usercontrollers = {
  login: function (req, res) {
    res.render("users/login", { title: "login" });
  },
  dashboard: (req, res) => {
    db.User.findAll({
      include: [
        {
          association: "Rols",
        },
      ],
    })
      .then((user) => {
        res.render("users/dashboard", {
          title: "Dashboard",
          user,
          usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logout: (req, res) => {
    req.session.destroy();
    if (req.cookies.user) {
      res.clearCookie("user");
      res.clearCookie("remember");
    }
    res.redirect("/");
  },
  processlogin: (req, res) => {
    const errors = validationResult(req);
    // res.send(errors)
    if (!errors.isEmpty()) {
      res.render("users/login", { errors: errors.mapped(), old: req.body });
    } else {
      const { email } = req.body;
      db.User.findOne({
        attributes: { exclude: ["password"] },
        where: { email },
      })
        .then((user) => {
          req.session.user = user.dataValues;

          if (req.body.remember == "true") {
            res.cookie("user", user.dataValues, { maxAge: 1000 * 60 });
            res.cookie("rememberMe", "true", { maxAge: 1000 * 60 * 15 });
          }
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  profile: (req, res, next) => {
    const { id } = req.params;
    db.User.findByPk(id, {
      include: [
        {
          association: "Rols",
        },
      ],
    })
      .then((user) => {
        res.render("./users/profile", {
          title: "Perfil de usuario",
          user,
          usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  register: function (req, res) {
    res.render("users/register", {
      title: "register",
      usuario: req.session.user,
    });
  },
  createUser: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Ingrese en errors");
      res.render("users/register", { errors: errors.mapped(), old: req.body });
    } else {
      const { nombre, email, age, password } = req.body;
      db.User.create({
        username: nombre,
        email,
        birthday: age,
        genre: "no definido",
        rol_id: 2,
        avatar: req.file ? req.file.filename : null,
        password: bcrypt.hashSync(password, 10),
      })
        .then((user) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  },
  formProfile: (req, res, next) => {
    const { id } = req.params;

    db.User.findByPk(id, {
      include: [
        {
          association: "Rols",
        },
        {
          association: "Adress",
        },
        {
          association: "Contacts",
        },
      ],
    })
      .then((user) => {
        console.log(user, "aqui va usuario");
        if (user.birthday) {
          const birthday = user.birthday;
          console.log("tipo: ", typeof birthday);
          user.birthday = parse({
            date: birthday,
            format: "YYYY-MM-DD",
          });
        }

        // console.log("ESTO ES USER DEL EDIT ",user);

        // res.send(user)
        res.render("./users/userEdition", {
          title: "editar usuario",
          user,
          usuario: req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  profileEdited: async function (req, res) {
    try {
      const { id } = req.params;
      const { nombre, email, direction, phone, genre, rol, age, avatar } =
        req.body;

      console.log("update: ", req.body);
      const domicilio = await db.Adress.findOne({ where: { user_id: id } });
      const contacto = await db.Contact.findOne({ where: { user_id: id } });

      if (domicilio) {
        domicilio.street = direction;
        await domicilio.save();
      } else {
        await db.Adress.create({ street: direction, user_id: id });
      }

      if (contacto) {
        contacto.phone = +phone;
        await contacto.save();
      } else {
        await db.Contact.create({ phone, user_id: id });
      }

      const user = await db.User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      (user.username = nombre), (user.email = email);
      (user.birthday = age),
        (user.genre = genre),
        (user.rol_id = rol),
        (user.avatar = req.file ? req.file.filename : avatar),
        (user.updatedAt = new Date()),
        await user.save();

      req.session.user = user;
      res.cookie("user", user, { maxAge: 1000 * 60 });
      res.redirect(`/users/profileEdit/${id}`);
    } catch (err) {
      console.error(err);
    }
  },

  destroy: (req, res) => {
    db.User.destroy({
      where: { id: req.params.id },
    })

      .then(() => {
        res.redirect("/users/dashboard");
      })
      .catch((err) => console.log(err));
  },
  imageProfile: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const imageProfile = await db.User.findByPk(id, {
      attributes: ["avatar"],
    });
    console.log(imageProfile);
    res.render("users/imageProfile", {
      image: imageProfile,
      title: "imagen de perfil de usuario",
    });
  },
};
module.exports = usercontrollers;
