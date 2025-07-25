import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm"; // ← don’t forget this

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <main>
      <nav>
        <button onClick={() => setShowQuestions(false)}>New Question</button>
        <button onClick={() => setShowQuestions(true)}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {showQuestions ? (
          <QuestionList questions={questions} setQuestions={setQuestions} />
        ) : (
          <QuestionForm
            setQuestions={setQuestions}
            setShowQuestions={setShowQuestions}
          />
        )}
      </section>
    </main>
  );
}

export default App;
