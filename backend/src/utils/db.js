import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT, 
        dialect: "mysql", 
        logging: false, 
    }
);

// Define the Confirm model
const Confirm = sequelize.define("Confirm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ucapan: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("hadir", "tidak hadir"),
        defaultValue: "tidak hadir",
    },
    qr_code: {
        type: DataTypes.STRING, // Menyimpan data unik QR Code (contoh: ID atau email)
        allowNull: false,
        unique: true, // Pastikan tidak ada duplikasi
    },
}, {
    timestamps: true,
    tableName: "confirms",
});

// Function to connect and sync models
export const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("Koneksi ke database berhasil.");

        // Sync the Confirm model
        await Confirm.sync({ alter: true }); // Use alter to adjust table structure if necessary
        console.log("Tabel 'confirms' berhasil disinkronkan.");
    } catch (error) {
        console.error("Gagal terkoneksi ke database:", error);
    }
};

export { sequelize, Confirm };
