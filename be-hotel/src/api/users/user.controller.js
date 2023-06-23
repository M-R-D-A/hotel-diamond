const models = require('../../models/index');
const users = models.users;
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = {
  controllerGetAll: async (req, res) => {
    try {
      await users
        .findAll({
          attributes: [
            "id",
            "role",
            "nama",
            "email",
            "kontak"
          ],
        })
        .then((result) => {
          res.json({
            status: true,
            message: "successful",
            data: result,
          });
        })
        .catch((error) => {
          res.json({
            message: error.message,
          });
        });
    } catch (error) {
      console.log(error);
    }
  },

  controllerGetbyId: async (req, res) => {
    try {
      const user = await users.findOne({
        where: {
          id: req.params.id,
        },
        attributes: [
          "id",
          "role",
          "nama",
          "email",
          "foto",
          "kontak",
        ],
      });
      res.json({
        status: true,
        message: "successful",
        data: user
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  },

  controllerAdd: async (req, res) => {
    const id = uuidv4();
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    let data = {
      id: id,
      nama: req.body.nama,
      role: req.body.role,
      email: req.body.email,
      password: hashPass,
      kontak: req.body.kontak
    };

    console.log(data)
    if (req.file) {
      try {
        // set new filename
        data.foto = req.file.filename;
      } catch (error) {
        res.json({
          message: error.message,
        });
      }
    } else {
      try {
        // set new filename
        data['foto'] = "default.png";
      } catch (error) {
        res.json({
          message: error.message,
        });
      }
    }
    users.create(data)
      .then(async (result) => {
        res.status(201).json({
          status: true,
          message: "data has been inserted",
          data: result,
          data,
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  },

  controllerEdit: async (req, res) => {
    const salt = await bcrypt.genSalt(12);

    const password = req.body.password == null ? 'check' : req.body.password
    const hash = await bcrypt.hash(password, salt);
    try {
      let param = {
        id: req.params.id,
      };
      let result = await users.findAll({
        where: param
      });
      if (result.length > 0) {
        let data = {
          nama: req.body.nama,
          password: hash,
          role: req.body.role,
          email: req.body.email,
          foto: req.file?.filename,
          kontak: req.body.kontak,
        };
        let dataNoPsw = {
          nama: req.body.nama,
          role: req.body.role,
          email: req.body.email,
          foto: req.file?.filename,
          kontak: req.body.kontak,
        };
        if (req.file) {
          const imagePath = localStorage + "/" + result[0].foto;
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('User image deleted successfully');
          });
          data.foto = req.file.filename;
        }
        await users
          .update(req.body.password == null ? dataNoPsw : data, { where: param })
          .then((result) => {
            const imagePath = "http://localhost:8080/image/";
            users
              .findOne({
                where: {
                  id: req.params.id
                },
              })
              .then((user) => {
                res.json({
                  data: user,
                  image: imagePath + user.foto
                });
              })
              .catch((error) => {
                res.json({
                  message: error.message,
                });
              });
          })
          .catch((error) => {
            res.json({
              message: error.message,
            });
          });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },

  controllerDelete: async (req, res) => {
    try {
      let id = { id: req.params.id };
      let result = await users.findOne({ where: id });

      if (result !== null) {
        let oldFileName = result.foto;

        if (oldFileName !== "default.png" || null) {
          //delete old file
          let dir = path.join(__dirname, "../../image/foto", oldFileName);
          fs.unlink(dir, (err) => console.log(err));
        }
      }

      users
        .destroy({ where: id })
        .then((result) => {
          res.json({
            status: true,
            message: result + " data was deleted",
            data: result
          });
        })
        .catch((error) => {
          res.json({
            message: error.message,
          });
        });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  },

  controllerGetImage: async (req, res) => {
    const { foto } = req.params;
    fs.readFile(`./src/image/foto/${foto}`, (err, data) => {
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
      });
      res.end(data);
    });
  },
};
