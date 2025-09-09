// Inicialização do mapa
        const map = L.map('map').setView([-15.788, -47.879], 12);
        
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(map);
        
        // Adicionando áreas de risco (exemplo)
        const riskArea = L.polygon([
            [-15.79, -47.88],
            [-15.78, -47.87],
            [-15.77, -47.89]
        ], {color: 'red', fillOpacity: 0.3}).addTo(map);
        
        riskArea.bindPopup("Área de alto risco de queimadas");
        
        // Adicionando marcador de sensor
        const sensorMarker = L.marker([-15.792, -47.882]).addTo(map);
        sensorMarker.bindPopup("<b>Sensor SAFE-001</b><br>Umidade: 65%<br>CO²: 412 ppm");
        
        // Gráfico de queimadas
        const ctx = document.getElementById('firesChart').getContext('2d');
        const firesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Número de Queimadas',
                    data: [12, 19, 15, 27, 34, 42, 58, 76, 65, 48, 32, 18],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Ocorrências'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mês'
                        }
                    }
                }
            }
        });
        
        // Simulação de atualização dos sensores em tempo real
        function updateSensorData() {
            // Gerar valores aleatórios para demonstração
            const humidity = Math.floor(Math.random() * 20) + 60;
            const co2 = Math.floor(Math.random() * 20) + 400;
            
            document.getElementById('humidity-value').textContent = humidity + '%';
            document.getElementById('co2-value').textContent = co2 + ' ppm';
            
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            document.getElementById('humidity-time').textContent = timeString;
            document.getElementById('co2-time').textContent = timeString;
            
            // Atualizar o popup do marcador
            sensorMarker.setPopupContent(`<b>Sensor SAFE-001</b><br>Umidade: ${humidity}%<br>CO²: ${co2} ppm`);
            
            // Mudar cor do marcador se CO2 estiver alto
            if (co2 > 415) {
                sensorMarker._icon.classList.add('high-co2');
            } else {
                sensorMarker._icon.classList.remove('high-co2');
            }
        }
        
        // Atualizar a cada 5 segundos (simulação)
        setInterval(updateSensorData, 5000);
        
        // Estilo para marcador com alto CO2
        const style = document.createElement('style');
        style.textContent = `
            .high-co2 {
                filter: hue-rotate(120deg) brightness(1.2);
                animation: pulse 1s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);