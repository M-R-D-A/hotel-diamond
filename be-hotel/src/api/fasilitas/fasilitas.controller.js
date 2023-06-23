const models = require('../../models/index');
const fasilitas = models.fasilitas;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = {
  controllerGetAll: async (req, res) => {
    try {
      await fasilitas
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
      const user = await fasilitas.findOne({
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
      tipe_kamar_id: req.body.tipe_kamar_id,
      kasur: req.body.kasur,
      free_meal: req.body.free_meal,
      wifi: req.body.wifi,
      ac: req.body.ac,
      pemanas: req.body.pemanas,
      tv: req.body.tv, 
      alat_mandi: req.body.alat_mandi,
    };

    fasilitas.create(data)
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
        tipe_kamar_id: req.body.tipe_kamar_id,
        nama: req.body.nama,
      };
      let id = { id: req.params.id };
      fasilitas
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

      fasilitas
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