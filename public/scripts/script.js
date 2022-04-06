let button = document.getElementById("button");
let kran = document.getElementById("kran");
let strelka = document.getElementById("strelka");

let audio_noise = new Audio();
let click_sound = new Audio();

let stage_button = "OFF";        //В данном случае состояние равно OFF, если кнопка НЕ зажата
let stage_kran = "ON";     //В данном случае состояние равно ON, если крышечка опущена




//Начальное положение Стрелочки
let degrees = 30;
if (navigator.userAgent.match("Chrome")) {
    strelka.style.WebkitTransform = "rotate(" + degrees + "deg)";
} else if (navigator.userAgent.match("Firefox")) {
    strelka.style.MozTransform = "rotate(" + degrees + "deg)";
} else if (navigator.userAgent.match("MSIE")) {
    strelka.style.msTransform = "rotate(" + degrees + "deg)";
} else if (navigator.userAgent.match("Opera")) {
    strelka.style.OTransform = "rotate(" + degrees + "deg)";
} else {
    strelka.style.transform = "rotate(" + degrees + "deg)";
}
//**********************************************************

//Работа с Атмосферой
kran.addEventListener("click", () => {
    if (stage_kran === "ON"){  // <----- Крышечка опущена!
        click_sound.src = 'sound/shelk_sound.mp3';
        click_sound.autoplay = true;

        for (let i = 0; i < 50; i+=0.002){ // Поднятие крышки
            setTimeout(() => {
                kran.style.top = (String(430 - i) + "px");
            }, 200)
        }





        stage_kran = "OFF"; // Крышка перешла в состояние поднятия
    }


    else if (stage_kran === "OFF"){ // <------- Крышечка поднята!
        click_sound.src = 'sound/shelk_sound.mp3';
        click_sound.autoplay = true;

        for (let i = 0; i < 50; i+=0.002){ // Опускание крышки
            setTimeout(() => {
                kran.style.top = (String(380 + i) + "px");
            }, 200)
        }





        stage_kran = "ON"; // Крышка перешла в состояние, когда она опущена
    }
})
//**********************************************************

//Работа с Насосом
button.addEventListener("click", () => {
    if (stage_button === "OFF"){        // <-------- Кнопка НЕ зажата!
        button.style.backgroundColor = "#560b0b";
        audio_noise.src = 'sound/sound_2.mp3'; // НУЖНО ЗАПИСАТЬ НОВЫЙ ЗВУК!!!!!!!
        audio_noise.play();
        audio_noise.loop = true;







        stage_button = "ON"; //Кнопка зажата

    }

    else if (stage_button === "ON"){    // <--------- Кнопка зажата!
        button.style.backgroundColor = "#981212";
        audio_noise.pause();








        stage_button = "OFF"; // Кнопка разжата
    }

})


// ***************************************************
// ************************* shit for rand thermometr and barometr
// ***************************************************

let thermometr = document.getElementById("red_line_thermometr");
let barometr = document.getElementById("strelka_barometr");
let day = new Date();

thermometr.style.top = (day.getDate()%25 + 125) + "px";
barometr.style.transform = "rotate(" + (-18 + (day.getDate()+ 30 * day.getMonth())%52) + "deg)";



