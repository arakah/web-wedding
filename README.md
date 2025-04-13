1. Start server side nya
cd backend
npm run dev

all good, jika output:
Server started at http://localhost:3000
(node:14588) [SEQUELIZE0006] DeprecationWarning: This database engine version is not supported, please update your database server. More information https://github.com/sequelize/sequelize/blob/main/ENGINE.md
(Use `node --trace-deprecation ...` to show where the warning was created)
Koneksi ke database berhasil.
Tabel 'confirms' berhasil disinkronkan.

2. tes api di thunder client/postman

3. database ada di file .env, di folder backend

4. table confirms
- id, name, email, ucapan, status (hadir/tidak hadir), timestamp(opsional), qr_code(msh error)

## konsep halaman di admin
1. isinya tabel confirms (id, name, email, ucapan, status)
2. bisa tambah user sendiri buat user yang gaptek
3. bisa ganti2 status (hadir/tidak hadir)

klo ga ada fitur qrcode
- tambah search bar
search bar buat admin nyari email user, klo ada, bisa ganti status jadi hadir (manual)
- di email, ilangin fungsi qrcode, tambah kata2 "tunjukkan email ini ke admin untuk konfirmasi kehadiran" atau kata2 lain
n