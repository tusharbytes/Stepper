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
        setError("")
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
        <div className="flex h-screen items-center justify-center bg-[#83a1b0] ">


            <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-10  ">

                <div className="py-4 relative  ">
                    {/* Step Numbers */}
                    <div className="flex  justify-between mb-2  text-sm font-semibold text-gray-600">
                        {multQuestion.map((_, index) => (
                            <span key={index} className={`w-10 h-10 flex justify-center  items-center  rounded-full bg-blue-600 text-center ${activeStep === index ? 'text-white    font-bold' : 'text-black bg-white'}`}>
                                {index + 1}
                            </span>
                        ))}
                    </div>


                </div>


                <div className="w-full p-6 bg-[#2C3E50] text-white rounded-t-xl shadow-lg text-center">
                    {!userResult && <h1 className='text-2xl w-full text-[#ECF0F1] font-semibold'>{multQuestion[activeStep].question}</h1>}
                </div>

                {!userResult ? (
                    <div className="p-6 space-y-4">
                        {multQuestion[activeStep].options.map((choice, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <button
                                    value={choice}
                                    onClick={handleAnswer}
                                    className={`border-2 rounded-xl px-4 py-3 w-full text-lg font-semibold transition-all duration-300 ease-in-out shadow-md  
                            ${selectedOption[`Question${activeStep + 1}`] === choice
                                            ? "bg-[#2C3E50] text-white border  shadow-lg scale-105"
                                            : "  border-gray-600   hover:border-gray-500 hover:scale-105"
                                        }`}
                                >
                                    {choice}
                                </button>
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
                                    className="px-4 py-2 shadow-lg hover:scale-105 rounded-lg text-white bg-[#27AE60] hover:bg-[#497b6f] transition duration-300 focus:outline-none disabled:opacity-50"
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
