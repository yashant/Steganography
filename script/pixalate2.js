const input = document.getElementById('file')
const imgUp = document.getElementById('imgUploaded');

//previewing the image on to the DOM
input.addEventListener('change', function () {
    const file = (this.files[0])

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            console.log(this);
            imgUp.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
        document.querySelector(".text-box").style.display = "block";
    }

})



//     1    2     3    4   5    6
// 1 [["a", "b", "c", "d", "e", "f"],
// 2 ["g", "h", "i", "j", "k", "l"],
// 3 ["m", "n", "o", "p", "q", "r"],
// 4 ["s", "t", "u", "v", "w", "x"],
// 5 ["y", "z", " ", ",", ".", "?"],
// 6 ["0", "1", "2", "3", "4", "5"],
// 7 ["6", "7", "8", "9", "!", ":"]]

const CODE = {
    "11": "A", "12": "B", "13": "C", "14": "D", "15": "E", "16": "F",
    "21": "G", "22": "H", "23": "I", "24": "J", "25": "K", "26": "L",
    "31": "M", "32": "N", "33": "O", "34": "P", "35": "Q", "36": "R",
    "41": "S", "42": "T", "43": "U", "44": "V", "45": "W", "46": "X",
    "51": "Y", "52": "Z", "53": " ", "54": ",", "55": ".", "56": "?",
    "61": "0", "62": "1", "63": "2", "64": "3", "65": "4", "66": "5",
    "71": "6", "72": "7", "73": "8", "74": "9", "75": "!", "76": ":"
}

let index = 0
let encodedValue = ""

const btnEncode = document.getElementById('encode');

btnEncode.addEventListener('click', function () {
    let TEXT = document.getElementById("encode-text").value.toUpperCase()
    for (let i = 0; i < TEXT.length; i++) {
        // console.log('here')
        encodedValue = encodedValue + (getKeyByValue(CODE, TEXT[i])).toString()
    }
    //console.log(encodedValue)

    const canvas = document.createElement('canvas')
    let imgResult = new Image();

    imgResult.onload = function () {
        imgResult.width = imgUp.width;
        imgwidth = imgUp.width
        imgheight = imgUp.height
        canvas.width = imgwidth
        canvas.height = imgheight

        const context = canvas.getContext('2d')
        context.imageSmoothingEnabled = false;

        context.drawImage(imgUp, 0, 0, imgwidth, imgheight)
        let imageData;
        let data;

        for (let i = 0; i <= imgwidth; i++) {
            for (let j = 0; j <= imgheight; j++) {
                imageData = context.getImageData(i, j, 1, 1)
                data = imageData.data
                imageData.data = encodeText(data)
                context.putImageData(imageData, i, j)
            }
        }
        console.log(encodedValue)
        //document.body.appendChild(canvas);
        document.getElementById('test').src = canvas.toDataURL('image/png');

    }
    imgResult.src = document.getElementById("imgUploaded").src;
})


function encodeText(data) {
    if (index < encodedValue.length - 1) {
        let redValue = 0
        let redValueBin = 0

        let blueValue = 0
        let blueValueBin = 0

        let greenValue = 0
        let greenValueBin = 0

        let binEncodedValue = 0

        binEncodedValue = parseInt(encodedValue[index])
        binEncodedValue = paddingThree((binEncodedValue).toString(2))
        //console.log(binEncodedValue)
        //changing the red Value

        redValue = parseInt((data[0]))
        redValueBin = (redValue).toString(2)
        let paddedRedValueBin = paddingEight(redValueBin)


        paddedRedValueBin = paddedRedValueBin.substring(0, 7) + binEncodedValue.substr(0, 1)

        //changing the Green Value
        greenValue = parseInt((data[1]))
        greenValueBin = (greenValue).toString(2)
        let paddedGreenValueBin = paddingEight(greenValueBin)

        paddedGreenValueBin = paddedGreenValueBin.substring(0, 7) + binEncodedValue.substr(1, 1)

        //changing the blue Value
        blueValue = parseInt((data[2]))
        blueValueBin = (blueValue).toString(2)
        let paddedBlueValueBin = paddingEight(blueValueBin)
        paddedBlueValueBin = paddedBlueValueBin.substring(0, 7) + binEncodedValue.substr(2, 1)


        //console.log(parseInt(paddedRedValueBin, 2))
        data[0] = parseInt(paddedRedValueBin, 2)

        //console.log(parseInt(paddedGreenValueBin, 2))
        data[1] = parseInt(paddedGreenValueBin, 2)

        //console.log(parseInt(paddedBlueValueBin, 2))
        data[2] = parseInt(paddedBlueValueBin, 2)

        index++
    }
    return data

}



function getKeyByValue(object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value)
                return prop;
        }
    }
}




//Could use this for padding
// let test = '110'
// console.log(paddingThree(test))

function paddingThree(binNum) {
    binNum = binNum.toString()
    while (binNum.length < 3) {
        binNum = "0" + binNum;
    }
    return binNum
    return binNum
}

// let test = '110'
// console.log(paddingEight(test))

function paddingEight(binNum) {
    binNum = binNum.toString()

    while (binNum.length < 8) {
        binNum = "0" + binNum;
    }
    return binNum
}
