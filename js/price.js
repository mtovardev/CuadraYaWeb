const contactModal = document.getElementById('contactModal');
const selectedPlanInput = document.getElementById('selectedPlan');

function switchPricingPlatform(platform) {
    const pcGrid = document.getElementById('pricing-pc');
    const mobileGrid = document.getElementById('pricing-mobile');
    const btnPc = document.getElementById('btn-toggle-pc');
    const btnMobile = document.getElementById('btn-toggle-mobile');

    if (platform === 'pc') {
        if (pcGrid) pcGrid.style.display = 'grid';
        if (mobileGrid) mobileGrid.style.display = 'none';
        if (btnPc) btnPc.classList.add('active');
        if (btnMobile) btnMobile.classList.remove('active');
    } else {
        if (pcGrid) pcGrid.style.display = 'none';
        if (mobileGrid) mobileGrid.style.display = 'grid';
        if (btnMobile) btnMobile.classList.add('active');
        if (btnPc) btnPc.classList.remove('active');
    }
}

function openContactModal(planName) {
    if (selectedPlanInput) {
        selectedPlanInput.value = planName;
    }
    if (contactModal) {
        contactModal.classList.add('active');
    }
}

function closeContactModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
    }
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.reset();
    }
}

if (contactModal) {
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
}

function sendToWhatsApp(event) {
    event.preventDefault();
    const phone = "584125527746";
    const comercio = document.getElementById('comercioName')?.value || '';
    const telefono = document.getElementById('phoneNumber')?.value || '';
    const plan = selectedPlanInput?.value || '';

    const text = `¡Hola! Me interesa el *${plan}* de CuadraYa.%0A%0A*Nombre del Comercio:* ${encodeURIComponent(comercio)}%0A*Mi Teléfono:* ${encodeURIComponent(telefono)}%0A%0AQuiero activar mi cuenta.`;
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank');
    closeContactModal();
}
