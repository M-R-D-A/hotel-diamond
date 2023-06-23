const models = require('../../models/index');

const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const pemesanan = models.pemesanan;
const kamar = models.kamar;
const tipeKamar = models.tipe_kamar;
const detailPemesanan = models.detail_pemesanan;
const kamarDipesan = models.kamar_dipesan;

module.exports = {
    controllerGetAll: async (req, res) => {
        try {
            await pemesanan
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
            const user = await pemesanan.findOne({
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
        const id = uuidv4();
        const random_number = Math.floor(Math.random() * 900000) + 100000;
        let data = {
            id: id,
            nomor_pemesanan: random_number,
            nama_pemesan: req.body.nama_pemesan,
            email_pemesan: req.body.email_pemesan,
            tgl_pemesanan: req.body.tgl_pemesanan,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            nama_tamu: req.body.nama_tamu,
            jumlah_kamar: req.body.jumlah_kamar,
            status_pemesanan: req.body.status_pemesanan,
            user_id: req.body.user_id
        };

        pemesanan.create(data)
            .then(async (result) => {
                if (result) {

                }
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

    controllerBooking: async (req, res) => {
        const id = uuidv4();
        const random_number = Math.floor(Math.random() * 900000) + 100000;
        let data = {
            id: id,
            nomor_pemesanan: random_number,
            nama_pemesan: req.body.nama_pemesan,
            email_pemesan: req.body.email_pemesan,
            tgl_pemesanan: req.body.tgl_pemesanan,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            nama_tamu: req.body.nama_tamu,
            status_pemesanan: req.body.status_pemesanan,
            user_id: req.body.user_id
        };

        pemesanan.create(data)
            .then(async (result) => {
                if (result) {
                    const idPemesanan = result.id;
                    const idTipeKamar = req.body.id_tipe_kamar;
                    const jumlahKamar = req.body.jumlah_kamar;

                    for (let i = 0; i < idTipeKamar.length; i++) {
                        const id = idTipeKamar[i];
                        const jumlah = jumlahKamar[i];

                        tipeKamar.findOne({
                            where: {
                                id: id
                            }
                        })
                            .then((result) => {
                                console.log("nama tipe : " + result.nama);
                                const hargaKamar = result.harga;
                                const harga = parseInt(hargaKamar.replace(/\./g, ""));
                                const totalHarga = jumlah * harga
                                console.log("total harga : " + totalHarga);

                                let data = {
                                    pemesanan_id: idPemesanan,
                                    tipe_kamar_id: id,
                                    jumlah_kamar: jumlah,
                                    total_harga: totalHarga
                                }

                                detailPemesanan.create(data)
                                    .then((result) => {
                                        const idDetailPemesanan = result.id
                                        kamar.findAll({
                                            where: {
                                                tipe_kamar_id: id,
                                            },
                                            include: [
                                                {
                                                    model: kamarDipesan,
                                                    as: "kamar_dipesan",
                                                    required: false,
                                                    where: {
                                                        tgl_akses: {
                                                            [Op.or]: {
                                                                [Op.lt]: req.body.check_in,
                                                                [Op.gt]: req.body.check_out,
                                                            },
                                                        },
                                                    },
                                                }
                                            ]
                                        })
                                            .then((result) => {
                                                if (result) {
                                                    for (let b = 0; b < jumlah; b++) {
                                                        const idKamar = result[b].id
                                                        console.log(result[b].id)
                                                        const startDate = new Date(req.body.check_in);
                                                        const endDate = new Date(req.body.check_out);
                                                        const dates = [];
                                                        for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
                                                            dates.push(new Date(date));
                                                        }
                                                        for (let j = 0; j < dates.length; j++) {
                                                            let data = {
                                                                detail_pemesanan_id: idDetailPemesanan,
                                                                kamar_id: idKamar,
                                                                tgl_akses: dates[j]
                                                            }

                                                            kamarDipesan.create(data)
                                                                .then((result) => {
                                                                    console.log("berhasil berhasil")
                                                                })
                                                        }
                                                    }
                                                }
                                            })

                                    })
                            })
                    };

                }
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
        const random_number = Math.floor(Math.random() * 900000) + 100000;
        try {
            let data = {
                nomor_pemesanan: random_number,
                nama_pemesan: req.body.nama_pemesan,
                email_pemesan: req.body.email_pemesan,
                tgl_pemesanan: req.body.tgl_pemesanan,
                check_in: req.body.check_in,
                check_out: req.body.check_out,
                nama_tamu: req.body.nama_tamu,
                jumlah_kamar: req.body.jumlah_kamar,
                status_pemesanan: req.body.status_pemesanan,
                user_id: req.body.user_id
            };
            let id = { id: req.params.id };
            pemesanan
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

            pemesanan
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