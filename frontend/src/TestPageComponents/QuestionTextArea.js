import React from 'react'

export default function QuestionTextArea({testDetails,index}) {
    console.log(testDetails.questions[index].questionText)
  return (
    <div>{testDetails.questions[index].questionText}</div>
  )
}
