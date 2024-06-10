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

async function loadModel() {
    const model = await tf.loadLayersModel('tfjs_model/model.json');
    return model;
}

// Función para preprocesar la imagen antes de hacer la predicción
function preprocessImage(image) {
    // Preprocesa la imagen según sea necesario, como redimensionarla, normalizarla, etc.
    // Aquí necesitarás ajustar el preprocesamiento según las necesidades de tu modelo
    return image; // Retorna la imagen preprocesada
}

// Función para hacer predicciones en una imagen cargada
async function predictImage(model, imageElement) {
    // Preprocesa la imagen
    const preprocessedImage = preprocessImage(imageElement);

    // Convierte la imagen preprocesada a un tensor
    const tensor = tf.browser.fromPixels(preprocessedImage)
        .resizeNearestNeighbor([224, 224]) // Ajusta el tamaño según las necesidades de tu modelo
        .expandDims();

    // Haz la predicción con el modelo
    const prediction = await model.predict(tensor).data();

    return prediction;
}

// Función para manejar el evento de carga de archivos
async function handleFiles(files) {
    // Carga el modelo
    const model = await loadModel();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = async function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = async () => {
                const prediction = await predictImage(model, img);
                console.log('Prediction:', prediction);
                // Aquí puedes mostrar la predicción en tu página como desees
            };
        };
        reader.readAsDataURL(file);
    }
}

// Reemplaza la función handleFiles actual con esta nueva
fileInput.addEventListener('change', function(event) {
    const files = event.target.files;
    handleFiles(files);
});