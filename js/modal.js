/**
 * CuadraYa - Modal de Descargas Multiplataforma
 * Soporta: Windows (.exe), Linux (.deb), Android (.apk)
 * Resuelve dinámicamente las últimas versiones de GitHub Releases.
 */

(function () {
    // Enlaces de descarga predeterminados (Fallback inmediato sincronizado con CuadraYa-Update)
    const REPO_UPDATE = 'mtovardev/CuadraYa-Update';
    const REPO_ANDROID = 'mtovardev/CuadraYa-App';

    let downloadUrls = {
        windows: `https://github.com/${REPO_UPDATE}/releases/download/v0.2.3/CuadraYa_0.2.3_x64-setup.exe`,
        linux: `https://github.com/${REPO_UPDATE}/releases/download/v0.2.3/CuadraYa_0.2.3_amd64.deb`,
        android: `https://github.com/${REPO_ANDROID}/releases/latest/download/app-release.apk`
    };

    let latestDesktopVersion = 'v0.2.3';

    // HTML del Modal
    const modalHTML = `
    <div id="download-modal" class="download-modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="download-modal-container">
            <button class="modal-close-btn" id="modal-close-btn" aria-label="Cerrar">&times;</button>
            
            <div class="modal-header">
                <span class="modal-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Descarga Oficial
                </span>
                <h2>Elige tu Sistema Operativo</h2>
                <p>Selecciona tu dispositivo para obtener la versión oficial más reciente con sincronización y soporte completo.</p>
            </div>

            <div class="modal-platforms-grid">
                <!-- Tarjeta Windows -->
                <div class="platform-card card-windows">
                    <div class="platform-icon-wrapper">
                        <!-- Windows Logo SVG -->
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.801"/>
                        </svg>
                    </div>
                    <h3>Windows</h3>
                    <span class="platform-format-tag">Instalador .exe</span>
                    <p>Compatible con Windows 10 y Windows 11 (64-bit). Cierre Z, gaveta de dinero y tickets térmicos.</p>
                    <a href="${downloadUrls.windows}" id="btn-dl-windows" class="btn-platform-download" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Descargar .EXE
                    </a>
                </div>

                <!-- Tarjeta Linux -->
                <div class="platform-card card-linux">
                    <div class="platform-icon-wrapper">
                        <!-- Linux Tux SVG -->
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a4 4 0 0 0-4 4c0 .8.2 1.5.6 2.1C6.2 9.5 5 11.6 5 14c0 1.2.3 2.3.9 3.3-.6.6-1 1.5-1 2.4 0 1.8 1.8 3.3 4.1 3.3h6c2.3 0 4.1-1.5 4.1-3.3 0-.9-.4-1.8-1-2.4.6-1 .9-2.1.9-3.3 0-2.4-1.2-4.5-3.6-5.9.4-.6.6-1.3.6-2.1a4 4 0 0 0-4-4zm-1.5 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                    </div>
                    <h3>Linux</h3>
                    <span class="platform-format-tag">Paquete .deb</span>
                    <p>Compatible con Ubuntu, Linux Mint, Debian y derivados de 64-bit. Rendimiento ultra-ligero y offline.</p>
                    <a href="${downloadUrls.linux}" id="btn-dl-linux" class="btn-platform-download" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Descargar .DEB
                    </a>
                </div>

                <!-- Tarjeta Android -->
                <div class="platform-card card-android">
                    <div class="platform-icon-wrapper">
                        <!-- Android Robot SVG -->
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.72 1.23 12.88 1 12 1s-1.72.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.67 3.31 5.3 5.4 5.09 7.8h13.82c-.21-2.4-1.58-4.49-3.38-5.64zM9 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                        </svg>
                    </div>
                    <h3>Android</h3>
                    <span class="platform-format-tag">Archivo .apk</span>
                    <p>Ideal para teléfonos y tablets Android (versión 8.0 o superior). Control de ventas desde el mostrador o calle.</p>
                    <a href="${downloadUrls.android}" id="btn-dl-android" class="btn-platform-download" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Descargar APK
                    </a>
                </div>
            </div>

            <div class="modal-footer-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span id="version-label">Versión actual: ${latestDesktopVersion} • Actualizaciones silenciosas automáticas incluidas</span>
            </div>
        </div>
    </div>
    `;

    // Inyectar en el documento
    function injectModal() {
        if (!document.getElementById('download-modal')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = modalHTML;
            document.body.appendChild(wrapper.firstElementChild);
            bindModalEvents();
            fetchLatestReleases();
        }
    }

    // Consulta dinámica continua a version.json y GitHub Releases API para siempre obtener las últimas versiones
    async function fetchLatestReleases() {
        try {
            // 1. Consulta directa al version.json público de CuadraYa-Update
            const vRes = await fetch(`https://raw.githubusercontent.com/${REPO_UPDATE}/main/version.json?t=${Date.now()}`);
            if (vRes.ok) {
                const vData = await vRes.json();
                if (vData.version) {
                    latestDesktopVersion = vData.version;
                }
                if (vData.platforms && vData.platforms['windows-x86_64'] && vData.platforms['windows-x86_64'].url) {
                    downloadUrls.windows = vData.platforms['windows-x86_64'].url;
                    const btnWin = document.getElementById('btn-dl-windows');
                    if (btnWin) btnWin.href = downloadUrls.windows;
                }
                if (vData.platforms && vData.platforms['linux-x86_64'] && vData.platforms['linux-x86_64'].url) {
                    downloadUrls.linux = vData.platforms['linux-x86_64'].url;
                    const btnLin = document.getElementById('btn-dl-linux');
                    if (btnLin) btnLin.href = downloadUrls.linux;
                }
                const versionLabel = document.getElementById('version-label');
                if (versionLabel) {
                    versionLabel.textContent = `Versión actual: ${latestDesktopVersion} • Actualizaciones silenciosas automáticas incluidas`;
                }
            }
        } catch (e) {
            console.warn('Leyendo respaldo de releases:', e);
        }

        try {
            // 2. Consulta adicional a Releases API
            const desktopRes = await fetch(`https://api.github.com/repos/${REPO_UPDATE}/releases/latest`);
            if (desktopRes.ok) {
                const data = await desktopRes.json();
                latestDesktopVersion = data.tag_name || latestDesktopVersion;

                const exeAsset = data.assets && data.assets.find(a => a.name.toLowerCase().endsWith('.exe'));
                const debAsset = data.assets && data.assets.find(a => a.name.toLowerCase().endsWith('.deb'));

                if (exeAsset) {
                    downloadUrls.windows = exeAsset.browser_download_url;
                    const btnWin = document.getElementById('btn-dl-windows');
                    if (btnWin) btnWin.href = exeAsset.browser_download_url;
                }

                if (debAsset) {
                    downloadUrls.linux = debAsset.browser_download_url;
                    const btnLin = document.getElementById('btn-dl-linux');
                    if (btnLin) btnLin.href = debAsset.browser_download_url;
                }

                const versionLabel = document.getElementById('version-label');
                if (versionLabel) {
                    versionLabel.textContent = `Versión actual: ${latestDesktopVersion} • Actualizaciones silenciosas automáticas incluidas`;
                }
            }
        } catch (e) {
            // Mantener fallback
        }

        try {
            // Consulta para versión Android
            const androidRes = await fetch(`https://api.github.com/repos/${REPO_ANDROID}/releases/latest`);
            if (androidRes.ok) {
                const data = await androidRes.json();
                const apkAsset = data.assets.find(a => a.name.toLowerCase().endsWith('.apk'));
                if (apkAsset) {
                    downloadUrls.android = apkAsset.browser_download_url;
                    const btnAnd = document.getElementById('btn-dl-android');
                    if (btnAnd) btnAnd.href = apkAsset.browser_download_url;
                }
            }
        } catch (e) {
            // Mantener fallback
        }
    }

    function openModal() {
        const modal = document.getElementById('download-modal');
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        const modal = document.getElementById('download-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function bindModalEvents() {
        const modal = document.getElementById('download-modal');
        const closeBtn = document.getElementById('modal-close-btn');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Cerrar al hacer clic en el backdrop oscuro
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Interceptar todos los botones de descarga de la página
        document.querySelectorAll('.download-btn, [data-open-download]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
    }

    // Inicializar al cargar el DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectModal);
    } else {
        injectModal();
    }

    // Exportar al objeto global por si se necesita invocar manualmente
    window.openDownloadModal = openModal;
    window.closeDownloadModal = closeModal;
})();
