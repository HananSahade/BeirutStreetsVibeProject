$(document).ready(function(){

  $(".nav-link").click(function(e){
    e.preventDefault();
    let target = $(this).data("target");

    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    $(".section").removeClass("active");
    $("#" + target).addClass("active");
    $("html, body").animate({scrollTop:0}, 400);
  });

 let cafes = [
  {name:"Cafe Hamra", img:"img/cafe hamra.jpg", map:"https://www.google.com/maps/place/Caf%C3%A9+Hamra/@33.8961757,35.4768301,17z/data=!3m1!4b1!4m6!3m5!1s0x151f172b219de009:0x63d30261f26741c5!8m2!3d33.8961757!4d35.479405!16s%2Fg%2F11cntr934p?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.5", desc:"A cozy spot in Hamra Street."},
  {name:"Em Sherif Cafe", img:"img/emsherif.jpg", map:"https://www.google.com/maps/place/Em+Sherif/@33.8888348,35.504823,17z/data=!3m1!4b1!4m6!3m5!1s0x151f171d8e4d02c3:0xe2d2d8a7661961e6!8m2!3d33.8888348!4d35.5073979!16s%2Fg%2F11by_x90k6?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.8", desc:"Elegant Lebanese ambiance."},
  // {name:"Kalei Coffee", img:"img/kalei.jpg", map:"https://www.google.com/maps/place/Kalei+Coffee+Co.+%7C+Rmeil/@33.8961562,35.5288071,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipM2ZDv-ipzwR5Sj-wM-Xm_pUWaeJJ495LjKqjuA!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipM2ZDv-ipzwR5Sj-wM-Xm_pUWaeJJ495LjKqjuA%3Dw152-h86-k-no!7i1486!8i837!4m11!1m2!2m1!1sKalei+Coffee+Co.!3m7!1s0x151f165beb57bd17:0x61f2c108e112d66!8m2!3d33.8961131!4d35.5288655!10e5!15sChBLYWxlaSBDb2ZmZWUgQ28uIgOIAQFaESIPa2FsZWkgY29mZmVlIGNvkgELY29mZmVlX3Nob3DgAQA!16s%2Fg%2F11c54b6ktt?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.7", desc:"Authentic specialty coffee."},
  {name:"Urbanista", img:"img/urbanista.jpg", map:"https://www.google.com/maps/search/Urbanista/@33.8918343,35.511489,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.6", desc:"Coffee, cowork, and brunch."},
  {name:"Ka3kaya Café", img:"img/ka3kaya.jpg", map:"https://www.google.com/maps/place/Ka3kaya/@33.89627,35.4796748,17z/data=!3m1!4b1!4m6!3m5!1s0x151f172a44450529:0x67dd9e39e935adf0!8m2!3d33.89627!4d35.4822497!16s%2Fg%2F1vx88gnk?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.4", desc:"Outdoor vibes & Lebanese snacks."},
  {name:"Tawlet - Souk El Tayeb", img:"img/tawlet.jpg", map:"https://www.google.com/maps/search/tawlet+souk+el+tayeb/@33.8970807,35.5264486,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.7", desc:"Authentic local Lebanese food."},
  {name:"Café Younes", img:"img/café younes.jpg", map:"https://www.google.com/maps/search/Cafe+Younes/@33.8970789,35.5084239,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.8", desc:"Legendary Lebanese café since 1935."},
  {name:"Em Nazih", img:"img/em nazih.jpg", map:"https://www.google.com/maps/place/Bayt+Em+Nazih/@33.8958629,35.4836904,17z/data=!3m1!4b1!4m6!3m5!1s0x151f1729cd1c5ad1:0xa7529733382b5a6a!8m2!3d33.8958629!4d35.4862653!16s%2Fg%2F11cs23ycbp?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.6", desc:"Traditional food & live culture."},
  {name:"Frosty Palace", img:"img/frosty.jpg", map:"https://www.google.com/maps/place/Frosty+Palace/@33.8978912,35.5229415,17z/data=!3m1!4b1!4m6!3m5!1s0x151f165fa151745b:0xb4e57f0e953ce66f!8m2!3d33.8978912!4d35.5255164!16s%2Fg%2F11cn9f542p?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.5", desc:"Retro burgers and coffee."},
  {name:"Beit El Kell", img:"img/beit el kill.webp", map:"https://www.google.com/maps/search/beit+el+kell/@33.6607414,35.1802161,10z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.9", desc:"Authentic Lebanese dining experience."},
  {name:"Sip Beirut", img:"img/sip beirut.jpg", map:"https://www.google.com/maps/place/SIP/@33.8950116,35.5106565,17z/data=!3m1!4b1!4m6!3m5!1s0x151f16fb2848aed3:0x189ddde6f327ced4!8m2!3d33.8950117!4d35.5152699!16s%2Fg%2F11f_fw79lx?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D", rating:"⭐ 4.5", desc:"Artsy coffee & workspace spot."}
];
function renderCafes(list) {
  $("#cafes-list").empty();  
  list.forEach(function(cafe){
    $("#cafes-list").append(`
      <a href="${cafe.map}" target="_blank" class="location-card">
        <img src="${cafe.img}" alt="${cafe.name}">
        <div class="location-content">
          <h3 class="location-title">${cafe.name}</h3>
          <p class="location-description">${cafe.desc}</p>
          <p class="location-coords">${cafe.rating}</p>
        </div>
      </a>`);
  });
}
$("#searchInput").on("keyup", function(){
  let q = $(this).val().toLowerCase().trim();
  let filtered = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(q)
  );
  renderCafes(filtered);
});
  cafes.forEach(function(cafe){
    $("#cafes-list").append(`
      <a href="${cafe.map}" target="_blank" class="location-card no-link-style">
        <img src="${cafe.img}" alt="${cafe.name}">
        <div class="location-content">
          <h3 class="location-title">${cafe.name}</h3>
          <p class="location-description">${cafe.desc}</p>
          <p class="location-coords">${cafe.rating}</p>
        </div>
      </a>
    `);
  });
  $("#contactForm").submit(function(e){
    e.preventDefault();
    $("#message").text(`Thanks ${$("#name").val()}! Your story was submitted.`);
    $(this).trigger("reset");
  });
  let btn = $("#scrollTopBtn");
  $(window).scroll(function(){
    if($(window).scrollTop() > 300) btn.show(); else btn.hide();
  });
  btn.click(function(){ $("html, body").animate({scrollTop:0}, 400); });

});
