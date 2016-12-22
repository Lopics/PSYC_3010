var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var lorr = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
var first,
    firstmg,
    Code,
    image1,
    image2,
    second,
    score = [],
    s = 0,
    ms = 0,
    i = 0,
    myVar,
    play = false;
function start() {
    image1 = document.getElementById("image1");
    image2 = document.getElementById("image2");
    first = document.getElementById("first");
    second = document.getElementById("second");
    firstmg = document.getElementById("firstmg");
    Code = document.getElementById("textbox").value;
    firstmg.innerHTML = "";
    var para = document.createElement("p");
    var para1 = document.createElement("p");
    var image = document.createElement("img");
    var button = document.createElement("button");
    button.classList = "btn btn-warning";
    button.innerHTML = "Next";
    button.onclick = begin;
    image.src = "images/in.png"
    image.style.width = "50px";
    image.style.height = "50px";
    para1.innerHTML = "Click Next when you're ready!"
    para.innerHTML = ("You will be presented with an image, either on your left or right.<br /> Upon detecting the change in the flickering image you should press the spacebar on your keyboard. <br /> Please center your head approximately 20 inches before a computer screen <br /> An Arrow (like the one below) will be presented before each trail for 3 seconds to indicate the direction the image will be displayed.");
    firstmg.appendChild(para);
    firstmg.appendChild(image);
    firstmg.appendChild(para1);
    firstmg.appendChild(button);
    shuffle(order);
    shuffle(lorr);
    
}

function begin() {
    image2.style.visibility = "hidden";
    image1.style.visibility = "hidden";
    second.style.visibility = "hidden";
    if (i < 16) {
        first.innerHTML = "";
        var image = document.createElement("img");
        if (lorr[i] == 1) {
            image.src = "images/right.png"
        } else if (lorr[i] == 0) {
            image.src = "images/left.png"
        }
        image.style.width = "100px";
        image.style.height = "100px";
        first.appendChild(image);
        first.style.visibility = "visible";
        var directory = "images/" + order[i] + ".gif";
        if (lorr[i] == 1) {
            image2.src = directory;
        } else if (lorr[i] == 0) {
            image1.src = directory;
        }
        setTimeout(run, 3000, order[i], lorr[i]);
    } else {
        Finale();
    }
}

function run(order, lorr) {
    first.style.visibility = "hidden";
    displayPicture(order, lorr);
}

stopwatch = setInterval(function () {
    if (!play) return;
    if (ms === 99) {
        s += 1;
        ms = 0;
    } else {
        ms += 1;
    }

}, 1);

function displayPicture(order, lorr) {
    
    if (lorr == 1) {
        image2.style.visibility = "visible";
    } else if (lorr == 0) {
        image1.style.visibility = "visible";
    }
    second.style.visibility = "visible";
    toggle();
    myVar = setTimeout(sixdone, 60000);
    document.onkeypress = function (e) {
        e = e || window.event;
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        if (charCode == 32) {
             toggle();
            clearTimeout(myVar);
            question(order);
        } 
    };
    
}

function question(order) {
    image2.style.visibility = "hidden";
    image1.style.visibility = "hidden";
    second.style.visibility = "hidden";
    var aj_ms = (s * 1000) + (ms * 10);
    i++;
    switch (order) {
        case 1:
            quest("Line Between Two Cars", "The Tree on the right side", "Window on the Red Card", 1);
            
            break;
        case 2:
            quest("Group of people", "Red Flag", "Small circle on the right", 2);
            break;
        case 3:
            quest("light pole", "Shadow on the ground", "Tree on the Left Side", 3);
            break;
        case 4:
            quest("Right side of the building", "The two kids", "Left side of the building", 2);
            break;
        case 5:
            quest("The young girl", "The Red Flag", "The windows on the building", 1);
            break;
        case 6:
            quest("The close small rocks", "The far mountain on the right", "The mountain of the left", 2);
            break;
        case 7:
            quest("The shadow of the car", "The red car", "The blue car", 3);
            break;
        case 8:
            quest("The light pole", "The ship on the right", "The disability sign on the left", 1);
            break;
        case 9:
            quest("The individuals on the street", "The tower crane on the right", "The statue in the middle",2);
            break;
        case 10:
            quest("The far tower crane on the left", "The individuals on the bridge", "The red boat", 1);
            break;
        case 11:
            quest("The individual on the right", "Part of the tree on the left", "One of the balloons in the middle", 1);
            break;
        case 12:
            quest("The car in the middle", "The column on the left", "The column on the right", 2);
            break;
        case 13:
            quest("The building in the middle", "The trees on the left", "The small castle on the right",3);
            break;
        case 14:
            quest("The stop sign on the left", "The individuals crossing the street", "The girl on the screen", 3);
            break;
        case 15:
            quest("The car on the left", "The hourse statue on the left", "The hourse statue on the right", 3);
            break;
        case 16:
            quest("The light pole", "The building that is obscured on the right", "The individuals on the street", 2);
            break;
            
    }
}

function quest(str1, str2, str3, correct) {
    first.innerHTML = "";
    first.style.visibility = "visible";
    var para = document.createElement("p");
    var br = document.createElement("p");
    var button = document.createElement("input");
    para.innerHTML = "Which object did you see change in the image?"
    button.type = "button";
    button.classList = "btn btn-warning";
    button.value = "Next";
    first.appendChild(para);
    first.appendChild(makeOptions(str1,str2,str3));
    first.appendChild(br);
    first.appendChild(button);
    button.addEventListener('click', function () {
        var selected = document.getElementById("slec").selectedIndex;
        if ((selected + 1) == correct) {
            begin();
        } else if ((selected + 1) != correct) {
            begin();
        }
    });
}

function sixdone() {
    clearTimeout(myVar);
    i++;
    begin();
}
function makeOptions(str1, str2, str3) {
    var select = document.createElement("select");
    select.id = "slec";
    select.style.width = "300px";
    option = document.createElement("option");
    option.setAttribute("value", 1);
    option.label = str1;
    select.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", 2);
    option.label = str2;
    select.appendChild(option);

    option = document.createElement("option");
    option.setAttribute("value", 3);
    option.label = str3;
    select.appendChild(option);
    return select;
}


function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function toggle() {
    if (!play) {
        s = 0, ms = 0;
    }
    play = !play;
}

function Finale() {
    second.style.visibility = "hidden";
    first.style.visibility = "visible";
    first.innerHTML = "";
    var para = document.createElement("p");
    var button = document.createElement("input");
    para.innerHTML = "<h1>Thank you for participating</h1>The main purpose of the study is to study the interaction between personality, attention and brain asymmetry. Although, there are various studies that link brain to attention, there are only few studies that investigate the relationship of Personality trait such as extraversion with attention.<br/><br/>Based on previous studies, we hypothesize that extraverts would have better change detection performance than introverts. While, images that are displayed on the left visual field would predict increased change detection performance.<br/><br/> If you have any questions, or conserns, please feel free to contact the researcher at mrfirete@my.yorku.ca"
    button.classList = "btn btn-warning";
    button.value = "Done";
    button.addEventListener('click', function () {
        location.href = 'http://surveymonkey.com'
    });
    first.appendChild(para);
    first.appendChild(button);
}

