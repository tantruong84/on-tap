let questions = [];
let currentIndex = 0;

// Hàm tải câu hỏi từ file
function loadQuestions(fileName) {
  fetch(fileName)
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

      currentIndex = 0; // Đặt lại index
      showQuestion(); // Hiển thị câu hỏi đầu tiên
    })
    .catch((error) => {
      console.error('Lỗi khi tải câu hỏi:', error);
      document.getElementById('questionArea').textContent = 'Không thể tải câu hỏi!';
      toggleButtons(false);
    });
}

// Hiển thị câu hỏi hiện tại
function showQuestion() {
  if (questions.length === 0) {
    document.getElementById('questionArea').textContent = 'Chưa có câu hỏi!';
    document.getElementById('answerArea').textContent = '';
    toggleButtons(false);
    return;
  }

  if (currentIndex >= 0 && currentIndex < questions.length) {
    document.getElementById('questionArea').textContent =
      questions[currentIndex].question;
    document.getElementById('answerArea').textContent = '';
  } else if (currentIndex >= questions.length) {
    document.getElementById('questionArea').textContent = 'Hết câu hỏi!';
    document.getElementById('answerArea').textContent = '';
  } else if (currentIndex < 0) {
    document.getElementById('questionArea').textContent = 'Không có câu hỏi trước!';
    document.getElementById('answerArea').textContent = '';
  }

  // Kích hoạt hoặc vô hiệu hóa các nút
  toggleButtons(true);
  document.getElementById('previousQuestionBtn').disabled = currentIndex <= 0;
  document.getElementById('nextQuestionBtn').disabled = currentIndex >= questions.length - 1;
}

// Kích hoạt hoặc vô hiệu hóa các nút
function toggleButtons(enable) {
  document.getElementById('previousQuestionBtn').disabled = !enable;
  document.getElementById('showAnswerBtn').disabled = !enable;
  document.getElementById('nextQuestionBtn').disabled = !enable;
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

// Nút "Câu hỏi trước"
document.getElementById('previousQuestionBtn').addEventListener('click', () => {
  currentIndex--;
  showQuestion();
});

// Khi người dùng chọn chủ đề
document.getElementById('topicSelector').addEventListener('change', (event) => {
  const selectedTopic = event.target.value;

  if (selectedTopic) {
    // Load câu hỏi từ file được chọn
    loadQuestions(selectedTopic);
  }
});

// Khi load trang, không tự động tải câu hỏi
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('questionArea').textContent =
    'Vui lòng chọn một chủ đề để bắt đầu.';
  toggleButtons(false); // Vô hiệu hóa các nút cho đến khi người dùng chọn chủ đề
});