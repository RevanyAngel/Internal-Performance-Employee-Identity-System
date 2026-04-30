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

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SKELETON LOADER LOGIC ---
    // Simulasi loading data selama 1.5 detik
    setTimeout(() => {
        const skeletonBoxes = document.querySelectorAll('.skeleton-box');
        skeletonBoxes.forEach(box => {
            box.classList.add('loaded'); // Menghilangkan animasi dan memunculkan konten
        });
        
        // Render chart setelah skeleton selesai agar canvas memiliki width/height yang valid
        initCharts(); 
    }, 1500);


    // --- 2. CHART.JS INITIALIZATION ---
    function initCharts() {
        // --- A. AREA CHART (Monthly KPI vs Attendance) ---
        const ctxArea = document.getElementById('areaChart').getContext('2d');
        
        // Buat Gradient Linear dari Teal ke Transparan
        let gradientKPI = ctxArea.createLinearGradient(0, 0, 0, 300);
        gradientKPI.addColorStop(0, 'rgba(14, 131, 136, 0.4)');
        gradientKPI.addColorStop(1, 'rgba(14, 131, 136, 0.0)');

        let gradientAtt = ctxArea.createLinearGradient(0, 0, 0, 300);
        gradientAtt.addColorStop(0, 'rgba(117, 182, 184, 0.4)');
        gradientAtt.addColorStop(1, 'rgba(117, 182, 184, 0.0)');

        new Chart(ctxArea, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [
                    {
                        label: 'KPI Score',
                        data: kpiData,
                        borderColor: colorPrimary,
                        backgroundColor: gradientKPI,
                        borderWidth: 2,
                        tension: 0.4, // Membuat garis melengkung (smooth)
                        fill: true,
                        pointRadius: 0
                    },
                    {
                        label: 'Attendance Score',
                        data: attendanceData,
                        borderColor: colorSecondary,
                        backgroundColor: gradientAtt,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { 
                            usePointStyle: true, 
                            pointStyle: 'line', // Mengubah titik menjadi garis
                            boxWidth: 20, // Lebar garis
                            font: { family: 'Inter', size: 12, weight: '600'} 
                        }
                    }
                },
                scales: {
                    y: {
                        min: 70, max: 100,
                        grid: { borderDash: [5, 5], color: '#e2e8e8' },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });

        // --- B. RADAR CHART (Evaluation Breakdown) ---
        const ctxRadar = document.getElementById('radarChart').getContext('2d');
        
        new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: evaluationLabels,
                datasets: [{
                    label: 'Score',
                    data: evaluationScores,
                    backgroundColor: 'rgba(14, 131, 136, 0.3)', // Gradient fill inside radar
                    borderColor: colorPrimary,
                    pointBackgroundColor: colorPrimary,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colorPrimary,
                    borderWidth: 1.5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false } // Sembunyikan legend utama
                },
                scales: {
                    r: {
                        angleLines: { color: '#e2e8e8' },
                        grid: { color: '#e2e8e8' },
                        pointLabels: {
                            font: { family: 'Inter', size: 11, weight: '600' },
                            color: colorPrimary
                        },
                        ticks: { display: false, min: 0, max: 100, stepSize: 20 }
                    }
                }
            }
        });
    }
});