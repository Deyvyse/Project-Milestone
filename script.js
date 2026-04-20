function calculateScore() {
    let score = 0;
    const totalQuestions = 5;
    const resultsDiv = document.getElementById('results');
    const detailedResults = document.getElementById('detailedResults');
    detailedResults.innerHTML = ""; // Clear old results

    // Answers
    const answers = {
        q1: "webkit",
        q2: "B",
        q3: "C",
        q4: "A",
        q5: ["WebKit", "Blink", "Gecko"]
    };

    // Q1 Check (Fill-in-the-blank)
    const q1Input = document.getElementById('q1').value.toLowerCase().trim();
    if (q1Input === answers.q1) {
        score++;
        showDetail(1, true, answers.q1);
    } else {
        showDetail(1, false, answers.q1);
    }

    // Q2-Q4 Check (Radio buttons)
    for (let i = 2; i <= 4; i++) {
        const q = document.querySelector(`input[name="q${i}"]:checked`);
        if (q && q.value === answers[`q${i}`]) {
            score++;
            showDetail(i, true, answers[`q${i}`]);
        } else {
            showDetail(i, false, answers[`q${i}`]);
        }
    }

    // Q5 Check (Multi-select)
    const q5Checked = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(cb => cb.value);
    const isQ5Correct = JSON.stringify(q5Checked.sort()) === JSON.stringify(answers.q5.sort());
    if (isQ5Correct) {
        score++;
        showDetail(5, true, answers.q5.join(", "));
    } else {
        showDetail(5, false, answers.q5.join(", "));
    }

    // Display Pass/Fail and Score
    resultsDiv.style.display = "block";
    const percent = (score / totalQuestions) * 100;
    const passFail = document.getElementById('passFail');
    
    if (percent >= 60) {
        passFail.innerHTML = "Result: PASS";
        passFail.style.color = "green";
    } else {
        passFail.innerHTML = "Result: FAIL";
        passFail.style.color = "red";
    }

    document.getElementById('scoreDisplay').innerHTML = `Total Score: ${score} / ${totalQuestions} (${percent}%)`;
}

// Helper function to display results for each question
function showDetail(num, isCorrect, correctAns) {
    const detail = document.createElement('p');
    detail.style.color = isCorrect ? "green" : "red";
    detail.innerHTML = `Question ${num}: ${isCorrect ? "Correct" : "Incorrect"} (Answer: ${correctAns})`;
    document.getElementById('detailedResults').appendChild(detail);
}

// Reset function
function resetQuiz() {
    document.getElementById('results').style.display = "none";
    document.getElementById('mobileQuiz').reset();
}