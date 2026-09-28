/* ==========================================================================
   Salon website behavior — vanilla JS only.
   Reads all salon-specific content from window.SALON_CONFIG
   (see data/salon-config.js). Nothing salon-specific is hardcoded here.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SALON_CONFIG;
  if (!CFG) return;

  var STAR_SVG =
    '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z"/></svg>';

  /* ---------------------------------------------------------------------
     WhatsApp helper
     ------------------------------------------------------------------- */
  function whatsappUrl(message) {
    var text = encodeURIComponent(message || "Hi, I'd like to book an appointment.");
    return "https://wa.me/" + CFG.business.whatsappIntl + "?text=" + text;
  }

  function bindWhatsappButtons() {
    document.querySelectorAll("[data-wa-message]").forEach(function (el) {
      var msg = el.getAttribute("data-wa-message").replace("{salon}", CFG.business.name);
      el.setAttribute("href", whatsappUrl(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---------------------------------------------------------------------
     Basic text / link injection from config
     ------------------------------------------------------------------- */
  function fillTextBindings() {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var path = el.getAttribute("data-bind").split(".");
      var value = CFG;
      for (var i = 0; i < path.length; i++) {
        if (value == null) break;
        value = value[path[i]];
      }
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll("[data-href]").forEach(function (el) {
      var path = el.getAttribute("data-href").split(".");
      var value = CFG;
      for (var i = 0; i < path.length; i++) {
        if (value == null) break;
        value = value[path[i]];
      }
      if (value != null) el.setAttribute("href", value);
    });

    document.title = CFG.seo.title;
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
     Image fallback
     ------------------------------------------------------------------- */
  function withImageFallback(imgEl, label) {
    function fail() {
      var wrap = document.createElement("div");
      wrap.className = "placeholder-art w-full h-full text-sm";
      wrap.setAttribute("role", "img");
      wrap.setAttribute("aria-label", label || "Image coming soon");
      wrap.textContent = label || "Image coming soon";
      imgEl.replaceWith(wrap);
    }
    // If the browser already finished (and failed) loading this image
    // before this code ran — very likely for images written directly in
    // the HTML, since the fetch starts as soon as the parser sees the
    // tag, well before DOMContentLoaded — handle it immediately instead
    // of waiting for an "error" event that has already fired and won't
    // fire again.
    if (imgEl.complete && imgEl.naturalWidth === 0) {
      fail();
    } else {
      imgEl.addEventListener("error", fail);
    }
  }

  /* ---------------------------------------------------------------------
     Logo
     ------------------------------------------------------------------- */
  function setupLogo() {
    document.querySelectorAll("[data-logo]").forEach(function (slot) {
      var img = document.createElement("img");
      img.src = CFG.branding.logo;
      img.alt = CFG.business.name + " logo";
      img.className = slot.getAttribute("data-logo-class") || "h-10 w-auto";
      function useWordmark() {
        var word = document.createElement("span");
        word.className = "font-display text-xl tracking-wideish";
        word.textContent = CFG.business.shortName;
        img.replaceWith(word);
      }
      img.addEventListener("error", useWordmark);
      slot.appendChild(img);
      if (img.complete && img.naturalWidth === 0) useWordmark();
    });
  }

  /* ---------------------------------------------------------------------
     Hero / About images
     ------------------------------------------------------------------- */
  function setupHeroImage() {
    var hero = document.getElementById("hero-image");
    if (hero) withImageFallback(hero, "Bridal hero photograph");
    var about = document.getElementById("about-image");
    if (about) withImageFallback(about, "Salon interior / portrait");
  }

  /* ---------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------- */
  function setupNav() {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");

    function onScroll() {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("flex");
        menu.classList.toggle("hidden");
        toggle.setAttribute("aria-expanded", String(!menu.classList.contains("hidden")));
      });
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.add("hidden");
          menu.classList.remove("flex");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Opening hours
     ------------------------------------------------------------------- */
  function renderHours() {
    var list = document.getElementById("hours-list");
    if (!list) return;
    var today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    list.innerHTML = CFG.openingHours
      .map(function (row) {
        var isToday = row.day === today;
        return (
          '<li class="flex items-center justify-between py-2.5 border-b border-ink/10 last:border-none' +
          (isToday ? " text-primary font-semibold" : "") +
          '">' +
          '<span>' + row.day + '</span><span>' + row.hours + '</span></li>'
        );
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     Expertise / certifications
     ------------------------------------------------------------------- */
  function renderExpertise() {
    var grid = document.getElementById("expertise-grid");
    if (!grid) return;
    grid.innerHTML = CFG.expertise
      .map(function (item) {
        return (
          '<div class="reveal border-t border-accent/40 pt-5">' +
          '<h3 class="font-display text-lg mb-1.5">' + item.title + '</h3>' +
          '<p class="text-ink-soft text-sm leading-relaxed">' + item.detail + '</p>' +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     Services
     ------------------------------------------------------------------- */
  function priceLabel(item) {
    if (item.priceType === "exact") return item.price;
    if (item.priceType === "starting") return "Starting from " + item.price;
    if (item.priceType === "custom") return item.price;
    return "Contact for pricing";
  }

  function renderServices() {
    var wrap = document.getElementById("services-wrap");
    if (!wrap) return;
    wrap.innerHTML = CFG.serviceCategories
      .map(function (cat) {
        var rows = cat.services
          .map(function (s) {
            return (
              '<div class="flex items-baseline justify-between gap-4 py-3 border-b border-ink/10 last:border-none">' +
              '<div><p class="font-medium">' + s.name + "</p>" +
              (s.description ? '<p class="text-sm text-ink-soft mt-0.5">' + s.description + "</p>" : "") +
              "</div>" +
              '<p class="whitespace-nowrap text-sm text-accent-dark font-semibold">' + priceLabel(s) + "</p>" +
              "</div>"
            );
          })
          .join("");
        return (
          '<div class="reveal">' +
          '<h3 class="font-display text-2xl mb-4">' + cat.category + "</h3>" +
          "<div>" + rows + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     Bridal packages — image wired with fallback; price uses a color that
     stays visible on the burgundy background this section sits on.
     ------------------------------------------------------------------- */
  function renderPackages() {
    var wrap = document.getElementById("packages-wrap");
    if (!wrap) return;
    wrap.innerHTML = CFG.bridalPackages
      .map(function (pkg, i) {
        var includes = pkg.includes
          .map(function (inc) { return '<li class="flex gap-2"><span class="text-accent">—</span>' + inc + "</li>"; })
          .join("");
        return (
          '<article class="reveal grid md:grid-cols-5 gap-8 items-center' + (i > 0 ? " pt-12 mt-12 border-t border-accent/30" : "") + '">' +
          '<div class="md:col-span-2 frame aspect-[4/5]">' +
          '<img src="' + pkg.image + '" alt="' + pkg.name + '" class="pkg-image w-full h-full object-cover" data-pkg-label="' + pkg.name + '" loading="lazy" />' +
          "</div>" +
          '<div class="md:col-span-3">' +
          (pkg.isPlaceholder ? '<p class="section-eyebrow mb-2">Configurable — confirm inclusions</p>' : "") +
          '<h3 class="font-display text-3xl mb-3">' + pkg.name + "</h3>" +
          '<p class="text-secondary-light mb-4 opacity-90">' + pkg.description + "</p>" +
          '<ul class="space-y-1.5 text-sm mb-6 text-surface">' + includes + "</ul>" +
          '<div class="flex flex-wrap items-center gap-6">' +
          (pkg.priceType === "contact" ? "" : '<span class="font-display text-xl text-secondary">' + priceLabel(pkg) + "</span>") +
          '<a href="#" class="btn btn-outline-light text-sm" data-wa-message="Hi, I\'d like to inquire about the ' + pkg.name + ' at {salon}.">Inquire on WhatsApp</a>' +
          "</div></div></article>"
        );
      })
      .join("");
    wrap.querySelectorAll(".pkg-image").forEach(function (img) {
      withImageFallback(img, img.getAttribute("data-pkg-label"));
    });
    bindWhatsappButtons();
  }

  /* ---------------------------------------------------------------------
     Image grids (bridal portfolio + gallery)
     ------------------------------------------------------------------- */
  function renderImageGrid(containerId, items, emptyMessage, layout) {
    layout = layout || "grid";
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    if (!items || items.length === 0) {
      wrap.innerHTML =
        '<div class="' + (layout === "scroll" ? "w-full" : "col-span-full") + ' text-center py-16 text-ink-soft border border-dashed border-ink/20">' +
        "<p class=\"font-display text-xl mb-2\">" + emptyMessage + "</p>" +
        '<p class="text-sm">Add images to this section in data/salon-config.js.</p></div>';
      return;
    }
    var itemClass =
      layout === "scroll"
        ? "frame snap-start shrink-0 w-[70%] sm:w-[46%] md:w-[32%] lg:w-[23%] aspect-[3/4]"
        : "frame aspect-square w-full";
    wrap.innerHTML = items
      .map(function (item, idx) {
        return (
          '<button type="button" class="' + itemClass + ' text-left" data-lightbox-index="' + idx + '" data-lightbox-group="' + containerId + '">' +
          '<img src="' + item.src + '" alt="' + (item.alt || "") + '" loading="lazy" width="600" height="600" class="w-full h-full object-cover" />' +
          "</button>"
        );
      })
      .join("");
    wrap.querySelectorAll("img").forEach(function (img) {
      withImageFallback(img, img.getAttribute("alt"));
    });
  }

  /* ---------------------------------------------------------------------
     Horizontal-scroll nav arrows (Bridal Portfolio)
     ------------------------------------------------------------------- */
  function setupScrollNav() {
    document.querySelectorAll("[data-scroll-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-scroll-target"));
        if (!target) return;
        var dir = Number(btn.getAttribute("data-scroll-dir")) || 1;
        target.scrollBy({ left: target.clientWidth * 0.8 * dir, behavior: "smooth" });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Testimonials — real, attributed reviews only.
     ------------------------------------------------------------------- */
  function renderTestimonials() {
    var wrap = document.getElementById("testimonials-wrap");
    if (!wrap) return;
    if (!CFG.testimonials || CFG.testimonials.length === 0) {
      var url = CFG.googleReviewsUrl;
      wrap.innerHTML =
        '<div class="col-span-full text-center max-w-prose mx-auto">' +
        '<p class="font-display text-2xl mb-4">Reviews from our clients, on Google.</p>' +
        '<p class="text-ink-soft mb-6">Real testimonials will appear here once added to the site configuration.</p>' +
        (url
          ? '<a href="' + url + '" target="_blank" rel="noopener" class="btn btn-outline">See our Google Reviews</a>'
          : "") +
        "</div>";
      return;
    }
    wrap.innerHTML = CFG.testimonials
      .map(function (t) {
        var initial = t.name.trim().charAt(0).toUpperCase();
        var metaParts = [];
        if (t.isLocalGuide) metaParts.push("Local Guide");
        metaParts.push(t.reviewCount + (t.reviewCount === 1 ? " review" : " reviews"));
        metaParts.push(t.photoCount + (t.photoCount === 1 ? " photo" : " photos"));
        var stars = "";
        for (var i = 0; i < (t.rating || 5); i++) stars += STAR_SVG;
        return (
          '<figure class="reveal border border-ink/10 bg-surface p-6">' +
          '<div class="flex items-center gap-3 mb-3">' +
          '<span class="review-avatar">' + initial + "</span>" +
          "<div>" +
          '<figcaption class="font-medium leading-tight">' + t.name + "</figcaption>" +
          '<p class="text-xs text-ink-soft">' + metaParts.join(" · ") + "</p>" +
          "</div></div>" +
          '<div class="review-stars flex gap-0.5 mb-3">' + stars + "</div>" +
          '<blockquote class="text-sm leading-relaxed mb-3">"' + t.text + '"</blockquote>' +
          '<p class="text-xs text-ink-soft">' + t.date + "</p>" +
          "</figure>"
        );
      })
      .join("");
  }

  /* ---------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------- */
  function setupLightbox() {
    var overlay = document.getElementById("lightbox");
    var img = document.getElementById("lightbox-image");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    if (!overlay || !img) return;

    var currentGroup = [];
    var currentIndex = 0;

    function open(groupId, index) {
      var items = groupId === "gallery-grid" ? CFG.gallery : CFG.bridalPortfolio;
      currentGroup = items;
      currentIndex = index;
      show();
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function show() {
      var item = currentGroup[currentIndex];
      if (!item) return;
      img.src = item.src;
      img.alt = item.alt || "";
    }

    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function step(delta) {
      currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
      show();
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-lightbox-index]");
      if (trigger) {
        open(trigger.getAttribute("data-lightbox-group"), Number(trigger.getAttribute("data-lightbox-index")));
      }
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });

    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------------------------------------------------------------------
     Structured data
     ------------------------------------------------------------------- */
  function injectStructuredData() {
    var data = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: CFG.business.name,
      image: CFG.branding.logo,
      telephone: "+" + CFG.business.phoneIntl,
      address: {
        "@type": "PostalAddress",
        streetAddress: CFG.business.addressLines[0],
        addressLocality: CFG.business.city,
        addressCountry: CFG.business.country
      },
      url: CFG.seo.canonicalUrl,
      sameAs: [CFG.social.instagram, CFG.social.facebook].filter(Boolean),
      openingHours: CFG.openingHours
        .filter(function (row) { return row.hours !== "Closed"; })
        .map(function (row) { return row.day.slice(0, 2) + " " + row.hours.replace(/\s?[AP]M/g, ""); })
    };
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ---------------------------------------------------------------------
     Init
     ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    fillTextBindings();
    setupLogo();
    setupHeroImage();
    setupNav();
    renderHours();
    renderExpertise();
    renderServices();
    renderPackages();
    renderImageGrid("portfolio-grid", CFG.bridalPortfolio, "Bridal portfolio coming soon", "scroll");
    renderImageGrid("gallery-grid", CFG.gallery, "Gallery coming soon", "scroll");
    renderTestimonials();
    setupLightbox();
    setupScrollNav();
    bindWhatsappButtons();
    setupReveal();
    injectStructuredData();
  });
})();
