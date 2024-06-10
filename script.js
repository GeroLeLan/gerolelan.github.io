const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
let model; 


document.addEventListener('drop', handleDrop);
document.addEventListener('dragover', preventDefaults);
document.addEventListener('dragenter', preventDefaults);
document.addEventListener('dragleave', preventDefaults);


fileInput.addEventListener('change', handleFileSelect);

function preventDefaults(event) {
    console.log('preventDefaults');
    event.preventDefault();
    event.stopPropagation();
}


function handleDrop(event) {
    console.log('handleDrop');
    preventDefaults(event);
    const files = event.dataTransfer.files;
    handleFiles(files);
}


function handleFileSelect(event) {
     console.log('handleFileSelect');
    const files = event.target.files;
    handleFiles(files);
}

async function loadModel() {
    console.log('loadModel');
    const modelUrl = './tfjs_model/model.json';
     console.log(modelUrl);
    model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
}


function preprocessImage(image) { 
    console.log('preprocessImage');
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
    const normalizedImage = resizedImage.div(255.0);
    return normalizedImage;
}


async function predictImage(imageElement) {
    console.log('predictImage');
    const preprocessedImage = preprocessImage(imageElement);

    const tensor = tf.browser.fromPixels(preprocessedImage)
        .resizeNearestNeighbor([224, 224]) 
        .expandDims();
    const prediction = await model.predict(tensor).data();

    return prediction;
}


async function handleFiles(files) {
    console.log('handleFiles');
    if (!model) {
        await loadModel();
    }
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = async function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = async () => {
                const prediction = await predictImage(img);
                console.log('Prediction:', prediction);

            };
        };


        reader.readAsDataURL(file);
    }
}
