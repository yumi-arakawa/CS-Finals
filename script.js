let totalSubjects = 0;
let currentSubject = 1;
let subjectsData = [];

function startPlanning() {
    const numInput = document.getElementById("numberOfSubjects");
    totalSubjects = parseInt(numInput.value);

    if (isNaN(totalSubjects) || totalSubjects <= 0) {
        alert("Please enter a valid number of subjects.");
        return;
    }

    if (totalSubjects > 10) {
        alert("Studying over 10 subjects isn't realistic!");
        return;
    }

    // Hide the initial input section to focus on the current subject
    document.getElementById("numberOfSubjects").style.display = "none";
    document.querySelector("button[onclick='startPlanning()']").style.display = "none";
    document.querySelector("p:nth-of-type(2)").style.display = "none"; // Hide "How many subjects..." text

    currentSubject = 1;
    subjectsData = [];
    showSubjectInput();
}

function showSubjectInput() {
    const container = document.getElementById("subjectInputs");
    container.innerHTML = `
        <h3>Subject ${currentSubject} of ${totalSubjects}</h3>
        <input type="text" id="currentSubjectName" placeholder="Subject Name">
        <input type="number" id="currentSubjectMinutes" placeholder="Minutes">
        <br>
        <button onclick="nextSubject()">${currentSubject === totalSubjects ? 'Finish' : 'Next'}</button>
    `;
}

function nextSubject() {
    const name = document.getElementById("currentSubjectName").value;
    const minutes = parseInt(document.getElementById("currentSubjectMinutes").value);

    if (!name || isNaN(minutes) || minutes <= 0) {
        alert("Please enter valid details.");
        return;
    }

    subjectsData.push({ name, minutes });

    if (currentSubject < totalSubjects) {
        currentSubject++;
        showSubjectInput();
    } else {
        calculateAndShowResults();
    }
}

function calculateAndShowResults() {
    const container = document.getElementById("subjectInputs");
    container.innerHTML = ""; // Clear inputs

    let totalTime = 0;
    subjectsData.forEach(s => totalTime += s.minutes);

    let feedback = totalTime > 240 ?
        "That does not look very manageable... :(" :
        "Congratulations, this plan looks manageable!! :)";

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>Plan Summary</h2>
        <p>Number of subjects: ${totalSubjects}</p>
        <p>Total Study Time: ${totalTime} minutes</p>
        <p>Average per Subject: ${Math.round(totalTime / totalSubjects)} minutes</p>
        <p><strong>${feedback}</strong></p>
        <div style="text-align: left; display: inline-block; margin-top: 20px;">
            <h3>Details:</h3>
            <ul>
                ${subjectsData.map(s => `<li><strong>${s.name}</strong>: ${s.minutes} minutes</li>`).join('')}
            </ul>
        </div>
        <br><br>
        <button onclick="location.reload()">Start Over</button>
    `;
}
