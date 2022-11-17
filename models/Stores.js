import { DataTypes } from "sequelize";
import db from '../config/db_config.js';

const Profiles = db.define('Profiles', {
    idToko: {
        type: DataTypes.STRING
    },
    namaToko: {
        type: DataTypes.STRING
    },
    nomorTelpon: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    alamatTokoUtama: {
        type: DataTypes.STRING
    },
    provinsi: {
        type: DataTypes.STRING
    },
    kota: {
        type: DataTypes.STRING
    },
    kodePos: {
        type: DataTypes.STRING
    },
    industri: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Profiles.sync();

export default Profiles;