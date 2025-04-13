import { Confirm } from "../utils/db.js";
import { send } from "../utils/mail/mail.js";
import QRCode from "qrcode";

// POST confirms (create)
export const createConfirm = async (req, res) => {
    const { email, name, ucapan } = req.body;

    if (!email || !name || !ucapan) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        // Buat data unik untuk QR Code
        const uniqueData = `${email}-${Date.now()}`; // Kombinasi email dan timestamp

        // Generate QR Code
        const qrCode = await QRCode.toDataURL(uniqueData);

        console.log(qrCode);

        // Buat konten email dengan template
        const emailData = {
            username: name,
            contactEmail: "faraaysa@zohomail.com",
            companyName: "Pernikahan A & B",
            year: new Date().getFullYear(),
            qrCode, // Tambahkan QR Code ke email
        };

        // Kirim email
        await send({
            to: email,
            subject: "Konfirmasi Kehadiran Pernikahan",
            template: "confirm.ejs",
            data: emailData,
        });

        // Simpan data ke database
        const newConfirm = await Confirm.create({
            email,
            name,
            ucapan,
            qr_code: uniqueData, // Simpan data unik QR Code
            status: "tidak hadir", // Default status
        });

        res.status(201).json({ success: true, data: newConfirm });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET confirms (read)
export const getConfirms = async (req, res) => {
    try {
        const confirms = await Confirm.findAll(); // Ambil semua data
        res.status(200).json({ success: true, data: confirms });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT confirms (update)
export const updateConfirm = async (req, res) => {
    const { id } = req.params;
    const confirms = req.body;

    try {
        // Perbarui data berdasarkan ID
        const updatedConfirm = await Confirm.update(confirms, {
            where: { id },
        });

        if (!updatedConfirm[0]) {
            return res.status(404).json({ success: false, message: "Confirm not found" });
        }

        const updatedData = await Confirm.findByPk(id); // Ambil data yang diperbarui
        res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE confirms (delete)
export const deleteConfirm = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedConfirm = await Confirm.destroy({
            where: { id },
        });

        if (!deletedConfirm) {
            return res.status(404).json({ success: false, message: "Confirm not found" });
        }

        res.status(200).json({ success: true, message: "Confirm is deleted" });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

