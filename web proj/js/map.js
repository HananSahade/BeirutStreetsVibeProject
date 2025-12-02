$(document).ready(function() {
  // Initialize Beirut Map
  initBeirutMap();

  // Hover effects for location cards
  $('.location-card').hover(
    function() {
      $(this).css('transform', 'translateY(-4px)');
    },
    function() {
      if (!$(this).hasClass('active')) {
        $(this).css('transform', 'translateY(0)');
      }
    }
  );

  // Click handlers for location cards
  $('.location-card').on('click', function() {
    const location = $(this).data('location');
    const title = $(this).find('.location-title').text();
    const coords = $(this).find('.location-coords').text();
    
    // Remove active class from all cards
    $('.location-card').removeClass('active');
    $(this).addClass('active');
    
    // Fly to location on map
    flyToLocation(location, title, coords);
    
    // Pulse animation
    $(this).find('.location-icon-wrapper').css({
      'animation': 'pulse 0.5s ease-in-out'
    });
    
    setTimeout(() => {
      $(this).find('.location-icon-wrapper').css('animation', '');
    }, 500);
  });

  // Smooth scroll to map
  $('a[href="#map"]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#map').offset().top - 80
    }, 800);
  });

  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    $('.location-card').each(function() {
      observer.observe(this);
    });
  }
});

// Map initialization function
function initBeirutMap() {
  // Beirut coordinates (centered)
  const beirutCoords = [33.8938, 35.5018];
  
  // Initialize map
  const map = L.map('beirut-map').setView(beirutCoords, 13);
  
  // Add different tile layers (map styles)
  const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });
  
  const lightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  });
  
  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
  
  // Add default layer
  darkLayer.addTo(map);
  
  // Add layer control
  const baseMaps = {
    "Dark Mode": darkLayer,
    "Light Mode": lightLayer,
    "Satellite": satelliteLayer
  };
  
  L.control.layers(baseMaps).addTo(map);
  
  // Custom icon
  const customIcon = L.divIcon({
    html: '<div class="custom-marker"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>',
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });
  
  // Beirut neighborhoods data
  const neighborhoods = [
    {
      id: 'mar-mikhael',
      name: 'Mar Mikhael',
      coords: [33.8938, 35.5018],
      description: 'Artistic hub with vibrant nightlife, trendy bars, and art galleries.',
      type: 'nightlife'
    },
    {
      id: 'downtown',
      name: 'Downtown Beirut',
      coords: [33.8958, 35.5048],
      description: 'Historic center rebuilt with modern flair, featuring luxury shopping and historic sites.',
      type: 'historic'
    },
    {
      id: 'hamra',
      name: 'Hamra',
      coords: [33.8958, 35.4828],
      description: 'Cultural heartbeat of the city with bookstores, cafes, and the American University of Beirut.',
      type: 'cultural'
    },
    {
      id: 'gemmayze',
      name: 'Gemmayze',
      coords: [33.8948, 35.5198],
      description: 'Bohemian quarter with Ottoman architecture, known for its lively street life and restaurants.',
      type: 'historic'
    },
    {
      id: 'achrafieh',
      name: 'Achrafieh',
      coords: [33.8869, 35.5131],
      description: 'Upscale residential and commercial area with luxury apartments and fine dining.',
      type: 'residential'
    },
    {
      id: 'raouche',
      name: 'Raouche',
      coords: [33.8894, 35.4750],
      description: 'Famous for Pigeon Rocks and seaside cafes with stunning Mediterranean views.',
      type: 'landmark'
    },
    {
      id: 'verdun',
      name: 'Verdun',
      coords: [33.8881, 35.4833],
      description: 'Luxury shopping and dining district with high-end boutiques and restaurants.',
      type: 'commercial'
    },
    {
      id: 'badaro',
      name: 'Badaro',
      coords: [33.8775, 35.5078],
      description: 'Residential neighborhood with a village feel, known for its weekend market and cafes.',
      type: 'residential'
    }
  ];
  
  // Add markers for each neighborhood
  neighborhoods.forEach(neighborhood => {
    const marker = L.marker(neighborhood.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="map-popup">
          <h3>${neighborhood.name}</h3>
          <p>${neighborhood.description}</p>
          <small>${neighborhood.coords[0].toFixed(4)}° N, ${neighborhood.coords[1].toFixed(4)}° E</small>
        </div>
      `);
    
    // Add click event to markers
    marker.on('click', function() {
      // Highlight the corresponding location card if it exists
      const card = $(`.location-card[data-location="${neighborhood.id}"]`);
      if (card.length) {
        $('.location-card').removeClass('active');
        card.addClass('active');
      }
    });
    
    // Store marker reference
    window[neighborhood.id + 'Marker'] = marker;
  });
  
  // Add a circle to highlight Beirut center
  L.circle(beirutCoords, {
    color: 'transparent',
    fillColor: 'hsl(35, 85%, 65%)',
    fillOpacity: 0.1,
    radius: 1500
  }).addTo(map);
  
  // Store map instance globally
  window.beirutMap = map;
}

// Fly to location function
function flyToLocation(location, title, coords) {
  const map = window.beirutMap;
  if (!map) return;
  
  const locations = {
    'mar-mikhael': [33.8938, 35.5018],
    'downtown': [33.8958, 35.5048],
    'hamra': [33.8958, 35.4828],
    'gemmayze': [33.8948, 35.5198]
  };
  
  const coordsArray = locations[location];
  if (coordsArray) {
    map.flyTo(coordsArray, 16, {
      duration: 1.5,
      easeLinearity: 0.25
    });
    
    // Open popup for the location
    setTimeout(() => {
      const marker = window[location + 'Marker'];
      if (marker) {
        marker.openPopup();
      }
    }, 1600);
  }
}