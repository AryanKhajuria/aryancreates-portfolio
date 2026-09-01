const cards=document.querySelectorAll(".card");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.06});cards.forEach(x=>io.observe(x));document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");let f=b.dataset.f;cards.forEach(c=>c.classList.toggle("hidden",f!="all"&&c.dataset.c!=f))});document.querySelectorAll(".video button").forEach(b=>b.onclick=async()=>{let v=b.parentElement.querySelector("video");try{if(v.requestFullscreen)await v.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}catch(e){}});
/* V17 scroll reveal: animations replay whenever elements enter/leave the viewport.
   Direction changes based on scroll direction. */
(function(){
  const items = document.querySelectorAll(
    '.card, .service-list span, .whygrid > div, .contact-option, .section > .label, .intro, .services-section > h2, .why > h2, .contact > h2'
  );
  if (!items.length || !('IntersectionObserver' in window)) return;

  let lastY = window.scrollY;
  let direction = 'down';

  const updateDirection = () => {
    const y = window.scrollY;
    direction = y >= lastY ? 'down' : 'up';
    lastY = y;
  };
  window.addEventListener('scroll', updateDirection, {passive:true});

  items.forEach((el,i)=>{
    el.classList.add('reveal-on-scroll');
    el.dataset.delay = String(i % 4);
  });

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.toggle('from-bottom', direction === 'up');
        entry.target.classList.add('is-visible');
      } else {
        // Reset so the animation plays again every time it re-enters.
        entry.target.classList.remove('is-visible');
      }
    });
  }, {threshold:0.12, rootMargin:'-5% 0px -8% 0px'});

  items.forEach(el=>observer.observe(el));
})();
