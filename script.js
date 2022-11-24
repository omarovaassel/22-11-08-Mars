let roversData = [
    {
        roverName: 'Curiosity',
        cameras: [
            'FHAZ',
            'RHAZ',
            'MAST',
            'CHEMCAM',
            'MAHLI',
            'MARDI',
            'NAVCAM',
        ]
    },
    {
        roverName: 'Opportunity',
        cameras: [
            'FHAZ',
            'RHAZ',
            'NAVCAM',
            'PANCAM',
            'MINITES'
        ]
    },
    {
        roverName: 'Spirit',
        cameras: [
            'FHAZ',
            'RHAZ',
            'NAVCAM',
            'PANCAM',
            'MINITES'
        ]
    }
]

const roversSelect = document.querySelector("#rover_select");
const cameraSelect = document.querySelector("#camera_select");
const solInput = document.querySelector("#sol_input");
const button = document.querySelector("#button");
const photosDiv = document.querySelector("#photos");

// for(let rover of roversData){
//     roversSelect.innerHTML += `
//         <option value="${rover.roverName}">${rover.roverName}</option>
//     `;
// }

// мое решение
// roversSelect.addEventListener("change", () => {
//     cameraSelect.innerHTML = "";
//
//     for(let rover of roversData){
//         if(roversSelect.value == rover.roverName){
//             for(let i = 0; i < rover.cameras.length; i++){
//                     cameraSelect.innerHTML +=
//                         `
//                            <option value="${rover.cameras[i]}">${rover.cameras[i]}</option>
//                         `;
//             }
//         }
//     }
// });


// вариант Алиби
const drawCameras = (roverName) => {
    for(let rover of roversData){
        if(roverName.toLowerCase() == rover.roverName.toLowerCase()){
            for(let camera of rover.cameras){
                cameraSelect.innerHTML += `<option value="${camera}">${camera}</option>`
            }
        }
    }
};

drawCameras(roversData[0].roverName);

roversSelect.addEventListener("change", () => {
    cameraSelect.innerHTML = "";
    drawCameras(roversSelect.value);
});

button.addEventListener("click", () => {
    photosDiv.innerHTML = "";

    const API_KEY = 'GRdTNQhddTGlqYbNNGMHjeshR4GWd4FmHeMFDGKS';
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roversSelect.value}/photos?sol=${solInput.value}&camera=${cameraSelect.value}&api_key=${API_KEY}`; // обратные кавычки, чтобы можно было вставлять нужные нам переменные в ссылку кода

    // мое решение
    fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const photosArray = data.photos;

            for(const photo of photosArray){
                photosDiv.innerHTML += `<img width="150px" height="150px" src="${photo.img_src}">`
            }
        });

    // решение Алиби - наверху после click пишем async, а ниже:
    // const response = await fetch(URL);
    // const data = await response.json();
    // console.log(data);
});