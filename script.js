const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');

// Agregar un listener para el evento drop en todo el documento
document.addEventListener('drop', handleDrop);
document.addEventListener('dragover', preventDefaults);
document.addEventListener('dragenter', preventDefaults);
document.addEventListener('dragleave', preventDefaults);

// Agregar un listener para el cambio de archivo en el input
fileInput.addEventListener('change', handleFileSelect);

function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleDrop(event) {
    preventDefaults(event);
    const files = event.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}
