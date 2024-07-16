import { useState } from 'react';

export default function QuestionChecklist({ questions }) {
  const [checkedQuestions, setCheckedQuestions] = useState({});

  const handleCheck = (id) => {
    setCheckedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <input
            type="checkbox"
            id={`question-${question.id}`}
            checked={checkedQuestions[question.id] || false}
            onChange={() => handleCheck(question.id)}
          />
          <label htmlFor={`question-${question.id}`}>
            Pregunta {question.id}: {question.pregunta} - Awajún: {question.awajun}
          </label>
        </div>
      ))}
    </div>
  );
}