/* -------------------------
   Menu burger (mobile)
   ------------------------- */
function toggleMobileMenu(burgerId, navId) {
  const burger = document.getElementById(burgerId);
  const nav = document.getElementById(navId);
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '1rem';
    nav.style.background = 'white';
    nav.style.padding = '1rem';
    nav.style.position = 'absolute';
    nav.style.right = '1rem';
    nav.style.top = '64px';
    nav.style.boxShadow = isOpen ? '' : '0 8px 24px rgba(0,0,0,0.08)';
  });
}
toggleMobileMenu('burger','nav');
toggleMobileMenu('burger2','nav2');

/* -------------------------
   Gallery thumbnails (product page)
   ------------------------- */
const thumbs = document.querySelectorAll('.thumb');
const currentImage = document.getElementById('currentImage');

if (thumbs && currentImage) {
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      // swap image
      const img = btn.querySelector('img');
      if (!img) return;
      currentImage.src = img.src;
      // active styling
      thumbs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* -------------------------
   Intersection Observer : apparitions douces des sections
   ------------------------- */
const sections = document.querySelectorAll('.section');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0px)';
        e.target.style.transition = 'all 0.7s cubic-bezier(.2,.8,.2,1)';
      } else {
        e.target.style.opacity = 0.01;
        e.target.style.transform = 'translateY(24px)';
      }
    });
  }, {threshold: 0.15});

  sections.forEach(s => {
    s.style.opacity = 0.01;
    s.style.transform = 'translateY(24px)';
    io.observe(s);
  });
}

/* -------------------------
   Formulaire : sauvegarde locale + message
   (Remplace par envoi serveur / webhook plus tard)
   ------------------------- */
function handleForm(formId, messageId) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(messageId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {};
    data.forEach((v,k) => payload[k]=v);

    // stockage local (simulé) + message à l'utilisateur
    const saved = JSON.parse(localStorage.getItem('korbox_preorders') || '[]');
    saved.push({...payload, date: new Date().toISOString()});
    localStorage.setItem('korbox_preorders', JSON.stringify(saved));

    if (msg) {
      msg.textContent = 'Merci ! Ta précommande est enregistrée. Tu recevras un email de confirmation.';
    }

    // reset du formulaire visuellement
    form.reset();
  });
}
handleForm('preorderForm', 'formMessage');
handleForm('preorderFormProduct', 'productFormMessage');

/* -------------------------
   Précommande rapide depuis index cards
   (ouvre ancre commande)
   ------------------------- */
document.querySelectorAll('a[href="#commande"]').forEach(a => {
  a.addEventListener('click', (e) => {
    // default anchor behavior is fine; this ensures smooth scroll
    e.preventDefault();
    const el = document.getElementById('commande');
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* -------------------------
   Bouton "Précommander" product page
   ouvre l'ancre de formulaire
   ------------------------- */
const openPreorder = document.getElementById('openPreorder');
if (openPreorder) {
  openPreorder.addEventListener('click', () => {
    const el = document.getElementById('commande');
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
}
