const gameData = {
    team1: {
        id: "Team 1",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",
        locationHint: "Look where the sunlight is softened and secrets hide behind the folds"
    },
    team2: {
        id: "Team 2",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",
        locationHint: "Not the first place students sit, but the one just behind it holds your next clue"
    },
    team3: {
        id: "Team 3",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",
        locationHint: "Where chalk speaks and knowledge appears in white on black, your next hint waits"
    },
    team4: {
        id: "Team 4",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",

        locationHint: "Between inside and outside stands the silent guardian—your clue rests there"
    },
    team5: {
        id: "Team 5",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",
        locationHint: "On the cold stone that stays strong and silent, the next step of your journey lies."
    },
    team6: {
        id: "Team 6",
        password: "HERMIONE GRANGER",
        nextLocation: "Guess the place",
        locationHint: "Where one rests after a long search, look closely for the hidden message"
    }
};


let currentTeam = null;



document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    let teamKey = urlParams.get('team');

    if (!teamKey) {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        if (path && gameData[path]) {
            teamKey = path;
        }
    }

    if (teamKey && gameData[teamKey]) {
        currentTeam = gameData[teamKey];
        document.getElementById('team-display').textContent = `Target: ${currentTeam.id}`;
    }

    startLoadingSequence();
});

function startLoadingSequence() {
    
    const subtext = document.getElementById('loading-subtext');

    setTimeout(() => {
        subtext.textContent = "> Decrypting Puzzle...";
    }, 1500);

    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('main-container').classList.remove('hidden');

        if (currentTeam) {
            document.getElementById('mission-card').classList.remove('hidden');
        } else {
            document.getElementById('error-card').classList.remove('hidden');
            document.getElementById('team-display').textContent = "Connection Failed";
            document.getElementById('team-display').style.borderColor = "var(--error)";
            document.getElementById('team-display').style.color = "var(--error)";
        }
    }, 3000);
}



function handlePasswordSubmit() {
    if (!currentTeam) return;

    const inputElement = document.getElementById('password-input');
    const inputGroup = document.querySelector('.input-group');
    const feedbackMsg = document.getElementById('feedback-message');
    const enteredPassword = inputElement.value.trim().toUpperCase();

  
    feedbackMsg.className = "feedback-msg";
    inputGroup.classList.remove('shake');

    void inputGroup.offsetWidth;

    if (enteredPassword === currentTeam.password) {

        feedbackMsg.textContent = "> Access Granted";
        feedbackMsg.classList.add('hidden');

        executeSuccessSequence();

    } else {

        feedbackMsg.textContent = "ACCESS DENIED: INCOMPATIBLE CODE";
        feedbackMsg.classList.remove('hidden');
        feedbackMsg.classList.add('msg-error');

       
        inputGroup.classList.add('shake');

        inputElement.value = "";
        inputElement.focus();
    }
}



function executeSuccessSequence() {
    const missionCard = document.getElementById('mission-card');
    const successCard = document.getElementById('success-card');


    missionCard.classList.add('hidden');

    successCard.classList.remove('hidden');


    const titleFlash = document.getElementById('mission-unlocked-title');
    const rocket = document.getElementById('rocket-animation');
    const revealSeq = document.getElementById('reveal-sequence');
    const miniRadar = document.getElementById('mini-radar');
    const planetBtn = document.getElementById('planet-icon');
    const locBox = document.getElementById('location-box');


    document.getElementById('next-location').textContent = ` ${currentTeam.nextLocation}`;
    document.getElementById('location-hint').textContent = currentTeam.locationHint;


    rocket.classList.remove('hidden');
    rocket.classList.add('launch-anim');

    setTimeout(() => {
        rocket.classList.add('hidden');

        titleFlash.classList.remove('hidden');

        setTimeout(() => {
            titleFlash.classList.add('hidden');
            revealSeq.classList.remove('hidden');
        }, 1500);
    }, 2000);

    setTimeout(() => {
        miniRadar.classList.add('hidden');
        planetBtn.classList.remove('hidden');

    }, 5000);


    setTimeout(() => {
        locBox.classList.remove('hidden');
        locBox.classList.add('pop-in-anim');
    }, 6000);
}
