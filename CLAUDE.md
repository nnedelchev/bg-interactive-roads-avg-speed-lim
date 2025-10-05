# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web map visualization showing certified average speed monitoring sections on Bulgaria's road network. The application displays road segments where speed cameras monitor and calculate average vehicle speeds.

## Architecture

### Core Components

**Frontend (Vanilla JavaScript)**
- `index.html` - Main application entry point with map container and modal placeholders
- `map-script.js` - Primary application logic with Leaflet.js map implementation
- `styles.css` - Responsive styling with mobile-first design and collapsible UI components
- `about-modal.html` - Informational modal content loaded dynamically

**Data Layer**
- `roads-data-cached.js` - Main data file containing all road configurations with coordinates, speed limits, and camera metadata
- `cache-generator/roads-config.js` - Source configuration for generating cached coordinate data
- `cache-generator/cache-generator.html` - Utility tool for processing road configurations into cached format

**Assets**
- `camera-images/` - Contains JPG images of speed camera installations at various monitoring points

### Data Structure

Road data is organized in `ROAD_TRACKS` object with categories:
- `highways` - Motorways (магистрали) with 140 km/h speed limits
- `mainRoads` - First-class roads (първокласни пътища) with varying speed limits
- `secondaryRoads` - Secondary roads (if applicable)

Each road segment contains:
- Unique ID and Bulgarian name
- Start/end points with coordinates, descriptions, and camera images
- Speed limit and distance information
- Either exact coordinate arrays or interpolated paths

### Key Features

**Interactive Map Controls**
- Individual road segment toggles with distance information
- Collapsible control panel (auto-collapsed on mobile)
- Responsive legend with road type statistics
- Map bounds restricted to Bulgaria territory

**Mobile Optimization**
- Responsive design with mobile-specific popup positioning
- Touch-friendly controls and auto-collapse behavior
- Viewport-aware modal and popup handling

## Development Workflow

### Making Data Changes

1. **Adding New Road Segments**: Edit `cache-generator/roads-config.js` to add new road configurations
2. **Regenerating Cache**: Use `cache-generator/cache-generator.html` to process configurations into `roads-data-cached.js`
3. **Camera Images**: Add corresponding JPG files to `camera-images/` directory using lowercase filenames matching location names

### Testing Changes

Open `index.html` in a web browser - no build process required. The application loads:
1. Leaflet.js from CDN for mapping functionality
2. Cached road data from local file
3. Main application script with UI interactions
4. Modal content loaded asynchronously

### Code Organization

**Map Initialization Flow**:
1. Initialize Leaflet map with Bulgaria bounds and zoom restrictions
2. Load and parse road data from `ROAD_TRACKS` configuration
3. Create interactive controls and legend components
4. Generate map layers for each road category with color coding
5. Add markers for start/end points with popup information

**UI Component Pattern**:
- Collapsible panels use toggle functions with CSS transforms
- Mobile responsiveness handled through media queries and JavaScript viewport detection
- Modal system loads external HTML and manages event listeners dynamically

## Data Sources

Road information sourced from [BG-Toll official website](https://www.bgtoll.bg/vaprosi-i-otgovori/sredna-skorost/wim). All coordinate data represents actual camera installation locations on the Bulgarian road network as of September 2025.