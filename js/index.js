let inputFile;
let inputImage = document.getElementById('major-img');
let canvasImage = document.getElementById('pixelitcanvas');
let pixelItBtn = document.getElementById('pixel-it-btn');
let saveBtn = document.getElementById('save-btn');

canvasImage.style.display = 'none';
saveBtn.style.display = 'none';
pixelItBtn.style.pointerEvents = 'none';

console.log(typeof inputFile == 'undefined')

if (typeof inputFile == 'undefined') {
    inputImage.style.display = 'none';
}

function previewFile() {
    const preview = document.getElementById('major-img')
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (inputFile) {
        inputImage.style.display = 'block';
        reader.readAsDataURL(inputFile);
    }
}

const openDialog = () => {
    inputImage.style.display = 'block';
    inputImage.style.visibility = 'initial';
    inputImage.style.position = 'initial';
    inputImage.style.top = 'initial';
    inputImage.style.left = 'initial';
    canvasImage.style.display = 'none';
    saveBtn.style.display = 'none';
    pixelItBtn.style.pointerEvents = 'auto';

    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'
    input.onchange = _ => {
        // you can use this method to get file and perform respective operations
        let files = Array.from(input.files);
        inputFile = files[0]
        console.log(inputFile);
        previewFile()
    };
    input.click();
}

const pixelIt = () => {
    inputImage.style.display = 'none';
    saveBtn.style.display = 'inline';
    const px = new pixelit({
        from: inputImage,
        to: canvasImage,
    });
    px.draw().setScale(10).pixelate();
    canvasImage.style.display = 'block';
}

function downloadImage(data, filename = 'untitled.jpeg') {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}


const selectBtn = document.getElementById('select-btn');

selectBtn.addEventListener('click', openDialog);
pixelItBtn.addEventListener('click', pixelIt);
saveBtn.addEventListener('click', function (e) {
    let canvas = canvasImage

    let dataURL = canvas.toDataURL("image/jpeg", 1.0);

    downloadImage(dataURL, 'my-canvas.jpeg');
});