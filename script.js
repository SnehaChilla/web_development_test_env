// =========================
// LOAD NAVBAR
// =========================

fetch("navbar.html")
.then(response => response.text())
.then(data => {

    document.getElementById("sidebar-container").innerHTML = data;

    initSidebar();
    initActiveLinks();
});

// =========================
// SIDEBAR FUNCTIONS
// =========================

function initSidebar(){

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");

    // Open Sidebar
    if(menuToggle){
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active");
        });
    }

    // Close Sidebar
    if(closeSidebar){
        closeSidebar.addEventListener("click", () => {
            sidebar.classList.remove("active");
        });
    }

    // Close sidebar after click in mobile
    document.querySelectorAll(".sidebar-links a").forEach(link => {

        link.addEventListener("click", () => {

            if(window.innerWidth < 992){
                sidebar.classList.remove("active");
            }
        });
    });
}

// =========================
// ACTIVE NAVBAR LINKS
// =========================

function initActiveLinks(){

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if(pageYOffset >= sectionTop){
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if(href && href.includes(current)){
                link.classList.add("active");
            }
        });
    });
}

// =========================
// SMOOTH SCROLL
// =========================

document.addEventListener("click", function(e){

    const targetLink = e.target.closest('a[href*="#"]');

    if(!targetLink) return;

    const href = targetLink.getAttribute("href");

    // Only smooth scroll for same page
    if(href.includes("#")){

        const id = href.split("#")[1];

        const targetSection = document.getElementById(id);

        if(targetSection){

            e.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
});

// =========================
// SCROLL TOP BUTTON
// =========================

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        scrollBtn.style.display = "flex";

    } else{

        scrollBtn.style.display = "none";
    }
});

if(scrollBtn){

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// =========================
// FADE ANIMATION
// =========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }
    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section, .glass-card, .info-card, .research-card, .achievement-card, .nss-card")
.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);
});