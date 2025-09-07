// map-script.js - Final version using cached coordinates (NO API CALLS)

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

// Add map tiles
const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    maxZoom: 18,
    subdomains: 'abcd'
}).addTo(map);

// Store layers and markers
const roadLayers = new Map();
const roadMarkers = new Map();

// Create road controls
function createRoadControls(allRoads) {
    const controlsContainer = document.getElementById('road-controls');
    controlsContainer.innerHTML = '';

    const headerElement = document.querySelector('.controls h3');
    headerElement.textContent = `Сертифицирани отсечки за средна скорост (${allRoads.length})`;

    allRoads.forEach((road) => {
        const controlItem = document.createElement('div');
        controlItem.className = 'control-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `road-${road.id}`;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.setAttribute('for', `road-${road.id}`);
        label.textContent = road.name;

        controlItem.appendChild(checkbox);
        controlItem.appendChild(label);
        controlsContainer.appendChild(controlItem);

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

    marker.bindPopup(`<strong>${point.name}</strong><br>Road: ${roadName}<br>Coordinates: ${point.coordinates[0].toFixed(4)}, ${point.coordinates[1].toFixed(4)}`);
    return marker;
}

// Create road polylines
function createRoadPolyline(road, color, layer, coordinates) {
    const polyline = L.polyline(coordinates, {
        color: color,
        weight: 5,
        opacity: 0.9
    }).addTo(layer);

    const coordinateInfo = coordinates.length > 2 ? 'Exact road geometry' : 'Straight line approximation';

    polyline.bindPopup(`
        <div class="speed-popup">
            <h4>${road.name}</h4>
            <p><strong>Route:</strong> ${road.startPoint.name} → ${road.endPoint.name}</p>
            <p><strong>Speed Limit:</strong> <span class="speed-limit">${road.speedLimit} km/h</span></p>
            <p><strong>Road Type:</strong> ${getRoadType(road.speedLimit)}</p>
            ${road.segment ? `<p><strong>Segment:</strong> ${road.segment}/2</p>` : ''}
            <p><strong>Distance:</strong> ${road.distance} kilometers</p>
            <p><strong>Geometry:</strong> ${coordinateInfo} (${coordinates.length} points)</p>
        </div>
    `);

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
    console.log('🇧🇬 Bulgaria Road Network Map - Starting initialization with cached data...');

    // Check if cached data is loaded
    if (typeof window.RoadData === 'undefined') {
        console.error('❌ roads-data-cached.js file not loaded!');
        alert('Error: roads-data-cached.js file not found. Please ensure the file is in the same folder.');
        return;
    }

    console.log('📦 Loading road data from cached file (no API calls needed)...');
    const { ROAD_TRACKS, RoadDataUtils } = window.RoadData;
    console.log('✅ Cached road data loaded successfully');

    // Show loading for UX (brief)
    showLoading(true);

    // Brief delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get road data (coordinates already included from cache)
    const highways = ROAD_TRACKS.highways || [];
    const mainRoads = ROAD_TRACKS.mainRoads || [];
    const secondaryRoads = ROAD_TRACKS.secondaryRoads || [];

    showLoading(false);

    // Combine all roads
    const allRoads = [...highways, ...mainRoads, ...secondaryRoads];

    // Create controls
    createRoadControls(allRoads);

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

    console.log(`🎉 Map initialization complete!`);
    console.log(`📍 Loaded ${allRoads.length} roads: ${exactGeometry} with exact geometry, ${approximateGeometry} with approximate geometry`);
    console.log(`🎛️ Created ${allRoads.length} individual road toggles.`);
    console.log(`⚡ Zero API calls made - all data from cache!`);
}

// Auto-start when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeBulgariaMap();
});