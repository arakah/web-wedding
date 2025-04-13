import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Define __dirname untuk modul ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi transporter untuk Nodemailer
const transporter = nodemailer.createTransport({
    service: "Zoho",
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
    },
    requireTLS: true,
});

// Fungsi untuk mengirim email
export const send = async ({ to, subject, template, data }) => {
    try {
        // Render template dengan data yang diterima
        const emailContent = await render(template, data);

        // Kirim email dengan konten HTML yang dirender
        const result = await transporter.sendMail({
            from: process.env.USER_MAIL,
            to,
            subject,
            html: emailContent,
        });

        console.log("Email berhasil dikirim ke:", to);
        return result;
    } catch (error) {
        console.error("Gagal mengirim email:", error);
        throw new Error("Pengiriman email gagal.");
    }
};

// Fungsi untuk merender template EJS
export const render = async (template, data) => {
    try {
        const content = await ejs.renderFile(
            path.join(__dirname, `templates/${template}`),
            data
        );

        return content;
    } catch (error) {
        console.error("Gagal merender template:", error);
        throw new Error("Merender template gagal.");
    }
};
