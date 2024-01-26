import React from 'react';
import './SolutionAnswerArea.css';

export default function SolutionAnswerArea({ teacherQuestion, studentQuestion }) {
  const renderOptions = () => {
    if (!teacherQuestion || !studentQuestion) {
      return null; // or handle the loading state appropriately
    }

    if (
      teacherQuestion.questionType === 'singleCorrect' ||
      teacherQuestion.questionType === 'multipleCorrect'
    ) {
      return teacherQuestion.options.map((option, index) => {
        const isTeacherCorrect = option.isCorrect;
        const studentOptions = studentQuestion.options || [];
        const isStudentCorrect = studentOptions[index]?.isCorrect;

        let optionColor = 'normal';

        if (isTeacherCorrect && isStudentCorrect) {
          optionColor = 'green';
        } else if (!isTeacherCorrect && isStudentCorrect) {
          optionColor = 'red';
        } else if (isTeacherCorrect && !isStudentCorrect) {
          optionColor = 'yellow';
        }

        return (
          <div key={index} className={`option ${optionColor}`}>
            {option.text}
          </div>
        );
      });
    } else if (teacherQuestion.questionType === 'integerType') {
      const teacherAnswer = teacherQuestion.integerAns;
      const studentAnswer = studentQuestion.integerAns;

      const answerColor = teacherAnswer === studentAnswer ? 'green' : 'normal';

      return (
        <div className={`answer ${answerColor}`}>
          Teacher Answer: {teacherAnswer}, Student Answer: {studentAnswer}
        </div>
      );
    } else if (teacherQuestion.questionType === 'decimalType') {
      const teacherLowDecimal = teacherQuestion.lowDecimal;
      const teacherHighDecimal = teacherQuestion.highDecimal;

      const studentLowDecimal = studentQuestion.lowDecimal;
      const studentHighDecimal = studentQuestion.highDecimal;

      const rangeColor =
        teacherLowDecimal <= studentLowDecimal &&
        studentHighDecimal <= teacherHighDecimal
          ? 'green'
          : 'normal';

      return (
        <div className={`range ${rangeColor}`}>
          Teacher Range: {teacherLowDecimal} - {teacherHighDecimal}, Student Range: {studentLowDecimal} - {studentHighDecimal}
        </div>
      );
    }

    return null;
  };

  return <div>{renderOptions()}</div>;
}
