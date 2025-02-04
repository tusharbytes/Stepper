import React from 'react'

function QuestionTable({multQuestion,selectedOption ,userResult}) {
  return (
    <div className="mt-10 bg-white shadow-lg rounded-xl p-6 text-gray-800">
    <div className="text-center">
        <span className="text-lg font-semibold">Score: </span>
        <span className="text-2xl font-extrabold text-blue-600">{userResult} / {multQuestion.length}</span>
    </div>
    <table className="mt-6 w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-blue-600 text-white">
            <tr>
                <th className="p-3">#</th>
                <th className="p-3">Question</th>
                <th className="p-3">Your Answer</th>
                <th className="p-3">Correct Answer</th>
            </tr>
        </thead>
        <tbody>
            {multQuestion.map((item, index) => (
                <tr key={index} className="border-b">
                    <td className="p-3 font-bold">{index + 1}</td>
                    <td className="p-3">{item.question}</td>
                    <td className="p-3 text-{selectedOption[`Question${index + 1}`] === item.answer ? 'green-600' : 'red-600'}">
                        {selectedOption[`Question${index + 1}`] || "N/A"}
                    </td>
                    <td className="p-3 font-bold text-green-600">{item.answer}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default QuestionTable