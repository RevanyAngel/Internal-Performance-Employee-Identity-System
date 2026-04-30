
// =============== Monthly Performance Review ===============
const ctx = document.getElementById('scoreChart').getContext('2d');
    
    // Konfigurasi Chart.js
    const scoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [910, 90], // 910 score, 90 sisa untuk mencapai 1000
                backgroundColor: [
                    '#ffffff', // Warna progress (putih)
                    'rgba(255, 255, 255, 0.2)' // Warna sisa (transparan/gelap)
                ],
                borderWidth: 0,
                circumference: 280, // Membuat bentuk tidak lingkaran penuh (open bottom)
                rotation: 220,      // Memutar chart agar celah ada di bawah
                cutout: '80%',      // Membuat ketebalan donat
                borderRadius: 10    // Membuat ujung chart membulat
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });


// =============== KPI Indicators ===============
// Konfigurasi umum untuk semua chart
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%', // Ketebalan garis doughnut
            plugins: {
                tooltip: { enabled: false }, // Sembunyikan tooltip saat di-hover
                legend: { display: false }   // Sembunyikan legenda
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        };

        // Warna yang digunakan di grafik
        const colorFilled = '#0b7c71'; // Warna Teal (terisi)
        const colorEmpty = '#d4e7e4';  // Warna abu-abu kehijauan (kosong)

        // Fungsi pembuat chart
        function createKpiChart(elementId, percentage) {
            const ctx = document.getElementById(elementId).getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [percentage, 100 - percentage],
                        backgroundColor: [colorFilled, colorEmpty],
                        borderWidth: 0,
                        borderRadius: 2 // Membuat ujung bar sedikit membulat (opsional)
                    }]
                },
                options: commonOptions
            });
        }

        // Inisialisasi ke-4 chart sesuai dengan persentase di gambar
        createKpiChart('chartDesign', 100);
        createKpiChart('chartBrand', 90);
        createKpiChart('chartTechnical', 85);
        createKpiChart('chartDeadline', 90);