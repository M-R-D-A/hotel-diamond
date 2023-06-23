require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static(__dirname))

const Users = require('./src/api/users/user.router');
app.use(('/api/user'), Users);

const Auth = require('./src/api/authentication/auth.router');
app.use('/api/auth', Auth);

const tipeKamar = require('./src/api/tipe kamar/tipe_kamar.router');
app.use('/api/tipe_kamar', tipeKamar);

const fasilitas = require('./src/api/fasilitas/fasilitas.router');
app.use('/api/fasilitas', fasilitas);

const kamar = require('./src/api/kamar/kamar.router');
app.use('/api/kamar', kamar);

const pemesanan = require('./src/api/pemesanan/pemesanan.router');
app.use('/api/pemesanan', pemesanan)

app.listen(PORT, () => {
    console.log('server run on port ' + PORT)
})