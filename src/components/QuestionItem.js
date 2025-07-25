import React from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value);
            fetch(`http://localhost:4000/questions/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ correctIndex: newIndex }),
            })
              .then((res) => res.json())
              .then((updated) => {
                setQuestions((prev) =>
                  prev.map((q) => (q.id === id ? updated : q))
                );
              });
          }}
        >
          {answers.map((a, index) => (
            <option key={index} value={index}>
              {a}
            </option>
          ))}
        </select>
      </label>
      <button
        onClick={() => {
          fetch(`http://localhost:4000/questions/${id}`, {
            method: "DELETE",
          }).then(() => {
            setQuestions((prev) => prev.filter((q) => q.id !== id));
          });
        }}
      >
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
