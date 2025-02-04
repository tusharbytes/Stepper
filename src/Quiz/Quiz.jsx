import React, { useState } from 'react';
import QuestionTable from './QuestionTable';

const multQuestion = [
    {
        "question": "What is React?",
        "options": [
            "A library for building user interfaces",
            "A programming language",
            "A database management system",
            "A web server"
        ],
        answer: "A library for building user interfaces"
    },
    {
        "question": "Which hook is used to manage state in a functional component?",
        "options": [
            "useEffect",
            "useState",
            "useRef",
            "useContext"
        ],
        answer: "useState"
    },
    {
        "question": "What is the virtual DOM?",
        "options": [
            "A lightweight copy of the actual DOM",
            "A physical database",
            "A web server",
            "A cloud storage service"
        ],
        answer: "A lightweight copy of the actual DOM"
    },
    {
        "question": "Which keyword is used to create a constant in JavaScript?",
        "options": [
            "let",
            "var",
            "const",
            "static"
        ],
        answer: "const"
    },
    {
        "question": "Which method is used to fetch data from an API in React?",
        "options": [
            "fetch()",
            "getData()",
            "retrieve()",
            "getAPI()"
        ],
        answer: "fetch()"
    }
]

function Quiz() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState({});
    console.log(selectedOption, "sleelelelel")
    const [userResult, setUserResult] = useState(null);
    const [choseOption, setChoseOption] = useState(false);
    const [error, setError] = useState("")

    const handleNext = () => {
        if (selectedOption[`Question${activeStep + 1}`] && Object.keys(selectedOption[`Question${activeStep + 1}`]).length > 0) {

            setActiveStep((prev) => prev + 1);
            setError("")
        }
        else {
            setError("Select an answer before proceeding")
        }



    };

    const handleAnswer = (e) => {
        const { value } = e.target;
        setSelectedOption((prev) => ({
            ...prev,
            [`Question${activeStep + 1}`]: value
        }));
        setChoseOption(true);
    };

    const handleSubmit = () => {
        const score = Object.keys(selectedOption).reduce(
            (acc, key, index) => acc + (selectedOption[key] === multQuestion[index]?.answer ? 1 : 0),
            0
        );
        setUserResult(score);
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
        setError("")
        setChoseOption(true);

    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-lg">
                <div className="w-full p-6 bg-blue-600 text-white rounded-t-xl shadow-lg text-center">
                    {!userResult && <h1 className='text-2xl font-semibold'>{multQuestion[activeStep].question}</h1>}
                </div>

                {!userResult ? (
                    <div className="p-6 space-y-4">
                        {multQuestion[activeStep].options.map((choice, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id={`option${index}`}
                                    name={`question${activeStep}`}
                                    value={choice}
                                    checked={selectedOption[`Question${activeStep + 1}`] === choice}
                                    onChange={handleAnswer}
                                    className="text-blue-600 focus:ring h-4 w-4 focus:ring-blue-300"
                                />
                                <label className="text-lg text-gray-700">{choice}</label>

                            </div>
                        ))}
                        {error && <span className='text-red-500' >{error}</span>}

                        <div className="flex justify-between pt-6">
                            <button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-300 focus:outline-none disabled:opacity-0"
                            >
                                Back
                            </button>
                            {activeStep < multQuestion.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={!choseOption}
                                    className="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition duration-300 focus:outline-none disabled:opacity-50"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 focus:outline-none"
                                >
                                    Confirm
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <QuestionTable multQuestion={multQuestion} userResult={userResult} selectedOption={selectedOption} />
                )}
            </div>
        </div>
    );
}

export default Quiz;
