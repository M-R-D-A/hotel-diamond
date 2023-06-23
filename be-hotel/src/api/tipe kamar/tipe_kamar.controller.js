const models = require('../../models/index');
const tipeKamar = models.tipe_kamar;
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = {
    controllerGetAll: async (req, res) => {
        try {
          await tipeKamar
            .findAll({
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
          const user = await tipeKamar.findOne({
            where: {
              id: req.params.id,
            },
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
    
        let data = {
          nama: req.body.nama,
          harga: req.body.harga,
          deskripsi: req.body.deskripsi
        };
    
        tipeKamar.create(data)
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
        try {
            let data = {
                nama: req.body.nama,
                harga: req.body.harga,
                deskripsi: req.body.deskripsi
              };
            let id = { id: req.params.id };
            tipeKamar
              .update(data, { where: id })
              .then((result) => {
                res.json({
                  status: true,
                  message: result + " data was updated",
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
    
      controllerDelete: async (req, res) => {
        try {
          let id = { id: req.params.id };
    
          tipeKamar
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
}