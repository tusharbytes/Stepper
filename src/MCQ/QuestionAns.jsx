import React, { useState } from 'react';

const initialState = {
    Question1: "",
    Question2: "",
    Question3: "",
    Question4: "",
    Question5: "",
};

function QuestionAns() {

    const [userAnwer, setUserAnwer] = useState(initialState);
    const [userStep, setUserStep] = useState(0);
    const [result, setResult] = useState(null);
    console.log(result, "result")

    const multQuestion = [
        {
            question: "What is React?",
            options: [
                "A library for building user interfaces",
                "A programming language",
                "A database management system",
                "A web server",
            ],
            answer: "A library for building user interfaces",
        },
        {
            question: "Which of the following is used to create components in React?",
            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "PHP",
            ],
            answer: "JavaScript",
        },
        {
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML",
                "JavaScript X",
                "Java Syntax Extension",
                "None of the above",
            ],
            answer: "JavaScript XML",
        },
        {
            question: "What is the purpose of the useState hook in React?",
            options: [
                "To handle side effects",
                "To update the component’s state",
                "To render a component",
                "To create new components",
            ],
            answer: "To update the component’s state",
        },
        {
            question: "Which method is used to render a React component to the DOM?",
            options: [
                "React.render()",
                "ReactDOM.render()",
                "render()",
                "createElement()",
            ],
            answer: "ReactDOM.render()",
        },
    ];

    const handleAnwer = (e) => {
        const { value } = e.target;
        setUserAnwer((prev) => ({
            ...prev,
            [`Question${userStep + 1}`]: value,

        }));
    };

    const handleSubmit = () => {
        const score = Object.keys(userAnwer).reduce((acc, key, index) =>
            acc + (userAnwer[key] === multQuestion[index].answer ? 1 : 0),
            0);

        setResult(score);
    };
    

    const handleNext = () => {
        if (userStep < multQuestion.length - 1) {
            setUserStep(userStep + 1);
        }
    };

    const handleBack = () => {
        if (userStep > 0) {
            setUserStep(userStep - 1);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center  ">
            <div className="p-5 bg-white text-gray-800 w-full max-w-lg rounded-lg shadow-lg">
                <div className='py-4'>
                    <div className='h-2 bg-gray-200     rounded-full'>


                        <div className="h-2 bg-green-800 rounded-full duration-300 "
                            style={{ width: `${((userStep + 1) / multQuestion.length) * 100}%` }}>

                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-center text-gray-900">
                        {multQuestion[userStep].question}
                    </h1>
                </div>

                <select
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
                    value={userAnwer[`Question${userStep + 1}`]}
                    onChange={handleAnwer}
                >
                    <option value="">Select an answer</option>
                    {multQuestion[userStep].options.map((item, index) => (
                        <option value={item}>{item}</option>

                    ))}
                </select>

                <div className="flex justify-between">

                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full disabled:opacity-0 hover:bg-gray-400 focus:outline-none"
                        disabled={userStep === 0}
                    >
                        Back
                    </button>

                    {userStep === multQuestion.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 focus:outline-none"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 focus:outline-none"
                        >
                            Next
                        </button>
                    )}
                </div>
                {result !== null && (
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-bold">Your Score: {result} / {multQuestion.length}</h2>
                    </div>
                )}



            </div>
        </div>
    );
}

export default QuestionAns;
