import React from 'react'

function QuestionTable({ multQuestion, selectedOption, userResult }) {
    return (
        <div className="mt-10 bg-white shadow-lg rounded-xl p-6 text-gray-800">
            <div className="text-center mb-4">
                <span className="text-lg font-semibold">Score: </span>
                <span className="text-2xl font-extrabold text-blue-600">{userResult} / {multQuestion.length}</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">Question</th>
                            <th className="p-4 text-left">Your Answer</th>
                            <th className="p-4 text-left">Correct Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {multQuestion.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200 transition`}
                            >
                                <td className="p-4 font-bold">{index + 1}</td>
                                <td className="p-4">{item.question}</td>
                                <td className={`p-4 font-semibold ${selectedOption[`Question${index + 1}`] === item.answer ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedOption[`Question${index + 1}`] || "N/A"}
                                </td>
                                <td className="p-4 font-bold text-green-600">{item.answer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default QuestionTable