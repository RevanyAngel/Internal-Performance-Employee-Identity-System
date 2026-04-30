
// =============== SKELETON LOADING LOGIC ===============
document.addEventListener("DOMContentLoaded", function() {
    // Simulasi loading data selama 1.5 detik
    setTimeout(() => {
        const skeletonBoxes = document.querySelectorAll('.skeleton-box');
        skeletonBoxes.forEach(box => {
            box.classList.add('loaded'); // Menghilangkan animasi dan memunculkan konten
        });
        
        // Render chart setelah skeleton selesai agar canvas memiliki width/height yang valid
        initKpiCharts(); 
    }, 1500);
});

// =============== CHART INITIALIZATION ===============
function initKpiCharts() {
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


    // =============== Historical KPI Score Logic ===============
    // Mengambil elemen canvas menggunakan ID yang spesifik
    const canvasElement = document.getElementById('kpi-historical-line-chart');
    const ctxHistorical = canvasElement.getContext('2d');

    // Membuat gradient untuk area di bawah garis
    // Gradient dari warna teal muda (atas) ke transparan (bawah)
    let chartGradient = ctxHistorical.createLinearGradient(0, 0, 0, 350);
    chartGradient.addColorStop(0, 'rgba(5, 125, 129, 0.25)'); // Teal semi-transparan
    chartGradient.addColorStop(1, 'rgba(5, 125, 129, 0.01)'); // Hampir putih/transparan

    // Konfigurasi dan inisialisasi Chart
    const kpiChart = new Chart(ctxHistorical, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'March', 'April'],
            datasets: [{
                label: 'KPI Score by Month',
                data: [96, 88, 90, 73], // Data disesuaikan estimasi dari gambar
                borderColor: '#057d81', // Warna garis
                borderWidth: 2,
                backgroundColor: chartGradient, // Mengisi area dengan gradient
                fill: true, // Mengaktifkan area isi bawah grafik
                tension: 0.4, // Membuat lengkungan garis yang halus (smooth curve)
                pointRadius: 0, // Menghilangkan titik-titik pada garis grafik
                pointHoverRadius: 6 // Menampilkan titik saat di-hover
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line', // Membuat ikon legend berupa garis horizontal
                        boxHeight: 15,
                        color: '#4a4a4a',
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 14,
                            weight: '500'
                        },
                        padding: 30
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: 10
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false, // Menghilangkan garis vertikal
                        drawBorder: true,
                        borderColor: '#d3d3d3', // Garis sumbu X solid di bawah
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#2b3035',
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 13
                        },
                        padding: 15
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20, // Interval 0, 20, 40, ..., 100
                        color: '#6c757d',
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 13
                        },
                        padding: 15
                    },
                    grid: {
                        color: '#e5e7eb',
                        borderDash: [5, 5], // Membuat garis horizontal putus-putus
                        drawBorder: false, // Menghilangkan garis sumbu Y utama
                    }
                }
            }
        }
    });
}