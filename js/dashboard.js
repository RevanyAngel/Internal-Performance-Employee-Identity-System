const listItems = document.querySelectorAll('.list');
const bottomNav = document.querySelector('.bottom-nav');

function activeLink() {
    // Menghapus class active dari semua list
    listItems.forEach((item) => item.classList.remove('active'));
    
    // Menambahkan class active pada list yang di-klik
    this.classList.add('active');
    
    // Mengambil nilai index dan mengupdate CSS Variable
    const index = this.getAttribute('data-index');
    bottomNav.style.setProperty('--active-index', index);
}

listItems.forEach((item) => item.addEventListener('click', activeLink));