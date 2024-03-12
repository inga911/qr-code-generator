window.addEventListener('load', function () {
    hideLoader();
});


const form = document.getElementById('qr-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    clearUI();
    showLoader();
    setTimeout(() => {
        hideLoader();
        generateQRcode(url, size);
        setTimeout(() => {
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        }, 50);
    }, 1000);

};


const generateQRcode = (url, size) => {
    qr.innerHTML = '';
    const qrcode = new QRCode(qr, {
        text: url,
        width: parseInt(size),
        height: parseInt(size),
        correctLevel: QRCode.CorrectLevel.H
    });
};

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();
};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = `<span class="material-symbols-outlined">download</span>Save Image`;
    document.getElementById('generated-code').appendChild(link);
};

function showLoader() {
    document.getElementById('loader-wrapper').style.display = 'flex';
}
function hideLoader() {
    document.getElementById('loader-wrapper').style.display = 'none';
}

form.addEventListener('submit', onGenerateSubmit);



