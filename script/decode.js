const input = document.getElementById('file')
const imgUp = document.getElementById('imgUploaded');

let decode = ""
const CODE = {
    "11": "A", "12": "B", "13": "C", "14": "D", "15": "E", "16": "F",
    "21": "G", "22": "H", "23": "I", "24": "J", "25": "K", "26": "L",
    "31": "M", "32": "N", "33": "O", "34": "P", "35": "Q", "36": "R",
    "41": "S", "42": "T", "43": "U", "44": "V", "45": "W", "46": "X",
    "51": "Y", "52": "Z", "53": " ", "54": ",", "55": ".", "56": "?",
    "61": "0", "62": "1", "63": "2", "64": "3", "65": "4", "66": "5",
    "71": "6", "72": "7", "73": "8", "74": "9", "75": "!", "76": ":"
}

input.addEventListener('change', function () {
    const file = (this.files[0])

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgUp.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }
})


const btnDecode = document.getElementById('decode');
const btnShow = document.getElementById('showBtn');

btnShow.addEventListener('click', function () {
    console.log("here")
    console.log(decode)
    let decodedWord
    for (let i = 0; i <= decode.length; i = i + 2) {
        let decodedNum = decode.substr(i, 2);
        //console.log(decodedNum)
        if (decodedNum in CODE) {
            decodedWord = decodedWord + CODE[decodedNum];
        }
    }

    console.log(decodedWord);
    document.body.innerHTML += decodedWord
})


btnDecode.addEventListener('click', function () {

    const canvas = document.createElement('canvas')
    let imgResult = new Image();

    imgResult.onload = function () {
        imgResult.width = imgUp.width;
        imgwidth = imgUp.width
        imgheight = imgUp.height
        canvas.width = imgwidth
        canvas.height = imgheight
        const context = canvas.getContext('2d')
        context.drawImage(imgUp, 0, 0, imgwidth, imgheight)
        let imageData;
        let data;
        let binChar = ""
        let intPixR
        let intPixG
        let intPixB
        for (let i = 0; i <= imgwidth; i++) {
            for (let j = 0; j <= imgheight; j++) {
                imageData = context.getImageData(i, j, 1, 1)
                data = imageData.data
                binChar = ""
                //console.log(data[1])
                intPixR = parseInt(data[0])
                //console.log(intPixR % 2)
                if (intPixR % 2 === 0) {
                    binChar = binChar + 0
                }
                else {
                    binChar = binChar + 1
                }
                //console.log(data[1])
                intPixG = parseInt(data[1])
                if (intPixG % 2 === 0) {
                    binChar = binChar + 0
                }
                else {
                    binChar = binChar + 1
                }
                //console.log(data[2])
                intPixB = parseInt(data[2])
                if (intPixB % 2 === 0) {
                    binChar = binChar + 0
                }
                else {
                    binChar = binChar + 1
                }
                //console.log(binChar)
                binChar = parseInt(binChar, 2)
                //console.log(binChar)

                //console.log(binChar)
                decode = decode + binChar

            }
        }
    }
    imgResult.src = document.getElementById("imgUploaded").src;

})