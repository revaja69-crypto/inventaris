const btnTambah = document.querySelector('#btnTambah');
const inputNama = document.querySelector('#namaBarang');
const inputJumlah = document.querySelector('#jumlahBarang');
const inputCari = document.querySelector('#inputCari');
const tabelBody = document.querySelector('#tabelInventaris tbody');

// Fungsi utama: Menambah atau Memperbarui Barang
btnTambah.addEventListener('click', function() {
    const nama = inputNama.value.trim();
    const jumlah = parseInt(inputJumlah.value);

    if (nama === '' || isNaN(jumlah)) {
        alert('Tolong isi nama dan jumlah yang benar!');
        return;
    }

    const semuaBaris = tabelBody.querySelectorAll('tr');
    let sudahAda = false;

    // Cek apakah barang sudah ada di tabel
    semuaBaris.forEach(function(baris) {
        if (baris.cells[0].textContent.toLowerCase() === nama.toLowerCase()) {
            const jumlahLama = parseInt(baris.cells[1].textContent);
            baris.cells[1].textContent = jumlahLama + jumlah;
            sudahAda = true;
        }
    });

    if (!sudahAda) {
        buatBarisBaru(nama, jumlah);
    }

    // Reset input agar bersih kembali
    inputNama.value = '';
    inputJumlah.value = '';
});

// Fungsi pembantu: Membuat elemen baris tabel
function buatBarisBaru(nama, jumlah) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${nama}</td>
        <td>${jumlah}</td>
        <td><button class="btn-hapus">Hapus</button></td>
    `;

    // Pasang fungsi hapus pada tombol di baris tersebut
    tr.querySelector('.btn-hapus').addEventListener('click', function() {
        tr.remove();
    });

    tabelBody.appendChild(tr);
}

// Fitur Pencarian Langsung
inputCari.addEventListener('keyup', function() {
    const kataKunci = inputCari.value.toLowerCase();
    const semuaBaris = tabelBody.querySelectorAll('tr');

    semuaBaris.forEach(function(baris) {
        const namaBarang = baris.cells[0].textContent.toLowerCase();
        baris.style.display = namaBarang.includes(kataKunci) ? '' : 'none';
    });
});