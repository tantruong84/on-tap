let questions = [];
let currentIndex = 0;

// Tải file questions.txt khi trang được mở
fetch('questions.txt')
  .then((response) => response.text())
  .then((data) => {
    // Chuyển đổi nội dung thành mảng câu hỏi và câu trả lời
    questions = data
      .trim()
      .split('\n')
      .map((line) => {
        const [question, answer] = line.split('|');
        return { question: question.trim(), answer: answer.trim() };
      });

    showQuestion();
  })
  .catch((error) => {
    console.error('Lỗi khi tải câu hỏi:', error);
    document.getElementById('questionArea').textContent = 'Không thể tải câu hỏi!';
  });

// Hiển thị câu hỏi hiện tại
function showQuestion() {
  if (currentIndex < questions.length) {
    document.getElementById('questionArea').textContent =
      questions[currentIndex].question;
    document.getElementById('answerArea').textContent = '???';
  } else {
    document.getElementById('questionArea').textContent = 'Hết câu hỏi!';
    document.getElementById('answerArea').textContent = '';
  }
}

// Nút "Xem câu trả lời"
document.getElementById('showAnswerBtn').addEventListener('click', () => {
  if (currentIndex < questions.length) {
    document.getElementById('answerArea').textContent =
      questions[currentIndex].answer;
  }
});

// Nút "Câu hỏi tiếp theo"
document.getElementById('nextQuestionBtn').addEventListener('click', () => {
  currentIndex++;
  showQuestion();
});