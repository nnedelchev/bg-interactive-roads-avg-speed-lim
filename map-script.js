// map-script.js - Final version using cached coordinates (NO API CALLS)
// WITH COLLAPSIBLE CONTROLS AND LEGEND - DEFAULT COLLAPSED

// Bulgaria geographical bounds
const BULGARIA_BOUNDS = [
    [41.2, 22.3],  // Southwest corner
    [44.2, 28.6]   // Northeast corner
];

// Initialize the map
const map = L.map('map', {
    center: [42.7, 25.5],
    zoom: 7,
    minZoom: 7,
    maxZoom: 15,
    maxBounds: BULGARIA_BOUNDS,
    maxBoundsViscosity: 1.0
}).setView([42.42, 24.0], 8);

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
            <h3>📊 Статистики</h3>
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
function createIndividualRoadLayer(road, color) {
    const roadLayer = L.layerGroup().addTo(map);

    // Use the coordinates from cached data (already included in road object)
    const coordinates = road.coordinates || [road.startPoint.coordinates, road.endPoint.coordinates];

    const polyline = createRoadPolyline(road, color, roadLayer, coordinates);

    const markers = [];
    const startMarker = createPointMarker(road.startPoint, road.name, road.speedLimit >= 130 ? 'highway' : 'mainRoad');
    const endMarker = createPointMarker(road.endPoint, road.name, road.speedLimit >= 130 ? 'highway' : 'mainRoad');

    startMarker.addTo(map);
    endMarker.addTo(map);

    markers.push(startMarker, endMarker);

    roadLayers.set(road.id, roadLayer);
    roadMarkers.set(road.id, markers);

    return roadLayer;
}

// Create point markers
function createPointMarker(point, roadName, type) {
    const isHighway = type === 'highway';
    const backgroundColor = isHighway ? '#2c3e50' : '#13d90cff';

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

    // Create controls
    createRoadControls(allRoads);

    // Auto-collapse both panels on mobile after a brief delay
    setTimeout(autoCollapseOnMobile, 1000);

    // Create layers for each road
    allRoads.forEach((road) => {
        let color;
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

        createIndividualRoadLayer(road, color);
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

// Handle window resize to auto-collapse/expand controls
function handleResize() {
    autoCollapseOnMobile();
}

// Auto-start when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeBulgariaMap();

    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleResize);

    // Load About modal HTML
    loadAboutModal();
});