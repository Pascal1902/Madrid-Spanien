

document.addEventListener('DOMContentLoaded', () => {

  
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    const revealElements = document.querySelectorAll(
        'section, .card, .kontakt-card, .galerie-item, .stats-row, .kultur-tags'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

  
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar ul a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.style.color = '');
                const activeLink = document.querySelector(`#navbar ul a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.style.color = 'var(--gold-light)';
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));


    document.querySelectorAll('.galerie-placeholder').forEach(el => {
        el.addEventListener('click', () => {
            const label = el.getAttribute('data-label');
            el.style.outline = '2px solid var(--gold)';
            setTimeout(() => el.style.outline = '', 600);
            console.log(`Galerie-Bild gewählt: ${label} — Bild in bilder/ ablegen und src im HTML ergänzen.`);
        });
    });


    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#ueber');
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    }


    console.log('%c🇪🇸 Madrid Website geladen!', 'color:#C8973A; font-size:1.2rem; font-weight:bold;');
    console.log('%cTipp: Bilder in bilder/ und Audio in audio/ ablegen.', 'color:#7A6A52;');
});



function triggerUpload(wrapper) {
    // Nur den File-Input öffnen, nicht wenn Remove-Button geklickt
    wrapper.querySelector('.file-input').click();
}

function loadImage(event, input) {
    const file = event.target.files[0];
    if (!file) return;

    const wrapper = input.closest('.galerie-upload');
    const preview = wrapper.querySelector('.upload-preview');
    const placeholder = wrapper.querySelector('.upload-placeholder');
    const removeBtn = wrapper.querySelector('.remove-btn');

    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        removeBtn.style.display = 'flex';
        wrapper.classList.add('has-image');
    };
    reader.readAsDataURL(file);
}

function removeImage(event, btn) {
    event.stopPropagation(); // verhindert, dass der Upload-Dialog aufgeht
    const wrapper = btn.closest('.galerie-upload');
    const preview = wrapper.querySelector('.upload-preview');
    const placeholder = wrapper.querySelector('.upload-placeholder');
    const fileInput = wrapper.querySelector('.file-input');

    preview.src = '';
    preview.style.display = 'none';
    placeholder.style.display = 'flex';
    btn.style.display = 'none';
    wrapper.classList.remove('has-image');
    fileInput.value = '';
}
