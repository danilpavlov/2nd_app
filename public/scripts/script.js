let button = document.getElementById("button");
let kran = document.getElementById("kran");
let strelka = document.getElementById("strelka");
var looper;
let audio_noise = new Audio();
let click_sound = new Audio();

let stage_button = "OFF";        //В данном случае состояние равно OFF, если кнопка НЕ зажата
let stage_kran = "ON";     //В данном случае состояние равно ON, если крышечка опущена
var  now;
var b=0;
var time=0;
var ost = 0;
var now_new=0;
var k=0;
var limit_degrees_1
var limit_presure_1
var limit_presure_2
var limit_degrees_2
var current_pressure1;
var current_degrees;



var current_pressure;

var limit_pressure_4;
var limit_degrees_4;

// **********
function anim(el,speed){
    let newdate1 = new Date();
    time = newdate1.getTime() / 1000;

    if (stage_button === "ON" && stage_kran==="ON"){

        time-=ost;
        degrees=30-7.5*time;
        // degrees = degrees - 0.1;
        // console.log("degrees = ", degrees)
        // console.log("time = ", time)
        if (degrees <= -60){
            return 0;
        }

            b=0;
    }
    else if (stage_button === "OFF" && stage_kran==="ON" && b===0)
        {
            b=1;
            //console.log("degrees = ", degrees)
            limit_degrees_1 = degrees;
            limit_presure_1=(degrees-30)/0.75;
            console.log("limit degrees 1 = ", limit_presure_1);
            limit_presure_2 = (Math.pow(101400 +limit_presure_1,1/1.15)/Math.pow(101400,1/1.15-1)-101400);
            limit_degrees_2 = 0.75 * limit_presure_2 + 30;
            //console.log("limit degrees pressure 2 = ", limit_presure_2);
            //console.log("limit degrees 2 = ", limit_degrees_2);
            let newdate1 = new Date();
            now_new = newdate1.getTime() / 1000;
        }
    else if (stage_button === "OFF" && stage_kran==="ON" && b===1){
        degrees = (limit_degrees_2) + (limit_degrees_1 - limit_degrees_2) * Math.exp(-(time-now_new)/5);
        // console.log(degrees)


    }
    else if (stage_button === "OFF" && stage_kran==="OFF" && b===1)
        {
            b=3;
            let newdate2 = new Date();
            now_new = newdate2.getTime() / 1000;
            current_pressure1=(degrees-30)/0.75;
            console.log("current_pressure1 = ", current_pressure1)
        }
    else if (stage_button === "OFF" && stage_kran==="OFF"){
        time=time-now_new;

        current_pressure = (-current_pressure1/52)*(-0.0038 * Math.pow(time, 3) + 0.276 * Math.pow(time, 2) - 6.6 * time + 52);
        console.log("current pressure = ", current_pressure)
        degrees = -(0.75 * current_pressure - 30);
        if (degrees >= 30)
            degrees = 30;
    }
    else if (stage_button === "OFF" && stage_kran==="ON" && b===3){
        b = 4;

        let newdate3 = new Date();
        now_new = newdate3.getTime() / 1000;
        current_degrees=degrees;
        console.log(current_degrees,"cur_deg")

    }
    else if (stage_button === "OFF" && stage_kran==="ON" && b===4){
        limit_pressure_4 = Math.pow(101400, (1.15*1.15 - 1.15 + 1) / (1.15*1.15)) / ( Math.pow(101400 - limit_presure_1, (1 - 1.15) / (1.15*1.15)) ) - 101400;
        limit_degrees_4 = -0.75 * limit_pressure_4+30;
        //console.log("aboba degrees",degrees);
        // if (k === 10)
        //     return 0;
        // k++
        degrees = (current_degrees-limit_degrees_4) * Math.exp(-(time-now_new) / 5) + limit_degrees_4;

    }





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
    looper = setTimeout('anim(\'' + el + '\',' + speed +  ')', 0);


}
// ****************

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
                kran.style.top = (String(410 - i) + "px");
            }, 200)}







        stage_kran = "OFF"; // Крышка перешла в состояние поднятия
    }


    else if (stage_kran === "OFF"){ // <------- Крышечка поднята!
        click_sound.src = 'sound/shelk_sound.mp3';
        click_sound.autoplay = true;

        for (let i = 0; i < 50; i+=0.002){ // Опускание крышки
            setTimeout(() => {
                kran.style.top = (String(360 + i) + "px");
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
        //audio_noise.play();
        //audio_noise.loop = true;


        let newdate = new Date();
        now=newdate.getTime()/1000;
        ost=now;
        // ost = now;
        anim(strelka, 0);





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



