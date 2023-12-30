const models = require("../../models/index")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = models.users;

module.exports = {
  //endpoint untuk login web
  controllerWebLogin: async (req, res) => {
    //cari data user yang username dan password sama dengan input
    try {
      let result = await users.findAll({
        where: {
          nama: req.body.nama,
        },
      });
      if (result) {
        //ditemukan
        //set payload from data
        const match = await bcrypt.compare(req.body.password, result[0].password);
        if (!match) return res.status(400).json({ msg: "password salah" });
        if (result[0].id_role === "admin" || "manager" || "staff") {
          const idUser = result[0].id;
          const role = result[0].role;

          // generate token based on payload and secret_key
          let localToken = jwt.sign({ idUser, role }, process.env.ACCESS_TOKEN_SECRET);

          const data = await users.findAll({
            where: {
              nama: req.body.nama,
            },
          });
          res.json({
            logged: true,
            data: data[0],
            token: localToken,
          });
        } else {
          res.status(404).json({ msg: "Kamu Bukan Admin" });
        }
      } else {
        //tidak ditemukan
        res.json({
          logged: false,
          message: "Invalid username or password",
        });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },
}