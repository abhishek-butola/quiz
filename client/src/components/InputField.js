import React from 'react';

export default function InputField({ options, selected, onChange }) {
  return (
    <div>
      {options.choices.map((choice, index) => (
        <div key={index}>
          <div>
            <input
              type="checkbox"
              name={options.questionId}
              value={choice.value}
              checked={selected === choice.value.toString()}
              onChange={onChange}
            />

            <span className="ml-3">{choice.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

//className="checkbox checkbox-circle checkbox-blue"
