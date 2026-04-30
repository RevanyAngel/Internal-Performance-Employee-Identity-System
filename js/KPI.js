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