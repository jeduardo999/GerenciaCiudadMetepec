// Inicializa mapa y contenido dinámico
document.addEventListener('DOMContentLoaded', function(){
  // Sistema de navegación
  const navBtns = document.querySelectorAll('.nav-btn, .back-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      const targetSection = this.getAttribute('data-section');
      navigateToSection(targetSection);
    });
  });

  // Función para navegar entre secciones
  function navigateToSection(sectionId){
    // Ocultar todas las secciones
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });
    // Mostrar sección activa
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botones de nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.nav-btn[data-section="${sectionId}"]`)?.classList.add('active');

    // Si es la página de nuestro trabajo, inicializar el mapa
    if(sectionId === 'nuestro-trabajo'){
      setTimeout(initMap, 100);
    }
  }

  // Función para inicializar el mapa
  function initMap(){
    if(typeof L === 'undefined' || !document.getElementById('map')) return;
    if(map) map.remove();
    
    const lat = 19.1778, lon = -99.5897;
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup('Gerencia de la Ciudad<br>Metepec').openPopup();
  }

  let map = null;

  // Estadísticas de ejemplo (puedes reemplazar con datos reales)
  const stats = {
    baches: 124,
    fugas: 37,
    luces: 89,
    basura: 42
  };

  document.getElementById('stat-baches').textContent = stats.baches;
  document.getElementById('stat-fugas').textContent = stats.fugas;
  document.getElementById('stat-luces').textContent = stats.luces;
  document.getElementById('stat-basura').textContent = stats.basura;

  // Notas (pueden cargarse desde una API)
  const notas = [
    'Se reforzó el bacheo en la avenida principal.',
    'Se programó revisión de redes de agua en la zona oriente.',
    'Campaña de limpieza en parques este sábado.'
  ];
  const notasList = document.getElementById('notas-list');
  notasList.innerHTML = notas.map(n => `<li>${n}</li>`).join('');
});
