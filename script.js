// ロゴアニメーション終了後に本編表示
const introVideo = document.getElementById('intro-video');
const mainContent = document.getElementById('main-content');

introVideo.addEventListener('ended', () => {
  introVideo.style.display = 'none';
  mainContent.classList.remove('hidden');
});

const allQuestions = [
  {
    difficulty: 1,
    genre: "国語",
    question: "これは何の漢字？",
    left: "犬",
    right: "猫",
    answer: "left"
  },
  {
    difficulty: 2,
    genre: "算数",
    question: "2 + 2 = ?",
    left: "3",
    right: "4",
    answer: "right"
  },
  {
    difficulty: 3,
    genre: "理科",
    question: "水は何度で沸騰する？",
    left: "90℃",
    right: "100℃",
    answer: "right"
  }
  // 追加自由
];

let questions = [];
let currentQuestionIndex = 0;
let countdownInterval;
let selectedDifficulty = null;

document.querySelectorAll('.difficulty-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    selectedDifficulty = parseInt(this.dataset.level);
    document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');

    questions = allQuestions.filter(q => q.difficulty <= selectedDifficulty);
    if (questions.length === 0) {
      alert("この難易度の問題がありません。");
      return;
    }

    questions.sort((a, b) => a.difficulty - b.difficulty);
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
  });
});

function showQuestion() {
  clearInterval(countdownInterval);

  if (currentQuestionIndex >= questions.length) {
    document.getElementById('result').innerText = "クイズ終了！";
    return;
  }

  const q = questions[currentQuestionIndex];
  document.getElementById('question').innerText = q.question;
  document.getElementById('left-btn').innerText = q.left;
  document.getElementById('right-btn').innerText = q.right;
  document.getElementById('result').innerText = "";

  let timeLeft = 10;
  document.getElementById('countdown').innerText = timeLeft;

  countdownInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('countdown').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('result').innerText = "GAME OVER";
    }
  }, 1000);
}

document.getElementById('left-btn').addEventListener('click', () => checkAnswer('left'));
document.getElementById('right-btn').addEventListener('click', () => checkAnswer('right'));

function checkAnswer(answer) {
  clearInterval(countdownInterval);
  const correct = questions[currentQuestionIndex].answer === answer;
  document.getElementById('result').innerText = correct ? "正解！" : "GAME OVER";
  if (correct) {
    currentQuestionIndex++;
    setTimeout(showQuestion, 2000);
  }
}
