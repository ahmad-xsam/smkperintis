/* ==========================================================================
   PORTAL CORE INTERACTION - SMK PERINTIS KABUPATEN BANDUNG
   Features: GSAP Scroll Animations, Dynamic Themes, Counters, Slider Controls
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode / Light Mode Toggler Logic
    initThemeManager();

    // 2. Navbar Scrolling Aesthetic
    initNavbarScroll();

    // 3. GSAP Entry & Parallax Animations
    initGsapAnimations();

    // 4. Counter Statistics (ScrollTrigger-based)
    initStatsCounter();

    // 5. Digital Services Slider Left/Right Controls
    initServicesSlider();

    // 6. Interactive Mock Forms & Interactive Accordions
    initFormsAndAccordions();
    
    // 7. Mobile Navbar Active Status
    initMobileNavActive();
});

/**
 * Manage Dark/Light theme switching
 */
function initThemeManager() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
    
    if (!themeToggle || !themeIcon) return;

    // Retrieve saved theme preference or detect default system theme
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = savedTheme || systemTheme;

    // Apply the active theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        updateThemeIcon(nextTheme);

        // Subtle GSAP flash animation when switching themes
        gsap.fromTo("body", { opacity: 0.8 }, { opacity: 1, duration: 0.4 });
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "fas fa-sun";
            themeToggle.setAttribute("title", "Ganti ke Mode Terang");
        } else {
            themeIcon.className = "fas fa-moon";
            themeToggle.setAttribute("title", "Ganti ke Mode Gelap");
        }
    }
}

/**
 * Handle navbar compression on scroll
 */
function initNavbarScroll() {
    const mainNav = document.getElementById("mainNav");
    if (!mainNav) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            mainNav.classList.add("scrolled");
        } else {
            mainNav.classList.remove("scrolled");
        }
    });
}

/**
 * Initialize GSAP timelines and animations
 */
function initGsapAnimations() {
    // Check if gsap is loaded
    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded. Animations skipped.");
        return;
    }

    // Register ScrollTrigger and TextPlugin if available
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof TextPlugin !== "undefined") {
        gsap.registerPlugin(TextPlugin);
    }

    // A. Hero Entry Timeline (Only run if hero content is present on the page)
    if (document.querySelector(".hero-content")) {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        heroTl.from(".navbar-brand", { y: -20, opacity: 0, duration: 0.6 })
              .from(".nav-item", { y: -20, opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.3")
              .from(".hero-content h4", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
              .from(".hero-content h1", { scale: 0.95, opacity: 0, duration: 0.8 }, "-=0.4")
              .from(".hero-btn-group .btn", { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.4");
    }

    // Typewriting animation for school slogan in the hero
    const typedTarget = document.getElementById("typed");
    if (typedTarget && typeof TextPlugin !== "undefined") {
        const slogans = [
            "Sekolah Unggul, Berkarakter & Mandiri",
            "Menyiapkan Generasi Berkelayakan Kerja Tinggi",
            "Inovatif, Terampil & Berakhlakul Karimah"
        ];
        
        let sloganIndex = 0;
        let textTimeline = gsap.timeline({ repeat: -1 });

        slogans.forEach((slogan) => {
            textTimeline.to(typedTarget, {
                duration: 1.5,
                text: slogan,
                ease: "none"
            })
            .to({}, { duration: 2 }) // Pause after typing
            .to(typedTarget, {
                duration: 1,
                text: "",
                ease: "none"
            })
            .to({}, { duration: 0.5 }); // Short delay before next text
        });
    }

    // B. Scroll Trigger Animations for sections
    if (typeof ScrollTrigger !== "undefined") {
        // About Section Reveal
        gsap.from(".intro-text-col", {
            scrollTrigger: {
                trigger: "#tentang",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".intro-img-col", {
            scrollTrigger: {
                trigger: "#tentang",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // Stats Counter Lift
        gsap.from(".stats-bar", {
            scrollTrigger: {
                trigger: ".stats-bar",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.6
        });

        // Majors (Jurusan) Section Cards
        gsap.from(".major-card-wrapper", {
            scrollTrigger: {
                trigger: "#jurusan-highlight",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // PPDB Highlight Section
        gsap.from(".ppdb-banner", {
            scrollTrigger: {
                trigger: "#ppdb-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)"
        });

        // Service Digital Slider
        gsap.from(".service-scroll-item", {
            scrollTrigger: {
                trigger: "#layanan-digital",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            x: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
}

/**
 * Handle animated counts for statistics
 */
function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-number");
    if (stats.length === 0) return;

    if (typeof ScrollTrigger === "undefined") {
        // Fallback if ScrollTrigger is not present
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-count"), 10);
            stat.innerText = target.toLocaleString();
        });
        return;
    }

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-count"), 10);
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 95%",
            onEnter: () => {
                const countObj = { value: 0 };
                gsap.to(countObj, {
                    value: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        stat.innerText = Math.floor(countObj.value).toLocaleString() + (target === 10 ? "++" : "+");
                    }
                });
            },
            once: true
        });
    });
}

/**
 * Left/Right scrolling controls for the digital services slider
 */
function initServicesSlider() {
    const container = document.getElementById("serviceScrollContainer");
    const btnLeft = document.getElementById("slideLeftBtn");
    const btnRight = document.getElementById("slideRightBtn");

    if (!container || !btnLeft || !btnRight) return;

    // Scroll amounts
    const scrollAmount = 300;

    btnLeft.addEventListener("click", () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    btnRight.addEventListener("click", () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    // Disable/Enable buttons depending on scroll position
    const updateButtons = () => {
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Show/hide left button
        if (container.scrollLeft <= 5) {
            btnLeft.style.opacity = "0.5";
            btnLeft.style.pointerEvents = "none";
        } else {
            btnLeft.style.opacity = "1";
            btnLeft.style.pointerEvents = "auto";
        }

        // Show/hide right button
        if (container.scrollLeft >= maxScroll - 5) {
            btnRight.style.opacity = "0.5";
            btnRight.style.pointerEvents = "none";
        } else {
            btnRight.style.opacity = "1";
            btnRight.style.pointerEvents = "auto";
        }
    };

    container.addEventListener("scroll", updateButtons);
    // Initial check
    setTimeout(updateButtons, 200);
}

/**
 * Handle form submissions and accordion components
 */
function initFormsAndAccordions() {
    // A. PPDB Simulation Form Submit
    const ppdbForm = document.getElementById("ppdbSimForm");
    if (ppdbForm) {
        ppdbForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Get inputs
            const nama = document.getElementById("ppdbNama").value;
            const asal = document.getElementById("ppdbAsal").value;
            const jurusan = document.getElementById("ppdbJurusan").value;
            const email = document.getElementById("ppdbEmail").value;

            if (!nama || !asal || !email) {
                alert("Mohon lengkapi seluruh data formulir simulasi.");
                return;
            }

            // Create interactive loading visual
            const submitBtn = ppdbForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim Data...';

            setTimeout(() => {
                // Generate a random registration code
                const regCode = "REG-" + Math.floor(100000 + Math.random() * 900000);
                
                // Show success container
                const successContainer = document.getElementById("ppdbSuccessResult");
                if (successContainer) {
                    successContainer.innerHTML = `
                        <div class="alert alert-success mt-4 p-4 rounded-4" role="alert">
                            <h5 class="alert-heading fw-bold mb-2"><i class="fas fa-check-circle me-2"></i>Simulasi Pendaftaran Berhasil!</h5>
                            <p class="mb-3">Halo <strong>${nama}</strong>, simulasi pendaftaran Anda untuk program keahlian <strong>${jurusan}</strong> telah tercatat di sistem kami.</p>
                            <hr>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <span class="text-muted d-block small">Nomor Registrasi Simulasi:</span>
                                    <span class="fs-5 fw-bold text-success">${regCode}</span>
                                </div>
                                <div class="text-end">
                                    <span class="text-muted d-block small">Asal Sekolah:</span>
                                    <strong>${asal}</strong>
                                </div>
                            </div>
                            <p class="small text-muted mt-3 mb-0">*Ini adalah simulasi pendaftaran online. Untuk pendaftaran resmi, silakan hubungi Panitia PPDB di sekolah.</p>
                        </div>
                    `;
                    successContainer.scrollIntoView({ behavior: "smooth" });
                }

                // Reset form
                ppdbForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    // B. Contact Form Submit
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Mengirim Pesan...';

            setTimeout(() => {
                alert("Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1200);
        });
    }
}

/**
 * Set active status on mobile bottom navigation
 */
function initMobileNavActive() {
    const currentPath = window.location.pathname;
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    
    if (mobileNavItems.length === 0) return;
    
    mobileNavItems.forEach(item => {
        const href = item.getAttribute("href");
        if (currentPath.includes(href) && href !== "/") {
            item.classList.add("active");
        } else if (currentPath.endsWith("/") || currentPath.includes("index.html")) {
            if (href === "index.html" || href === "/") {
                item.classList.add("active");
            }
        }
    });
}
