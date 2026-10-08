/* YourPOS 360 · tanıtım sitesi: menü, kaydırınca görünme, telefon ekranı geçişleri, akan şerit */
(function () {
  var ust = document.querySelector('.ust');
  function kaydir() { if (ust) ust.classList.toggle('dolu', window.scrollY > 20); }
  window.addEventListener('scroll', kaydir, { passive: true }); kaydir();

  var hamb = document.querySelector('.hamb');
  if (hamb) hamb.addEventListener('click', function () {
    var a = document.body.classList.toggle('menu-acik');
    hamb.setAttribute('aria-expanded', a ? 'true' : 'false');
  });
  document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('menu-acik'); }); });

  // kaydırınca görünme
  var gor = document.querySelectorAll('.gor');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (l) {
      l.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('var'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    gor.forEach(function (e) { io.observe(e); });
  } else gor.forEach(function (e) { e.classList.add('var'); });

  // telefon ekranlarında sırayla değişen görüntüler
  var az = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.sira').forEach(function (s, i) {
    var l = s.querySelectorAll('img');
    if (l.length < 2 || az) return;
    var n = 0, sure = Number(s.getAttribute('data-sure')) || 2600;
    setTimeout(function () {
      setInterval(function () { l[n].classList.remove('on'); n = (n + 1) % l.length; l[n].classList.add('on'); }, sure);
    }, i * 450);
  });

  // akan şerit: kesintisiz döngü için içerik ikiye katlanır
  document.querySelectorAll('.serit').forEach(function (s) { s.innerHTML += s.innerHTML; });

  // yıl
  document.querySelectorAll('[data-yil]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();
