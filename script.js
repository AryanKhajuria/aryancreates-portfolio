const cards=document.querySelectorAll(".card");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.06});cards.forEach(x=>io.observe(x));document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");let f=b.dataset.f;cards.forEach(c=>c.classList.toggle("hidden",f!="all"&&c.dataset.c!=f))});document.querySelectorAll(".video button").forEach(b=>b.onclick=async()=>{let v=b.parentElement.querySelector("video");try{if(v.requestFullscreen)await v.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}catch(e){}});

/* V18 — consistent smooth reveal for every animated section */
(function(){
  if (window.__aryanRevealInitialized) return;
  window.__aryanRevealInitialized = true;

  const items = document.querySelectorAll(
    '.card, .service-list span, .whygrid > div, .contact-option, ' +
    '.section > .label, .intro, .services-section > h2, .why > h2, ' +
    '.contact > h2, .contact-lead'
  );
  if (!items.length || !('IntersectionObserver' in window)) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  let lastY = window.scrollY || 0;
  let direction = 'down';

  window.addEventListener('scroll', function(){
    const y = window.scrollY || 0;
    direction = y >= lastY ? 'down' : 'up';
    lastY = y;
  }, {passive:true});

  items.forEach(function(el, i){
    el.classList.add('reveal-on-scroll');
    el.dataset.delay = String(i % 4);
  });

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.toggle('from-bottom', direction === 'up');
        requestAnimationFrame(function(){
          entry.target.classList.add('is-visible');
        });
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold:0.10,
    rootMargin:'-6% 0px -8% 0px'
  });

  items.forEach(function(el){ observer.observe(el); });
})();
