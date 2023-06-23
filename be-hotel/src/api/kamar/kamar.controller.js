const models = require('../../models/index');
const kamar = models.kamar;

module.exports = {
    controllerGetAll: async (req, res) => {
        try {
          await kamar
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
          const user = await kamar.findOne({
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
          nomor: req.body.nomor,
          tipe_kamar_id: req.body.tipe_kamar_id
        };
    
        kamar.create(data)
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
                nomor: req.body.nomor,
                tipe_kamar_id: req.body.tipe_kamar_id
              };
            let id = { id: req.params.id };
            kamar
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
    
          kamar
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