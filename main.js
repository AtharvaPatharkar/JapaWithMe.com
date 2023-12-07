// Variables for tracking Japa counts and user information
let japaCount = 0;
let cycleCount = 0;
let japaMala = document.getElementById("japaMala");
let beads = [];
let userName = ''; // Initialize an empty user name

// Flags and settings
let restartClicked = false; // Flag to track whether "पुन्हा सुरू करा" has been clicked
let percentage = 0;
let clicks = 0;

let customTime = 0;   // Default custom time in seconds

let timeSet = false;

let countdownTime = 0; // in seconds
let countdownRunning = false;

let timerInterval;
let formOpened = false;

const percentageElement = document.getElementById("percentage");
const resetButton = document.getElementById("resetButton");






//settings Button code start
let soundEnabled = true; // By default, sound is enabled
let beadDisplay = true;
let PercentageDisplay = true;
let yourTimeDisplay = true;

document.getElementById("settingsButton").addEventListener("click", () => {
    const settingsDropdown = document.getElementById("settingsDropdown");

    // Toggle display property
    settingsDropdown.style.display = (settingsDropdown.style.display === "none" || settingsDropdown.style.display === "") ? "block" : "none";

    // Set a timer to hide the dropdown after 10 seconds
    setTimeout(() => {
        settingsDropdown.style.display = "none";
    }, 10000); // 10000 milliseconds = 10 seconds
});


function toggleButton(buttonId, toggleVariable, onText, offText, onClickCallback) {
    const button = document.getElementById(buttonId);

    button.addEventListener("click", () => {
        if (toggleVariable) {
            button.innerHTML = offText;
            toggleVariable = false;
        } else {
            button.innerHTML = onText;
            toggleVariable = true;
            playSound('click.mp3');
        }

        if (onClickCallback) {
            onClickCallback();
        }
    });
}

// Sound Toggle Button
toggleButton("soundToggleButton", soundEnabled, "Sound Effects: ON <br> आवाज प्रभाव: सक्रिय ", "Sound Effects: OFF <br> आवाज प्रभाव: बंद", () => {
    soundEnabled = !soundEnabled;
});

// Bead Display Button
toggleButton("beadDisplay", beadDisplay, "Bead Display: ON <Br> मणी डिस्प्ले: सक्रिय", "Bead Display: OFF<br> मणी डिस्प्ले: बंद", () => {
    beadDisplay = !beadDisplay;
    resetBeads();
});

// Percentage Display Button
toggleButton("perDisplay", PercentageDisplay, "Percentage Display: ON <Br> प्रतिशत डिस्प्ले: सक्रिय", "Percentage Display: OFF <br> प्रतिशत डिस्प्ले: बंद", () => {
    PercentageDisplay = !PercentageDisplay;
});

// Your Time Display Button
toggleButton("yourTimeDisplay", yourTimeDisplay, "Your Time Display: ON <br> आपले वेळ डिस्प्ले: सक्रिय", "Your Time Display: OFF <br> आपले वेळ डिस्प्ले: बंद", () => {
    yourTimeDisplay = !yourTimeDisplay;
});


// Define background themes with image and color class
let currentThemeIndex = 0;
const backgroundThemes = [
    { image: 'url(#)', colorClass: 'theme1' },
    { image: 'url(#)', colorClass: 'theme2' },
    { image: 'url(#)', colorClass: 'theme3' },
    { image: 'url(#)', colorClass: 'theme4' },
    { image: 'url(#)', colorClass: 'theme5' },
    { image: 'url(#)', colorClass: 'theme6' },
    { image: 'url(#)', colorClass: 'theme7' },
    { image: 'url(#)', colorClass: 'theme8' },
    { image: 'url(#)', colorClass: 'theme9' },
    { image: 'url(#)', colorClass: 'theme10' },
    { image: 'url(#)', colorClass: 'theme11' }
];

function changeBackgroundTheme() {
    const body = document.body;
    currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;

    // Set background image
    body.style.backgroundImage = backgroundThemes[currentThemeIndex].image;

    // Add or replace the background color class
    body.className = backgroundThemes[currentThemeIndex].colorClass;
}

document.getElementById("changeThemeButton").addEventListener("click", () => {
    changeBackgroundTheme();
});

const body = document.body;

document.getElementById("originalThemeButton").addEventListener("click", () => {
    body.style.backgroundImage = "url('OMbg.jpeg')";
});

document.getElementById("restartB11").addEventListener("click", () => {                   //restart button
    settingsDropdown1.style.display = "block";
});

document.getElementById("restartB").addEventListener("click", () => {
    settingsDropdown1.style.display = "none";

    japaCount = 0;                                                        // Reset japaCount and cycleCount to 0
    cycleCount = 0;

    document.getElementById("japaCountDisplay").textContent = japaCount;                // Reset the display of japaCount and cycleCount
    document.getElementById("cycleCountDisplay").textContent = cycleCount;

    percentage = 0;                            // Reset the percentage to 0%
    percentageElement.textContent = "0%";
    percentageElement.className = "percentage";

    stopTimer();                                 // Reset and stop the timer
    document.getElementById("timerDisplayEng").textContent = formatTimeToEnglish(0, 0, 0);
    timerRunning = false;

    resetBeads();                               // Remove the beads

    restartClicked = false;                // Reset the "restartClicked" flag

    playSound('click.mp3');
});

//setting Button code Ends






//h1 tag code start
function getRandomColor() {                       // Function to generate a random color
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeHeadingColor() {                    // Function to change the color of the heading
    const heading = document.querySelector('h1');
    const bead = document.querySelector('japaMalaSection');
    heading.style.color = getRandomColor();
    bead.style.color = getRandomColor();
}

setInterval(changeHeadingColor, 500);             // Set an interval to change the color every 1 seconds
//h1 tag code End





//five button code starts
document.getElementById("almanacButton").addEventListener("click", () => {
    toggleBoxVisibility("box1");

    setTimeout(() => {
        box1.style.display = "none";
    }, 15000);
});

document.getElementById("yourTimeButton").addEventListener("click", () => {
    toggleBoxVisibility("box2");
});

document.getElementById("userTargetButton").addEventListener("click", () => {
    toggleBoxVisibility("box3");
});

document.getElementById("setTimeButtonDisplay").addEventListener("click", () => {
    toggleBoxVisibility("box4");
});

document.getElementById("setMalaButton").addEventListener("click", () => {
    toggleBoxVisibility("box5");
});

function toggleBoxVisibility(boxId) {
    const box = document.getElementById(boxId);
    if (box.style.display === "none" || !box.style.display) {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

const boxIds = ["box1", "box2", "box3", "box4", "box5"];           // Array of box IDs

function changeBoxColors() {
    boxIds.forEach((boxId) => {
        const box = document.getElementById(boxId);
        if (box) {
            box.style.backgroundColor = getRandomColor();
        }
    });

    const button = document.getElementById("setMalaButton");

    const randomColor = getRandomColor();

    button.style.backgroundColor = randomColor;
}

setInterval(changeBoxColors, 1000);

//five button code End




// 1st Box code start
function updateCurrentDateTime() {
    const updateElement = (id, locale) => {
        const element = document.getElementById(id);
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short',
            timeZone: 'Asia/Kolkata',
            localeMatcher: 'lookup',
        };
        element.textContent = now.toLocaleString(locale, options);
    };

    updateElement("currentDateTime", 'mr-IN');
    updateElement("currentDateTimeEng", 'en-US');

    setTimeout(updateCurrentDateTime, 1000);
}

updateCurrentDateTime();

//1st Box code End




//2nd Box code start
const timerElement = document.getElementById('timer');
let timerRunning = false;
let time = 0;
let timer;

document.getElementById("startTimer").addEventListener("click", () => {

    if (!timerRunning && yourTimeDisplay && timerElement) {
        startTimer();
        document.getElementById("startTimer").textContent = "Continue/चालू ठेवा";


        setTimeout(() => {
            box2.style.display = "none";
        }, 3000);
    }

});

document.getElementById("pauseButton").addEventListener("click", () => {
    clearInterval(timer);
    timerRunning = false;
});

document.getElementById("clearButton").addEventListener("click", () => {
    clearInterval(timer);
    timerRunning = false;
    time = 0;
    timerElement.innerText = '00:00:00';
    document.getElementById("startTimer").textContent = "Start/प्रारंभ";
    document.getElementById("yourTimeButton").innerHTML = "Your Time <hr> तुमचे वेळ : (00:00:00)";
    alert("Clear Timer");
}
);

setInterval(() => timerElement.style.color = getRandomColor(), 1000);

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    time++;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime =
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;

    timerElement.innerText = formattedTime;
    document.getElementById("yourTimeButton").innerHTML = "Your Time <hr> तुमचे वेळ: (" + formattedTime + ")";
}

function stopTimer() {
    clearInterval(timer);
    timerRunning = false;
    time = 0;
    document.getElementById('timer').innerText = '00:00:00';
    document.getElementById("startTimer").textContent = "Start";

}
//2nd Box code End






//3rd Box code starts

let customJapaCount = 108;

document.getElementById("setValueButton").addEventListener("click", () => {

    const customValueInput = document.getElementById("customValue");
    const customValue = parseInt(customValueInput.value);

    if (!isNaN(customValue)) {
        customJapaCount = customValue;
    }

    // Display the custom value in Marathi
    document.getElementById("customValue1").textContent = "वापरकर्त्याचे लक्ष्य/User's target : " + customJapaCount;
    document.getElementById("userTargetButton").innerHTML = "वापरकर्त्याचे लक्ष्य<hr>User's target : " + customJapaCount;


    setTimeout(() => {
        box3.style.display = "none";
    }, 1000);
});
//3rd Box code End


// 4th Box code start
const setTimeButton = document.getElementById("setTimeButton");
const restartTimeButton = document.getElementById("restartTime");
const timerDisplay = document.getElementById("timerDisplay1");
const mytimerLabel = document.getElementById("mytimer");
const setTimeButtonDisplay = document.getElementById("setTimeButtonDisplay");

let hours = 0;
let minutes = 0;
let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);

    let totalSeconds = hours * 3600 + minutes * 60;

    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {

            box4.style.display = "block";
            clearInterval(countdownInterval);
            if (soundEnabled) {
                document.getElementById("stopButton").style.display = "inline";
                playAlarmSound();
                document.getElementById("stopButton").addEventListener("click", stopAlarmBox4);
            }
        } else {
            const displayHours = Math.floor(totalSeconds / 3600);
            const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
            const displaySeconds = totalSeconds % 60;

            timerDisplay.textContent = `${formatTime(displayHours)}:${formatTime(displayMinutes)}:${formatTime(displaySeconds)}`;

            totalSeconds--;

            document.getElementById("setTimeButtonDisplay").innerHTML = "Set Time<hr>वेळ सेट करा (" + timerDisplay.textContent + " ) ";
        }
    }, 1000);




    setTimeout(() => {
        box4.style.display = "none";
    }, 1000);
}

let audio; // Declare audio variable globally

function playAlarmSound() {
    // Create an Audio element
    audio = new Audio('beep.mp3');

    // Play the audio
    audio.play();

    // Display stop button and set up event listener

}

function stopAlarmBox4() {
    // Stop the audio
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    // Hide the stop button
    document.getElementById("stopButton").style.display = "none";



    // Display an alert message
    alert("Alarm stopped! / अलार्म थांबवलंय!");

    document.getElementById("restartTime").click();

    setTimeout(() => {
        box4.style.display = "none";
    }, 5000);
}

function stopAlarmBox5() {
    // Stop the audio
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    document.getElementById("stopButton1").style.display = "none";

    // Display an alert message
    alert("Alarm stopped! / अलार्म थांबवलंय!");



    setTimeout(() => {
        box5.style.display = "none";
    }, 5000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

setTimeButton.addEventListener("click", function () {
    const userTimeInput = document.getElementById("userTime");
    const userTimeValue = userTimeInput.value.split(":");
    hours = parseInt(userTimeValue[0], 10);
    minutes = parseInt(userTimeValue[1], 10);

    timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:00`;

    document.getElementById("setTimeButtonDisplay").innerHTML = "Set Time<hr>वेळ सेट करा (" + timerDisplay.textContent + " ) ";

    startCountdown();
});

restartTimeButton.addEventListener("click", function () {
    clearInterval(countdownInterval);
    hours = 0;
    minutes = 0;
    timerDisplay.textContent = "00:00:00";

    mytimerLabel.textContent = "वेळ सेट करा/Set Time (hh:mm)";
    setTimeButtonDisplay.innerHTML = "Set Time<hr>वेळ सेट करा (hh:mm)";
});
// 4th Box code End



//5th Box code start
let intervalId;
let customLimitCount = 0;

/*
document.getElementById("setNewJapaMalaButton").addEventListener("click", function () {
    customLimitCount = parseInt(document.getElementById("newMalaCountInput").value) || 0;
    document.getElementById("newJapaMalaLabel").textContent = "Set Japa Mala/वापरकर्त्याचे लक्ष्य: " + customLimitCount;
});

document.getElementById("setNewTimeButtonInBox5").addEventListener("click", function () {
    const timeValue = parseInt(document.getElementById("newTimeInput").value) || 1;
    document.getElementById("newTimeInputLabel").textContent = "Autoclick Set Time/ऑटोक्लिक वेळ सेट: " + timeValue;
});


*/

document.getElementById("newAutoclickButton").addEventListener("click", function () {

    if (!restartClicked) {
        autoClickFun();
    } else {
        alert("Save the Japa first or click restart again/पहिले जपा सेव्ह करा किंवा  पुन्हा पुनरारंभ क्लिक करा.");
        noAction();
    }
});

function autoClickFun() {
    const timeValue = parseInt(document.getElementById("newTimeInput").value) || 1;
    if (timeValue === 0) {
        alert("Please set a time interval.");
        return;
    }

    const newJapaMalaValue = parseInt(document.getElementById("newMalaCountInput").value) || 0;

    if (newJapaMalaValue !== 0) {
        alert("Autoclick start.");
        startAutoclick(newJapaMalaValue, timeValue);
    } else {
        alert("Autoclick start.");
        startAutoclickNoLimit(timeValue);
    }



    document.getElementById("newAutoclickButton").style.display = "none";
    document.getElementById("restartBox5").style.display = "block";

}

let startAutoclickNoLimitValue = false;

function startAutoclickNoLimit(timeValue) {
    if (soundEnabled) {
        playSound('click.mp3');
    }

    document.getElementById("setMalaButton").innerHTML = "Autoclick : Start <hr>स्वयं क्लिक: चालू ";

    intervalId = setInterval(() => {
        if (!startAutoclickNoLimitValue) {

            document.getElementById("japaKaraButton").click();
            document.getElementById("newAutoclickButton").style.display = "none";
            document.getElementById("restartBox5").style.display = "block";

        } else {

            clearInterval(intervalId);
            timerRunning = false;
            stopTimer();


            alert("Autoclick completed.");

            document.getElementById("newJapaMalaLabel").textContent = "Set Japa Mala/वापरकर्त्याचे लक्ष्य: ";
            document.getElementById("newTimeInputLabel").textContent = "Time in seconds/सेकंदांतील वेळ: ";
            document.getElementById("setMalaButton").innerHTML = "Autoclick : Stop <hr>स्वयं क्लिक: बंद";

            document.getElementById("newAutoclickButton").style.display = "block";

            document.getElementById("restartBox5").style.display = "none";

            startAutoclickNoLimitValue = false;

        }
    }, timeValue * 1000);


    setTimeout(() => {
        box5.style.display = "none";
    }, 5000);



}

function startAutoclick(newJapaMalaValue, timeValue) {
    if (soundEnabled) {
        playSound('click.mp3');
    }
    document.getElementById("setMalaButton").innerHTML = "Autoclick : Start <hr>स्वयं क्लिक: चालू ";
    intervalId = setInterval(() => {
        if (cycleCount < newJapaMalaValue) {
            document.getElementById("japaKaraButton").click();
            document.getElementById("newAutoclickButton").style.display = "none";
            document.getElementById("restartBox5").style.display = "block";


        } else if (cycleCount === newJapaMalaValue) {

            clearInterval(intervalId);
            timerRunning = false;
            stopTimer();
            if (soundEnabled) {
                document.getElementById("stopButton1").style.display = "inline";
                document.getElementById("stopButton1").addEventListener("click", stopAlarmBox5);

            }


            alert("Autoclick completed.");
            document.getElementById("newJapaMalaLabel").textContent = "Set Japa Mala/वापरकर्त्याचे लक्ष्य: ";
            document.getElementById("newTimeInputLabel").textContent = "Time in seconds/सेकंदांतील वेळ: ";
            document.getElementById("setMalaButton").innerHTML = "Autoclick : Stop <hr>स्वयं क्लिक: बंद";

            document.getElementById("newAutoclickButton").style.display = "block";



            document.getElementById("restartBox5").style.display = "none";




        }
        if (cycleCount > newJapaMalaValue) {
            alert("If you do not save and click restart, the record will be deleted./ जर आपलं रेकॉर्ड सेव्ह केलं नसलं आणि पुन्हा सुरू करण्यासाठी क्लिक केलं तर, आपलं रेकॉर्ड डिलीट होईल");
            cycleCount = 0;
        }


    }, timeValue * 1000);


    setTimeout(() => {
        box5.style.display = "none";
    }, 5000);



}

document.getElementById("restartBox5").addEventListener("click", () => {
    // Check if the autoclick is running before attempting to stop it
    if (intervalId) {
        clearInterval(intervalId);
        alert("Autoclick stopped.");

        // Reset any other necessary variables or UI elements
        document.getElementById("newJapaMalaLabel").textContent = "Set Japa Mala/वापरकर्त्याचे लक्ष्य: ";
        document.getElementById("newTimeInputLabel").textContent = "Time in seconds/सेकंदांतील वेळ: ";
        document.getElementById("setMalaButton").innerHTML = "Autoclick : Stop <hr>स्वयं क्लिक: बंद";
        document.getElementById("newAutoclickButton").style.display = "block";
        document.getElementById("restartBox5").style.display = "none";
        startAutoclickNoLimitValue = false;

        // Clear the intervalId to signify that the autoclick is no longer running
        intervalId = null;
    }


});

//5th Box code end




//mainContent code start
document.getElementById('changeColorButton').addEventListener('click', function () {
    // Change background color of mainContent on button click
    document.getElementById('mainContent').style.backgroundColor = getRandomColor();
});

document.getElementById('originalColorButton').addEventListener('click', function () {
    // Reset background color of mainContent to the original color
    document.getElementById('mainContent').style.backgroundColor = 'red';
});

//mainContent code end




//japa kara button code start
document.getElementById("japaKaraButton").addEventListener("click", japaKara);

function japaKara() {

    if (!timerRunning && yourTimeDisplay) {
        startTimer();
        document.getElementById("startTimer").textContent = "Continue";
    }


    if (customJapaCount !== 0) {
        japaCount = (japaCount + 1) % customJapaCount;
        cycleCount = japaCount === 0 ? cycleCount + 1 : cycleCount;

        if (PercentageDisplay) {
            const percentageElement = document.getElementById("percentage");

            percentage = Math.floor((japaCount / customJapaCount) * 100);
            percentageElement.textContent = percentage + "%";
            percentageElement.style.width = percentage + "%";


            percentageElement.className = "percentage";
            if (percentage === 100) {
                percentageElement.style.width = "100%";
            } else if (percentage === 0) {
                percentageElement.style.width = "0%";
            } else {
                percentageElement.style.width = percentage + "%";
            }

            percentageElement.classList.add(String.fromCharCode(65 + Math.floor(percentage / 10)));

            if (beadDisplay) {
                moveBeads(japaCount);
            }
        }
    } else {
        japaCount = japaCount + 1;
    }

    const japaCountDisplay = document.getElementById("japaCountDisplay");
    japaCountDisplay.textContent = japaCount;
    japaCountDisplay.style.color = getRandomColor();
    japaCountDisplay.style.backgroundColor = "#ffffff"; // Black background
    japaCountDisplay.style.border = "2px solid getRandomColor()"; // Black border

    const cycleCountDisplay = document.getElementById("cycleCountDisplay");
    cycleCountDisplay.textContent = cycleCount;
    cycleCountDisplay.style.color = getRandomColor();
    cycleCountDisplay.style.backgroundColor = "#ffffff"; // Black background
    cycleCountDisplay.style.border = "2px solid getRandomColor()"; // Black border

    if (soundEnabled) {
        if (japaCount === 0) {
            // Cycle completed, play "Mala.mp3"
            playSound('mala.mp3');
        } else {
            playSound('click.mp3');
        }
    }
};

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

function moveBeads(count) {
    resetBeads();
    for (let i = 0; i < count; i++) {
        let angle = (i / customJapaCount) * 2 * Math.PI;
        let x = Math.cos(angle) * 90;
        let bead = createBead(x);
        beads.push(bead);
    }
}

function resetBeads() {
    for (let i = 0; i < beads.length; i++) {
        japaMala.removeChild(beads[i]);
    }
    beads = [];
}

function createBead(x, y) {
    const bead = document.createElement("div");
    bead.className = "bead";
    bead.style.transform = `translate(${x}px, ${y}px)`;
    japaMala.appendChild(bead);
    return bead;
}

//japa kara button code End



// Reset Button code start

document.getElementById("resetButton").addEventListener("click", () => {
    Refun();
});

function Refun() {
    if (!restartClicked) {
        const saveNameButton = document.createElement("button");
        saveNameButton.textContent = "Save name/नाव जतन करा";
        saveNameButton.className = "styled-button";
        saveNameButton.id = "saveNameButton";
        saveNameButton.addEventListener("click", () => {
            if (!formOpened) {
                showNameForm();
                formOpened = true;
            } else {
                alert('The form is already open.');
            }
        });

        const withoutSaveNameButton = document.createElement("button");
        withoutSaveNameButton.textContent = "Save without name/नावाशिवाय जतन करा";
        withoutSaveNameButton.className = "styled-button";
        withoutSaveNameButton.id = "withoutSaveNameButton";
        withoutSaveNameButton.addEventListener("click", () => {
            resetAction();
        });

        const noButton = document.createElement("button");
        noButton.textContent = "Remove the button/बटण काढा";
        noButton.className = "styled-button";
        noButton.id = "noButton";
        noButton.addEventListener("click", () => {
            noAction();
        });

        const resetSection = document.getElementById("resetSection");
        resetSection.appendChild(document.createElement("br"));
        resetSection.appendChild(saveNameButton);
        resetSection.appendChild(document.createElement("br")); // Line break after the first button
        resetSection.appendChild(withoutSaveNameButton);
        resetSection.appendChild(document.createElement("br")); // Line break after the second button
        resetSection.appendChild(noButton);


        restartClicked = true;
    } else {
        // Handle the case when "पुन्हा सुरू करा" has already been clicked
    }
}

function showNameForm() {
    const nameForm = document.createElement("div");
    nameForm.innerHTML = `
        <label for="name" class="Form-label">Name/नाव:</label>
        <input type="text" id="name" class="styled-input"><br>
        <label for="age" class="Form-label">Age/वय:</label>
        <input type="text" id="age" class="styled-input"><br>
        <label for="city" class="Form-label">City/शहर:</label>
        <input type="text" id="city" class="styled-input"><br>
        <button id="saveButton" class="styled-button">Save</button>
        <button id="goBackButton" class="styled-button">Go back</button>
    `;
    document.getElementById("mainContent").appendChild(nameForm);

    document.getElementById("saveButton").addEventListener("click", () => {
        noAction();
        saveUserInfo();
        nameForm.remove();

    });

    document.getElementById("goBackButton").addEventListener("click", () => {
        nameForm.remove();
        noAction();
        formOpened = false;
    });


    removeResetButtons()
}

function saveUserInfo() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;

    userName = name;
    const userInfoDisplay = document.createElement("div");
    userInfoDisplay.textContent = `Name: ${name}, Age: ${age}, City: ${city}`;
    document.getElementById("mainContent").appendChild(userInfoDisplay);

    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("city").value = '';


    document.getElementById("goBackButton").click();
    resetAction();
}

function resetAction() {

    clearInterval(intervalId);

    document.getElementById("newAutoclickButton").style.display = "block";
    document.getElementById("restartBox5").style.display = "none";

    noAction();

    const nameDisplay = document.createElement("div");
    nameDisplay.textContent = userName + " तुमचे स्वागत आहे. " + " तुमचे एकूण जप " + japaCount + " आणि तुमचे एकूण जप माला " + cycleCount + " आहेत. ";

    // Set a random color
    nameDisplay.style.color = getRandomColor();

    nameDisplay.style.backgroundColor = "#ffffff"; // Hex code for white

    document.getElementById("mainContent").appendChild(nameDisplay);



    // Add horizontal line after nameDisplay
    const hrTag = document.createElement("hr");
    document.getElementById("mainContent").appendChild(hrTag);

    japaCount = 0;
    cycleCount = 0;
    document.getElementById("japaCountDisplay").textContent = japaCount;
    document.getElementById("cycleCountDisplay").textContent = cycleCount;
    resetBeads();


    stopTimer();
    document.getElementById("timerDisplay").textContent = formatTimeToMarathi(0, 0, 0);
    document.getElementById("timerDisplayEng").textContent = formatTimeToMarathi(0, 0, 0);
    timerRunning = false;



    const resetSection = document.getElementById("resetSection");
    const withoutSaveNameButton = document.getElementById("withoutSaveNameButton");
    const noButton = document.getElementById("noButton");
    const saveNameButton = document.getElementById("saveNameButton");

    if (saveNameButton) {
        resetSection.removeChild(saveNameButton);
    }
    if (noButton) {
        resetSection.removeChild(noButton);
    }

    if (withoutSaveNameButton) {
        resetSection.removeChild(withoutSaveNameButton);
    }


}

function noAction() {
    if (!formOpened) {
        removeResetButtons();
        restartClicked = false;
        formOpened = false;
    } else {
        removeResetButtons();
        restartClicked = false;
        formOpened = true;
    }
}

function removeResetButtons() {
    const resetSection = document.getElementById("resetSection");
    const withoutSaveNameButton = document.getElementById("withoutSaveNameButton");
    const noButton = document.getElementById("noButton");
    const saveNameButton = document.getElementById("saveNameButton");

    if (saveNameButton) {
        resetSection.removeChild(saveNameButton);
    }
    if (noButton) {
        resetSection.removeChild(noButton);
    }

    if (withoutSaveNameButton) {
        resetSection.removeChild(withoutSaveNameButton);
    }

}

// Reset Button code  End


