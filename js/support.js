document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

const pdfModal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const RUTA_DEL_PDF = 'manual/guia.pdf';

function openPdfModal() {
    if (pdfViewer) {
        pdfViewer.src = RUTA_DEL_PDF;
    }
    if (pdfModal) {
        pdfModal.classList.add('active');
    }
}

function closePdfModal() {
    if (pdfModal) {
        pdfModal.classList.remove('active');
    }
    setTimeout(() => {
        if (pdfViewer) {
            pdfViewer.src = '';
        }
    }, 300);
}

if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
}

const searchInput = document.getElementById('faqSearchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
            if (question.includes(query) || answer.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}
