const photos = [
    {
    "id": 1,
    "title": "Graffiti Wall - Mar Mikhael",
    "location": "Mar Mikhael",
    "date": "2024-11-15",
    "category": "Street Art",
    "src": "https://i.pinimg.com/1200x/40/1d/39/401d393d327122449e0d6e46a1535ab2.jpg",
    "likes": 142
  },
  {
    "id": 2,
    "title": "Café Culture - Hamra Street",
    "location": "Hamra",
    "date": "2024-11-20",
    "category": "Cafés",
    "src": "https://i.pinimg.com/1200x/e5/2c/ee/e52cee2436be3338a6b799e39eed5a61.jpg",
    "likes": 89
  },
  {
    "id": 3,
    "title": "Sunset at Corniche",
    "location": "Corniche",
    "date": "2024-11-18",
    "category": "Landmarks",
    "src": "https://i.pinimg.com/736x/53/77/bb/5377bbe5461644057aa932ce0b2ac88c.jpg",
    "likes": 234
  },
  {
    "id": 4,
    "title": "Hidden Alleyway - Gemmayzeh",
    "location": "Gemmayzeh",
    "date": "2024-11-22",
    "category": "Streets",
   "src": "https://i.pinimg.com/1200x/fc/9d/67/fc9d675acb7398483b8b55e26045be52.jpg",
    "likes": 67
  },
  {
    "id": 5,
    "title": "Colorful Stairs - Downtown",
    "location": "Downtown",
    "date": "2024-11-10",
    "category": "Architecture",
     "src": "https://i.pinimg.com/736x/0d/31/66/0d31661951b1e2781971f571eefc6358.jpg",
    "likes": 156
  },
  {
    "id": 6,
    "title": "Street Vendor - Verdun",
    "location": "Verdun",
    "date": "2024-11-25",
    "category": "Daily Life",
    "src": "https://i.pinimg.com/1200x/20/bd/55/20bd5522c6debcaebef37407f056f61a.jpg" ,
    "likes": 98
  },
  {
        "id": 7,
        "title": "night - beirut skyline",
        "location" : "Beirut Skyline at Night",
        "date": "2024-11-25",
        "category": "Streets",
        "src": "https://i.pinimg.com/1200x/53/47/c3/5347c37a5643968b6bc0d18ace6b9c76.jpg",
         "likes": 120
    
  },
  {
    "id": 8,
        "title": "day",
        "location": "Sakhret Al Rawshe Street",
        "date": "13th century",
        "category": "Streets",
        "src": "https://www.lebanontours.co/uploads/1/0/3/7/10373098/holidayme-lebanon-in-pictures-pigeonsrock-shutterstock-763094053-jpg.jpg",
        "likes": 195
    },
    {
        "id": "g2",
     "title": "night",
        "location": "Beirut Marina at Night",
         "date": "5th century",
         "category": "Streets",
        "src": "https://media-cdn.tripadvisor.com/media/photo-s/17/95/af/c4/beirut-marina-at-night.jpg",
        "likes": 95
    }
    
    



]

const PhotosPage = {
  photos: [],
  likedPhotos: new Set(),
  activeCategory: 'All',

  
  filterByCategory: function(category) {
    this.activeCategory = category;
    const filtered = category === 'All' 
      ? this.photos 
      : this.photos.filter(photo => photo.category === category);
    
    this.renderPhotos(filtered);
    this.updateCategoryButtons();
  },

  
  toggleLike: function(photoId) {
    if (this.likedPhotos.has(photoId)) {
      this.likedPhotos.delete(photoId);
    } else {
      this.likedPhotos.add(photoId);
    }
    this.updateLikeButton(photoId);
  },

  
  updateLikeButton: function(photoId) {
    const button = document.querySelector(`[data-photo-id="${photoId}"] .like-button`);
    const photo = this.photos.find(p => p.id === photoId);
    const isLiked = this.likedPhotos.has(photoId);
    
    if (button && photo) {
      button.classList.toggle('liked', isLiked);
      const likeCount = photo.likes + (isLiked ? 1 : 0);
      button.querySelector('.like-count').textContent = likeCount;
    }
  },

  
  renderPhotos: function(photos) {
    const grid = document.querySelector('.photo-grid');
    grid.innerHTML = photos.map(photo => `
      <div class="photo-card" data-photo-id="${photo.id}">
        <div class="photo-image">
          <img src="${photo.imageUrl}" alt="${photo.title}">
          <span class="photo-category">${photo.category}</span>
        </div>
        <div class="photo-content">
          <h3 class="photo-title">${photo.title}</h3>
          <div class="photo-meta">
            <span class="location">📍 ${photo.location}</span>
            <span class="date">📅 ${photo.date}</span>
          </div>
          <button class="like-button" onclick="PhotosPage.toggleLike(${photo.id})">
            <span class="heart-icon">♥</span>
            <span class="like-count">${photo.likes}</span>
          </button>
        </div>
      </div>
    `).join('');
  },

  
  updateCategoryButtons: function() {
    document.querySelectorAll('.category-badge').forEach(button => {
      button.classList.toggle('active', button.textContent === this.activeCategory);
    });
  },

  // Load photos from JSON
  loadPhotos: function(data) {
    this.photos = data;
    this.renderPhotos(data);
  },

  
  init: function() {
   
    fetch('/data/photos.json')
      .then(response => response.json())
      .then(data => this.loadPhotos(data))
      .catch(error => console.error('Error loading photos:', error));

    
    document.querySelectorAll('.category-badge').forEach(button => {
      button.addEventListener('click', (e) => {
        this.filterByCategory(e.target.textContent);
      });
    });
  }
};


document.addEventListener('DOMContentLoaded', () => {
  PhotosPage.init();
});
