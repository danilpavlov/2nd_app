let button = document.getElementById("button");
let kran = document.getElementById("kran");
let strelka = document.getElementById("strelka");
var looper;
let audio_noise = new Audio();
let click_sound = new Audio();

let stage_button = "OFF";        //В данном случае состояние равно OFF, если кнопка НЕ зажата
let stage_kran = "ON";     //В данном случае состояние равно ON, если крышечка опущена
var now;
var time=0;
var stages = [0, 0, 0, 0];
var k=0;
var penis_jopa=0;
var limit_degrees_1
var limit_presure_1
var limit_presure_2
var limit_degrees_2
var current_pressure1;
var current_degrees;
var last_degrees = 30;
var is_off_on_done = 0;
var current_pressure;
var new_flag = 0;
var degrees = 30;
var limit_pressure_4;
var limit_degrees_4;
var kol = 0;
// **********
function anim(el,speed){

    // kol++
    // if (kol<10)
    //     console.log(degrees)
    let newdate = new Date();
    time = newdate.getTime() / 1000;

    if (stage_button === "ON" && stage_kran==="ON" && stages[0] === 0){
        if (new_flag === 1)
            is_off_on_done = 1;
        let newdate1 = new Date();
        now = newdate1.getTime() / 1000;
        stages = [1, 0, 0, 0];
        last_degrees = degrees;

    }






    if (stage_button === "ON" && stage_kran==="ON" && stages[0] === 1){
        degrees=last_degrees - 7.5*(time-now);

    }


    else if (stage_button === "ON" && stage_kran==="OFF" && stages[1] === 0){

        if (new_flag === 1)
            is_off_on_done = 1;
        let newdate = new Date();
        now = newdate.getTime() / 1000;
        stages = [0, 1, 0, 0];
        last_degrees = degrees;

    }


    else if (stage_button === "OFF" && stage_kran==="OFF" && stages[1] === 1) {

        degrees = last_degrees + 5 * (time - now);
        if (degrees >= 30) {
            degrees = 30;
        }

    }
    else if (stage_button === "OFF" && stage_kran==="ON" && stages[2] === 0 && is_off_on_done === 0){

        last_degrees = degrees;
        let newdate = new Date();
        now = newdate.getTime() / 1000;
        stages = [0, 0, 1, 0];
        new_flag = 1;
    }


    else if (stage_button === "OFF" && stage_kran==="ON" && stages[2] === 1 && is_off_on_done === 0){


        if (penis_jopa !== 2) {
            degrees = (limit_degrees_2) + (last_degrees - limit_degrees_2) * Math.exp(-(time - now) / 4);
            //console.log(degrees)
        }
        else{
            degrees = 30;
        }
    }

    else if (stage_button === "OFF" && stage_kran==="ON" && stages[2] === 0 && is_off_on_done === 1){

        last_degrees = degrees;
        limit_presure_1=(degrees-30)/0.75;
        limit_presure_2 = (Math.pow(101400 +limit_presure_1,1/1.15)/Math.pow(101400,1/1.15-1)-101400);
        limit_degrees_2 = 0.75 * limit_presure_2 + 30;
        let newdate = new Date();
        now = newdate.getTime() / 1000;
        stages = [0, 0, 1, 0];

    }


    else if (stage_button === "OFF" && stage_kran==="ON" && stages[2] === 1 && is_off_on_done === 1){

        //is_off_on_done = 1;
        if (penis_jopa !== 2) {
            degrees = (limit_degrees_2) + (last_degrees - limit_degrees_2) * Math.exp(-(time - now) / 4);
            //console.log(degrees)
        }
        else{
            degrees = 30;
        }
    }


    else if (stage_button === "OFF" && stage_kran==="OFF" && stages[3] === 0){

        if (new_flag === 1)
            is_off_on_done = 1;
        let newdate = new Date();
        now = newdate.getTime() / 1000;
        current_pressure1=(degrees-30)/0.75;
        console.log(current_pressure1);
        stages = [0, 0, 0, 1];
        last_degrees = degrees;
        penis_jopa++;
    }


    else if (stage_button === "OFF" && stage_kran==="OFF" && stages[3] === 1){

        current_pressure = (-current_pressure1/52)*(-0.0038 * Math.pow(time-now, 3) + 0.276 * Math.pow(time-now, 2) - 6.6 * (time-now) + 52);
        console.log(current_pressure);
        degrees = -(0.75 * current_pressure - 30);
    }

    // else if (stage_button === "ON" && stage_kran==="OFF" && stages[1] === 0){
    //     last_degrees = degrees;
    //     let newdate5 = new Date();
    //     now_new = newdate5.getTime() / 1000;
    //     flag = 1;
    // }
    // else if (stage_button === "ON" && stage_kran==="OFF" && b===0 && flag === 1){
    //     time = time - now_new
    //     degrees=last_degrees - 7.5*time;
    // }
    // else if (stage_button === "OFF" && stage_kran==="ON" && b===0)
    // {
    //     b=1;
    //     limit_degrees_1 = degrees;
    //     limit_presure_1=(degrees-30)/0.75;
    //     limit_presure_2 = (Math.pow(101400 +limit_presure_1,1/1.15)/Math.pow(101400,1/1.15-1)-101400);
    //     limit_degrees_2 = 0.75 * limit_presure_2 + 30;
    //     let newdate1 = new Date();
    //     now_new = newdate1.getTime() / 1000;
    // }
    // else if (stage_button === "OFF" && stage_kran==="ON" && b===1){
    //     degrees = (limit_degrees_2) + (limit_degrees_1 - limit_degrees_2) * Math.exp(-(time-now_new)*5);
    //     last_degrees = degrees;
    //
    // }
    // else if (stage_button === "OFF" && stage_kran==="OFF" && b===1)
    // {
    //     b=3;
    //     let newdate2 = new Date();
    //     now_new = newdate2.getTime() / 1000;
    //     current_pressure1=(degrees-30)/0.75;
    // }
    // else if (stage_button === "OFF" && stage_kran==="OFF"){
    //     time=time-now_new;
    //
    //current_pressure = (-current_pressure1/52)*(-0.0038 * Math.pow(time, 3) + 0.276 * Math.pow(time, 2) - 6.6 * time + 52);
    //     b=3;
    //     degrees = -(0.75 * current_pressure - 30);
    //     last_degrees = degrees;
    //     if (degrees >= 30) {
    //         degrees = 30;
    //         kk++;
    //         if (kk === 1){
    //             k++;
    //         }
    //     }
    // }
    // else if (stage_button === "OFF" && stage_kran==="ON" && b===3){
    //     b = 4;
    //     kk = 0;
    //     if (k === 2) {
    //         degrees = 30;
    //         console.log("SPERMAAAAAAAAAAAAAAA")
    //         b = 0;
    //         k = 0;
    //     }
    //     let newdate3 = new Date();
    //     now_newb3 = newdate3.getTime() / 1000;
    //     current_degrees=degrees;
    //
    // }
    // else if (stage_button === "OFF" && stage_kran==="ON" && b===4){
    //     limit_pressure_4 = Math.pow(101400, (1.15*1.15 - 1.15 + 1) / (1.15*1.15)) / ( Math.pow(101400 - limit_presure_1, (1 - 1.15) / (1.15*1.15)) ) - 101400;
    //     limit_degrees_4 = -0.75 * limit_pressure_4+30;
    //     degrees = (30 - limit_degrees_4) * Math.exp(-(time-now_newb3) *5) + limit_degrees_4 - (30 - current_degrees);
    //     last_degrees = degrees;
    //     current_pressure1=(degrees-30)/0.75;
    //     let newdate4 = new Date();
    //     now_new = newdate4.getTime() / 1000;
    // }



    if (degrees <= -60){
        degrees = -60;

    }

    if (degrees >= 30){
        degrees = 30;
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


        // let newdate = new Date();
        // now=newdate.getTime()/1000;
        anim(strelka, 0);//Кнопка зажата
        stage_button = "ON";

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

let delta_top_thermometr = day.getDate()%25;
let delta_degrees_barometr = ((day.getDate()+ 30 * day.getMonth())%52);

thermometr.style.top = (delta_top_thermometr + 125) + "px";
barometr.style.transform = "rotate(" + (delta_degrees_barometr - 18) + "deg)";

thermometr_number = 24 - delta_top_thermometr/3;
barometr_number = delta_degrees_barometr/10 + 97.4;