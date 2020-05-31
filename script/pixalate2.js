const input = document.getElementById('file')
const imgUp = document.getElementById('imgUploaded');

//previewing the image on to the DOM
input.addEventListener('change', function () {
    const file = (this.files[0])
    console.log(file)

    child = document.getElementById("imagePut").children
    if (child.length > 1) {
        document.getElementById("imagePut").removeChild(document.getElementById("imagePut").lastElementChild)
    }

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            console.log(this);
            imgUp.setAttribute("src", this.result);
            imgUp.classList.add("sample")
        });
        reader.readAsDataURL(file);
    }
})

const btnPixelate = document.getElementById("pixel-btn");
btnPixelate.addEventListener('click', function () {

    const canvas = document.createElement('canvas')
    let imgResult = new Image();

    imgResult.onload = function () {

        imgResult.width = imgUp.width;
        imgwidth = imgUp.width
        imgheight = imgUp.height
        canvas.width = imgwidth
        canvas.height = imgheight
        canvas.classList.add("sample")

        const context = canvas.getContext('2d')
        context.drawImage(imgUp, 0, 0, imgwidth, imgheight)
        let imageData;
        let data;
        for (let i = 0; i <= imgwidth; i += 4) {
            for (let j = 0; j <= imgheight; j += 4) {
                imageData = context.getImageData(i, j, 4, 4)
                data = imageData.data
                imageData.data = pixalate(data)
                context.putImageData(imageData, i, j)
            }
        }
        child = document.getElementById("imagePut").children
        if (child.length > 1) {
            document.getElementById("imagePut").removeChild(document.getElementById("imagePut").lastElementChild)
        }
        document.getElementById("imagePut").appendChild(canvas);
    }

    imgResult.src = document.getElementById("imgUploaded").src;
})


function pixalate(data) {
    let avgRed = 0
    let avgGreen = 0
    let avgBlue = 0
    let counter = 0;
    // for (var i = 0; i <= data.length; i += 4) {
    // 	counter++
    // 	avgRed = (avgRed + data[i]);
    // 	avgGreen = (avgGreen + data[i + 1]);
    // 	avgBlue = (avgBlue + data[i + 2]);
    // }

    for (let j = 0; j <= data.length; j += 4) {

        data[j] = data[0];
        data[j + 1] = data[1];
        data[j + 2] = data[2];
    }
    avgRed = 0
    avgGreen = 0
    avgBlue = 0
    counter = 0
    return data;
}

 // let c = document.createElement("canvas");
    // w = img1.width;
    // h = img1.height;
    // c.width = w;
    // c.height = h;
    // ctx = c.getContext('2d');
    // ctx.drawImage(img1, 0, 0);
//img1.src = document.getElementById('imgUploaded').src;

