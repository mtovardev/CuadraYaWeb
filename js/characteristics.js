function switchCharPlatform(platform) {
    const pcGrid = document.getElementById('char-pc');
    const mobileGrid = document.getElementById('char-mobile');
    const btnPc = document.getElementById('btn-char-pc');
    const btnMobile = document.getElementById('btn-char-mobile');

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
