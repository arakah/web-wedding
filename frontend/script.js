// NAVBAR
document.querySelector('.btn.btn-lg').addEventListener('click', function () {
    document.getElementById('mainNavbar').classList.add('visible');
 });
 

window.addEventListener('scroll', function () {
    const mainNavbar = document.getElementById('mainNavbar');
    if (window.scrollY > 200) {
        mainNavbar.classList.add('visible');
    } else {
        mainNavbar.classList.remove('visible');
    }
});


// HALAMAN PETA
document.addEventListener('DOMContentLoaded', () => {
  const showMapBtn = document.getElementById('showMapBtn');

  showMapBtn.addEventListener('click', () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
          // URL untuk membuka Google Maps langsung di aplikasi
          const location = "Ballroom Hotel XX, Jalan Sejahtera No. XX, Jakarta";
          window.location.href = `geo:0,0?q=${encodeURIComponent(location)}`;
      } else {
          // URL untuk membuka Google Maps di browser desktop (pop-up)
          const mapUrl = "https://www.google.com/maps?q=Ballroom+Hotel+XX,+Jalan+Sejahtera+No.+XX,+Jakarta";
          const popupWidth = 800;
          const popupHeight = 600;
          const left = (window.screen.width / 2) - (popupWidth / 2);
          const top = (window.screen.height / 2) - (popupHeight / 2);

          window.open(mapUrl, "GoogleMapPopup", `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=no,resizable=no`);
      }
  });
});


// POP UP RESERVASI
// Elemen DOM
const openFormButton = document.getElementById('openFormButton');
const formPopup = document.getElementById('formPopup');
const cancelButton = document.getElementById('cancelButton');
const popupForm = document.getElementById('popupForm');
const kirim = document.getElementById('kirim');
const loading = document.getElementById('loading');

// Buka popup formulir
openFormButton.addEventListener('click', () => {
    formPopup.style.display = 'block';
});

// Tutup popup formulir
cancelButton.addEventListener('click', () => {
    formPopup.style.display = 'none';
});

// Tutup popup jika mengklik di luar konten
window.addEventListener('click', (event) => {
    if (event.target === formPopup) {
        formPopup.style.display = 'none';
    }
});

// Tangani pengiriman formulir
kirim.addEventListener('click', async (event) => {
    event.preventDefault(); // Hentikan perilaku default pengiriman formulir

    // Ambil data dari formulir
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        ucapan: document.getElementById('message').value.trim(),
    };

    // Tampilkan animasi loading
    loading.style.display = 'block';
    kirim.disabled = true; // Nonaktifkan tombol Kirim saat loading

    try {
        // Kirim data ke backend
        const response = await fetch('http://localhost:3001/api/confirms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Formulir berhasil dikirim!');
            formPopup.style.display = 'none'; // Tutup popup
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
        // Sembunyikan animasi loading dan aktifkan kembali tombol
        loading.style.display = 'none';
        kirim.disabled = false;
    }
});


// HALAMAN HADIAH
// Select buttons and popups
const tunaiButton = document.getElementById("tunaiButton");
const nonTunaiButton = document.getElementById("nonTunaiButton");
const tunaiPopup = document.getElementById("tunaiPopup");
const nonTunaiPopup = document.getElementById("nonTunaiPopup");

// Handle the "Tunai" button click
tunaiButton.addEventListener("click", () => {
  tunaiPopup.style.display = "block"; // Show the Tunai popup
  nonTunaiPopup.style.display = "none"; // Hide the Non-Tunai popup
});

// Handle the "Non-Tunai" button click
nonTunaiButton.addEventListener("click", () => {
  nonTunaiPopup.style.display = "block"; // Show the Non-Tunai popup
  tunaiPopup.style.display = "none"; // Hide the Tunai popup
});

// Handle "Batal" buttons in both popups
const cancelButtons = document.querySelectorAll(".btn-cancel");
cancelButtons.forEach((cancelButton) => {
  cancelButton.addEventListener("click", () => {
    tunaiPopup.style.display = "none"; // Hide the Tunai popup
    nonTunaiPopup.style.display = "none"; // Hide the Non-Tunai popup
  });
});


// MUSIK
const audioPlayer = document.getElementById('audioPlayer');
const muteIcon = document.getElementById('muteIcon');
const unmuteIcon = document.getElementById('unmuteIcon');

// Ensure the audio plays automatically (muted initially for autoplay to work)
window.addEventListener('load', () => {
    audioPlayer.muted = false; // Unmute after the page has loaded (so autoplay works)
    audioPlayer.play().catch((error) => {
        console.log("Autoplay blocked, but the user can start it manually.");
    });
});

// Function to mute the audio and pause it
function toggleMute() {
    audioPlayer.pause(); // Pause the audio
    audioPlayer.muted = true; // Mute the audio
    muteIcon.style.display = 'none'; // Hide mute icon
    unmuteIcon.style.display = 'inline'; // Show unmute icon
}

// Function to unmute the audio and play it
function toggleUnMute() {
    audioPlayer.muted = false; // Unmute the audio
    audioPlayer.play(); // Play the audio
    unmuteIcon.style.display = 'none'; // Hide unmute icon
    muteIcon.style.display = 'inline'; // Show mute icon
}





