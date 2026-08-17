// 1. Fitur Dark Mode
const toggleButton = document.getElementById('toggleDarkMode');
const bodyElement = document.body;

toggleButton.addEventListener('click', function() {
    // Menambah atau menghapus class 'dark-mode' pada body
    bodyElement.classList.toggle('dark-mode');
    
    // Mengubah teks dan warna tombol berdasarkan mode yang sedang aktif
    if (bodyElement.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '☀️ Light Mode';
        toggleButton.classList.replace('btn-outline-light', 'btn-outline-warning');
    } else {
        toggleButton.innerHTML = '🌙 Dark Mode';
        toggleButton.classList.replace('btn-outline-warning', 'btn-outline-light');
    }
});

// 2. Form Validation & Alert Submit
const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman agar tidak me-refresh setelah disubmit
    
    // Mengambil nilai dari input 'Nama Lengkap'
    const nama = document.getElementById('namaLengkap').value;
    
    // Menampilkan pesan pop-up
    alert(`Terima kasih, ${nama}! Pendaftaran Anda telah kami terima. Tim EduTech akan segera menghubungi Anda.`);
    
    // Mengosongkan form setelah berhasil disubmit
    form.reset();
});