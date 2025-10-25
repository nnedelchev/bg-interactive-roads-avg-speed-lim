// map-script.js - Final version using cached coordinates (NO API CALLS)
// WITH COLLAPSIBLE CONTROLS AND LEGEND - DEFAULT COLLAPSED

// Bulgaria geographical bounds
const BULGARIA_BOUNDS = [
    [41.2, 22.3],  // Southwest corner
    [44.2, 28.6]   // Northeast corner
];

// Detect if device is mobile
const isMobile = window.innerWidth <= 768;

// Set zoom level based on device type
const initialZoom = isMobile ? 10 : 8;
const minZoomLevel = isMobile ? 8 : 7;

// Initialize the map
const map = L.map('map', {
    center: [42.7, 25.5],
    zoom: 7,
    minZoom: minZoomLevel,
    maxZoom: 15,
    maxBounds: BULGARIA_BOUNDS,
    maxBoundsViscosity: 1.0
}).setView([42.42, 24.0], initialZoom);

// Add this after map initialization
map.on('popupopen', function(e) {
    const popup = e.popup;
    const popupElement = popup.getElement();
    
    // For mobile devices, ensure popup doesn't go off-screen
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const rect = popupElement.getBoundingClientRect();
            const mapRect = map.getContainer().getBoundingClientRect();
            
            // Check if popup goes beyond screen boundaries
            if (rect.right > window.innerWidth - 20) {
                popup.setLatLng([
                    popup.getLatLng().lat,
                    popup.getLatLng().lng - 0.01
                ]);
            }
        }, 100);
    }
});

// ===== BASEMAP CONFIGURATION =====
// Change the 'current' property to switch basemaps easily
const BASEMAP_CONFIG = {
    current: 'openStreetMap', // Change this to switch basemaps

    options: {
        cartoLight: {
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '© OpenStreetMap contributors, © CARTO',
            maxZoom: 18,
            subdomains: 'abcd'
        },
        cartoDark: {
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '© OpenStreetMap contributors, © CARTO',
            maxZoom: 18,
            subdomains: 'abcd'
        },
        cartoPositron: {
            url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            attribution: '© OpenStreetMap contributors, © CARTO',
            maxZoom: 18,
            subdomains: 'abcd'
        },
        openStreetMap: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            subdomains: ['a', 'b', 'c']
        },
        esriSatellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '© Esri, Maxar, Earthstar Geographics',
            maxZoom: 18
        }
    }
};

// Get current basemap configuration
const currentBasemap = BASEMAP_CONFIG.options[BASEMAP_CONFIG.current];
// ===== END BASEMAP CONFIGURATION =====

const tileLayer = L.tileLayer(currentBasemap.url, {
    attribution: currentBasemap.attribution,
    maxZoom: currentBasemap.maxZoom,
    subdomains: currentBasemap.subdomains || 'abcd'
}).addTo(map);

// Store layers and markers
const roadLayers = new Map();
const roadMarkers = new Map();

// Create collapsible road controls
function createRoadControls(allRoads) {
    const controlsContainer = document.getElementById('road-controls');
    controlsContainer.innerHTML = '';

    // Create the collapsible structure - starts collapsed
    const controlsHTML = `
        <div class="controls-header" onclick="toggleControls()">
            <h3>Отсечки за средна скорост (${allRoads.length})</h3>
            <button class="controls-toggle" id="controls-toggle">▲</button>
        </div>
        <div class="controls-content" id="controls-content">
            ${allRoads.map(road => `
                <div class="control-item">
                    <input type="checkbox" id="road-${road.id}" checked>
                    <label for="road-${road.id}">${road.name} (${road.distance} км)</label>
                </div>
            `).join('')}
        </div>
    `;

    controlsContainer.innerHTML = controlsHTML;

    // Add event listeners for each checkbox
    allRoads.forEach((road) => {
        const checkbox = document.getElementById(`road-${road.id}`);
        checkbox.addEventListener('change', function () {
            const roadLayer = roadLayers.get(road.id);
            const roadMarkersList = roadMarkers.get(road.id);

            if (this.checked) {
                if (roadLayer) {
                    map.addLayer(roadLayer);
                }
                if (roadMarkersList) {
                    roadMarkersList.forEach(marker => {
                        marker.addTo(map);
                    });
                }
            } else {
                if (roadLayer) {
                    map.removeLayer(roadLayer);
                }
                if (roadMarkersList) {
                    roadMarkersList.forEach(marker => {
                        map.removeLayer(marker);
                    });
                }
            }
        });
    });
}

// Create collapsible legend
function createLegend() {
    const legendContainer = document.querySelector('.legend');

    // Create the collapsible structure - starts collapsed
    const legendHTML = `
        <div class="legend-header" onclick="toggleLegend()">
            <h3>📊 Статистики & Легенда</h3>
            <button class="legend-toggle" id="legend-toggle">▲</button>
        </div>
        <div class="legend-content" id="legend-content">
            <div class="legend-stats">
                <div class="legend-stat">
                    <span class="legend-stat-label">По пътища:</span>
                    <span class="legend-stat-value" id="main-roads-count">-</span>
                </div>
                <div class="legend-stat">
                    <span class="legend-stat-label">Пътища км.:</span>
                    <span class="legend-stat-value" id="main-roads-distance">-</span>
                </div>
                <div class="legend-stat">
                    <span class="legend-stat-label">По магистрала:</span>
                    <span class="legend-stat-value" id="highways-count">-</span>
                </div>
                <div class="legend-stat">
                    <span class="legend-stat-label">Магистрала км.:</span>
                    <span class="legend-stat-value" id="highways-distance">-</span>
                </div>
            </div>
            <hr style="margin: 0.8rem 0; border: none; border-top: 1px solid #e0e0e0;">
            <div class="legend-colors">
                <div class="legend-color-item">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 30px; height: 4px; background: #FF0000; border-radius: 2px;"></div>
                        <span style="font-size: 0.85rem; color: #2c3e50;">Нови отсечки</span>
                    </div>
                </div>
                <div class="legend-color-item">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 30px; height: 4px; background: #2c3e50; border-radius: 2px;"></div>
                        <span style="font-size: 0.85rem; color: #2c3e50;">Магистрали</span>
                    </div>
                </div>
                <div class="legend-color-item">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 30px; height: 4px; background: #13d90cff; border-radius: 2px;"></div>
                        <span style="font-size: 0.85rem; color: #2c3e50;">Пътища</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    legendContainer.innerHTML = legendHTML;
}

// Toggle controls visibility
function toggleControls() {
    const controlsElement = document.querySelector('.controls');
    const toggleButton = document.getElementById('controls-toggle');

    controlsElement.classList.toggle('expanded');

    if (controlsElement.classList.contains('expanded')) {
        // Expanded state: show ▼ and add expanded class to button
        toggleButton.textContent = '▼';
        toggleButton.classList.add('expanded');
    } else {
        // Collapsed state: show ▲ and remove expanded class from button
        toggleButton.textContent = '▲';
        toggleButton.classList.remove('expanded');
    }
}

// Toggle legend visibility
function toggleLegend() {
    const legendElement = document.querySelector('.legend');
    const toggleButton = document.getElementById('legend-toggle');

    legendElement.classList.toggle('expanded');

    if (legendElement.classList.contains('expanded')) {
        // Expanded state: show ▼ and add expanded class to button
        toggleButton.textContent = '▼';
        toggleButton.classList.add('expanded');
    } else {
        // Collapsed state: show ▲ and remove expanded class from button
        toggleButton.textContent = '▲';
        toggleButton.classList.remove('expanded');
    }
}

// Auto-collapse panels on mobile devices (they're already collapsed by default)
function autoCollapseOnMobile() {
    if (window.innerWidth <= 768) {
        // Ensure panels stay collapsed on mobile
        const controlsElement = document.querySelector('.controls');
        const controlsToggleButton = document.getElementById('controls-toggle');

        if (controlsElement && controlsElement.classList.contains('expanded')) {
            controlsElement.classList.remove('expanded');
            if (controlsToggleButton) {
                controlsToggleButton.textContent = '▲';
                controlsToggleButton.classList.remove('expanded');
            }
        }

        // Ensure legend stays collapsed on mobile
        const legendElement = document.querySelector('.legend');
        const legendToggleButton = document.getElementById('legend-toggle');

        if (legendElement && legendElement.classList.contains('expanded')) {
            legendElement.classList.remove('expanded');
            if (legendToggleButton) {
                legendToggleButton.textContent = '▲';
                legendToggleButton.classList.remove('expanded');
            }
        }
    }
}

// Create individual road layer
function createIndividualRoadLayer(road, color, isNewest = false) {
    const roadLayer = L.layerGroup().addTo(map);

    // Use the coordinates from cached data (already included in road object)
    const coordinates = road.coordinates || [road.startPoint.coordinates, road.endPoint.coordinates];

    const polyline = createRoadPolyline(road, color, roadLayer, coordinates);

    const markers = [];
    const startMarker = createPointMarker(road.startPoint, road.name, road.speedLimit >= 130 ? 'highway' : 'mainRoad', isNewest);
    const endMarker = createPointMarker(road.endPoint, road.name, road.speedLimit >= 130 ? 'highway' : 'mainRoad', isNewest);

    startMarker.addTo(map);
    endMarker.addTo(map);

    markers.push(startMarker, endMarker);

    roadLayers.set(road.id, roadLayer);
    roadMarkers.set(road.id, markers);

    return roadLayer;
}

// Create point markers
function createPointMarker(point, roadName, type, isNewest = false) {
    const isHighway = type === 'highway';
    let backgroundColor;

    // Use red color for newest roads, otherwise use default colors
    if (isNewest) {
        backgroundColor = '#FF0000'; // Red for newest roads
    } else {
        backgroundColor = isHighway ? '#2c3e50' : '#13d90cff';
    }

    const marker = L.marker(point.coordinates, {
        icon: L.divIcon({
            className: 'point-marker',
            html: `<div style="background: ${backgroundColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-weight: bold;">${point.name}</div>`,
            iconSize: [point.name.length * 8, 20],
            iconAnchor: [point.name.length * 4, 10]
        })
    });

    const imageName = point.image;
    const imagePath = `camera-images/${imageName}`;

    const popupContent = `
        <div class="point-popup">
            <div class="popup-header">
                <h3>${point.name}</h3>
            </div>
            
            <div class="popup-body">
                <div class="coordinates">
                    <strong>${point.description ? `${point.description}` : ''}</strong>
                </div>
                
                <div class="coordinates">
                    <strong>Coordinates:</strong> ${point.coordinates[0].toFixed(4)}, ${point.coordinates[1].toFixed(4)}
                </div>
                <div class="road-image">
                    <img src="${imagePath}" alt="${point.name}" />
                </div>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);

    return marker;
}

// Updated createRoadPolyline function with consistent popup styling
function createRoadPolyline(road, color, layer, coordinates) {
    const polyline = L.polyline(coordinates, {
        color: color,
        weight: 5,
        opacity: 0.9
    }).addTo(layer);

    const coordinateInfo = coordinates.length > 2 ? 'Exact road geometry' : 'Straight line approximation';

    // Create popup content with consistent styling to match point popups
    const popupContent = `
        <div class="point-popup">
            <div class="popup-header">
                <h3>${road.name}</h3>
            </div>
            
            <div class="popup-body">
                <div class="road-info-section">
                    <p><strong>Route:</strong> ${road.startPoint.name} → ${road.endPoint.name}</p>
                    <p><strong>Speed Limit:</strong> <span class="speed-limit">${road.speedLimit} km/h</span></p>
                    <p><strong>Road Type:</strong> ${getRoadType(road.speedLimit)}</p>
                    ${road.segment ? `<p><strong>Segment:</strong> ${road.segment}/2</p>` : ''}
                    <p><strong>Distance:</strong> ${road.distance} kilometers</p>
                </div>
                
                <div class="coordinates">
                    <strong>Geometry:</strong> ${coordinateInfo} (${coordinates.length} points)
                </div>
            </div>
        </div>
    `;

    polyline.bindPopup(popupContent);

    return polyline;
}

// Get road type based on speed limit
function getRoadType(speedLimit) {
    if (speedLimit >= 130) return "Highway";
    if (speedLimit >= 90) return "Main Road";
    return "Secondary Road";
}

// Show/hide loading message
function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

// Find the most recent active_since date across all roads
function findNewestActiveDate(roads) {
    let newestDate = null;
    let newestDateObj = null;

    roads.forEach(road => {
        if (road.active_since) {
            // Convert to Date object for proper comparison
            const currentDateObj = new Date(road.active_since);

            if (!newestDateObj || currentDateObj > newestDateObj) {
                newestDateObj = currentDateObj;
                newestDate = road.active_since; // Keep the original string format
            }
        }
    });

    return newestDate;
}

// Main initialization function (NO API CALLS - uses cached data only)
async function initializeBulgariaMap() {
    // Check if cached data is loaded
    if (typeof window.RoadData === 'undefined') {
        console.error('❌ roads-data-cached.js file not loaded!');
        alert('Error: roads-data-cached.js file not found. Please ensure the file is in the same folder.');
        return;
    }

    const { ROAD_TRACKS, RoadDataUtils } = window.RoadData;

    // Show loading for UX (brief)
    showLoading(true);

    // Brief delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Create the collapsible legend first
    createLegend();

    updateLegendStats();

    // Get road data (coordinates already included from cache)
    const highways = ROAD_TRACKS.highways || [];
    const mainRoads = ROAD_TRACKS.mainRoads || [];
    const secondaryRoads = ROAD_TRACKS.secondaryRoads || [];

    showLoading(false);

    // Combine all roads
    const allRoads = [...highways, ...mainRoads, ...secondaryRoads];

    // Find the most recent active_since date
    const newestDate = findNewestActiveDate(allRoads);
    console.log('Most recent active_since date:', newestDate);

    // Create controls
    createRoadControls(allRoads);

    // Auto-collapse both panels on mobile after a brief delay
    setTimeout(autoCollapseOnMobile, 1000);

    // Create layers for each road
    allRoads.forEach((road) => {
        let color;
        let isNewest = false;

        // Check if this road has the newest active_since date
        if (road.active_since && road.active_since === newestDate) {
            color = '#FF0000'; // Red color for newest roads
            isNewest = true;
        } else {
            // Use default color logic
            if (highways.includes(road)) {
                const highwayIndex = highways.indexOf(road);
                color = RoadDataUtils.getRoadColor('highways', highwayIndex);
            } else if (mainRoads.includes(road)) {
                const mainRoadIndex = mainRoads.indexOf(road);
                color = RoadDataUtils.getRoadColor('mainRoads', mainRoadIndex);
            } else {
                const secondaryRoadIndex = secondaryRoads.indexOf(road);
                color = RoadDataUtils.getRoadColor('secondaryRoads', secondaryRoadIndex);
            }
        }

        createIndividualRoadLayer(road, color, isNewest);
    });

    // Fit map to show all roads
    const allPoints = [];
    allRoads.forEach(road => {
        if (road.coordinates && road.coordinates.length > 0) {
            allPoints.push(...road.coordinates);
        } else {
            allPoints.push(road.startPoint.coordinates, road.endPoint.coordinates);
        }
    });

    if (allPoints.length > 0) {
        const bounds = L.latLngBounds(allPoints);
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Count roads with exact vs approximate geometry
    const exactGeometry = allRoads.filter(road => road.coordinates && road.coordinates.length > 2).length;
    const approximateGeometry = allRoads.length - exactGeometry;
}

// Function to update legend statistics
function updateLegendStats() {
    const { ROAD_TRACKS } = window.RoadData;

    // Calculate highway statistics
    const highwaysCount = ROAD_TRACKS.highways.length;
    const highwaysDistance = ROAD_TRACKS.highways.reduce((sum, road) => sum + road.distance, 0);

    // Calculate main roads statistics  
    const mainRoadsCount = ROAD_TRACKS.mainRoads.length;
    const mainRoadsDistance = ROAD_TRACKS.mainRoads.reduce((sum, road) => sum + road.distance, 0);

    // Update DOM elements
    document.getElementById('highways-count').textContent = highwaysCount;
    document.getElementById('highways-distance').textContent = highwaysDistance.toFixed(2) + ' км';
    document.getElementById('main-roads-count').textContent = mainRoadsCount;
    document.getElementById('main-roads-distance').textContent = mainRoadsDistance.toFixed(2) + ' км';
}

// Function to load About modal HTML
async function loadAboutModal() {
    try {
        const response = await fetch('about-modal.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} `);
        }
        const html = await response.text();
        document.getElementById('about-modal-container').innerHTML = html;

        // Set up modal event listeners after loading
        setupAboutModal();
    } catch (error) {
        console.error('Error loading about modal:', error);
        // Fallback - create a simple alert
        alert('About information could not be loaded. Please check that about-modal.html exists in the same directory.');
    }
}

// Function to load Statistics modal HTML
async function loadStatisticsModal() {
    try {
        const response = await fetch('statistics-modal.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById('statistics-modal-container').innerHTML = html;

        // Set up modal event listeners after loading
        setupStatisticsModal();
    } catch (error) {
        console.error('Error loading statistics modal:', error);
        alert('Statistics information could not be loaded. Please check that statistics-modal.html exists in the same directory.');
    }
}

// Setup About modal event listeners
function setupAboutModal() {
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = document.querySelector('.close');

    if (aboutBtn && aboutModal && closeBtn) {
        aboutBtn.addEventListener('click', function () {
            aboutModal.style.display = 'block';
        });

        closeBtn.addEventListener('click', function () {
            aboutModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === aboutModal) {
                aboutModal.style.display = 'none';
            }
        });
    }
}

// Setup Statistics modal event listeners
function setupStatisticsModal() {
    const statisticsBtn = document.getElementById('statistics-btn');
    const statisticsModal = document.getElementById('statistics-modal');
    const closeBtn = document.querySelector('.stats-close');

    if (statisticsBtn && statisticsModal && closeBtn) {
        statisticsBtn.addEventListener('click', function () {
            statisticsModal.style.display = 'block';
            // Generate statistics when modal opens
            generateStatistics();
        });

        closeBtn.addEventListener('click', function () {
            statisticsModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === statisticsModal) {
                statisticsModal.style.display = 'none';
            }
        });
    }
}

// Process road data and calculate statistics by date
function processRoadStatistics() {
    const { ROAD_TRACKS } = window.RoadData;
    const allRoads = [...ROAD_TRACKS.highways, ...ROAD_TRACKS.mainRoads, ...(ROAD_TRACKS.secondaryRoads || [])];

    // Group roads by active_since date
    const roadsByDate = {};

    allRoads.forEach(road => {
        const date = road.active_since || 'Unknown';
        if (!roadsByDate[date]) {
            roadsByDate[date] = {
                count: 0,
                distance: 0,
                roads: []
            };
        }
        roadsByDate[date].count++;
        roadsByDate[date].distance += road.distance;
        roadsByDate[date].roads.push(road);
    });

    // Sort dates chronologically
    const sortedDates = Object.keys(roadsByDate).sort((a, b) => {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return new Date(a) - new Date(b);
    });

    // Calculate cumulative values
    let cumulativeCount = 0;
    let cumulativeDistance = 0;
    const statistics = [];

    sortedDates.forEach(date => {
        cumulativeCount += roadsByDate[date].count;
        cumulativeDistance += roadsByDate[date].distance;

        statistics.push({
            date: date,
            newCount: roadsByDate[date].count,
            newDistance: roadsByDate[date].distance,
            cumulativeCount: cumulativeCount,
            cumulativeDistance: cumulativeDistance
        });
    });

    return statistics;
}

// Generate statistics chart and table
let growthChart = null; // Store chart instance to avoid duplicates

function generateStatistics() {
    const statistics = processRoadStatistics();

    // Generate table
    const tableBody = document.getElementById('statistics-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';

        statistics.forEach(stat => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.date}</td>
                <td>${stat.newCount}</td>
                <td>${stat.newDistance.toFixed(2)} км</td>
                <td>${stat.cumulativeCount}</td>
                <td>${stat.cumulativeDistance.toFixed(2)} км</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Generate chart
    const ctx = document.getElementById('growth-chart');
    if (ctx) {
        // Destroy existing chart if it exists
        if (growthChart) {
            growthChart.destroy();
        }

        const chartData = {
            labels: statistics.map(s => s.date),
            datasets: [
                {
                    label: 'Кумулативни километри',
                    data: statistics.map(s => s.cumulativeDistance),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Кумулативни отсечки',
                    data: statistics.map(s => s.cumulativeCount),
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        };

        growthChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Растеж на мрежата за средна скорост във времето',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Километри (км)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Брой отсечки'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
}

// Handle window resize to auto-collapse/expand controls
function handleResize() {
    autoCollapseOnMobile();
}

// Close panels when clicking outside
function handleClickOutside(event) {
    const controlsElement = document.querySelector('.controls');
    const legendElement = document.querySelector('.legend');
    const controlsToggleButton = document.getElementById('controls-toggle');
    const legendToggleButton = document.getElementById('legend-toggle');

    // Check if click is outside controls panel
    if (controlsElement && !controlsElement.contains(event.target)) {
        if (controlsElement.classList.contains('expanded')) {
            controlsElement.classList.remove('expanded');
            if (controlsToggleButton) {
                controlsToggleButton.textContent = '▲';
                controlsToggleButton.classList.remove('expanded');
            }
        }
    }

    // Check if click is outside legend panel
    if (legendElement && !legendElement.contains(event.target)) {
        if (legendElement.classList.contains('expanded')) {
            legendElement.classList.remove('expanded');
            if (legendToggleButton) {
                legendToggleButton.textContent = '▲';
                legendToggleButton.classList.remove('expanded');
            }
        }
    }
}

// Auto-start when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeBulgariaMap();

    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleResize);

    // Add click listener to close panels when clicking outside
    document.addEventListener('click', handleClickOutside);

    // Load About modal HTML
    loadAboutModal();

    // Load Statistics modal HTML
    loadStatisticsModal();
});