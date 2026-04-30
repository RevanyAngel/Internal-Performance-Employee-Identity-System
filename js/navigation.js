document.addEventListener("DOMContentLoaded", () => {

    const listItems = document.querySelectorAll('.list');
    const bottomNav = document.querySelector('.bottom-nav');

    // FUNGSI PEMBANTU: Ambil ikon aktif/inaktif dari data-attribute
    function getImgSrc(imgEl, state) {
        return imgEl.getAttribute('data-' + state) || imgEl.src;
    }

    // INISIALISASI AWAL: Set posisi indikator TANPA animasi
    // Blokir animasi dulu
    if (bottomNav) {
        bottomNav.classList.add('no-transition');
    }

    listItems.forEach((item) => {
        if (item.classList.contains('active')) {
            const img = item.querySelector('img');
            if (img) {
                img.src = getImgSrc(img, 'active');
            }
            const index = item.getAttribute('data-index');
            if (bottomNav && index !== null) {
                bottomNav.style.setProperty('--active-index', index);
            }
        }
    });

    // Setelah posisi di-set, aktifkan kembali transisi
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (bottomNav) {
                bottomNav.classList.remove('no-transition');
            }
        });
    });

    // EVENT LISTENER: Klik pada setiap item navigasi
    listItems.forEach((item) => {
        item.addEventListener('click', function (e) {
            const link = this.querySelector('a');
            const href = link ? link.getAttribute('href') : null;
            const isNavigating = href && href !== '#';

            if (isNavigating) {
                e.preventDefault();
            }

            // Reset semua item ke kondisi inaktif
            listItems.forEach((i) => {
                i.classList.remove('active');
                const img = i.querySelector('img');
                if (img) {
                    img.src = getImgSrc(img, 'inactive');
                }
            });

            // Aktifkan item yang diklik
            this.classList.add('active');
            const activeImg = this.querySelector('img');
            if (activeImg) {
                activeImg.src = getImgSrc(activeImg, 'active');
            }

            // Geser indikator lingkaran hijau
            const index = this.getAttribute('data-index');
            if (bottomNav && index !== null) {
                bottomNav.style.setProperty('--active-index', index);
            }

            // Pindah halaman setelah animasi selesai
            if (isNavigating) {
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

});