import React, { useState } from 'react';
import './Translator.css'; 

const Translator = () => {
    const [steps, setSteps] = useState([
        { label: 'Verify your contacts', completed: false },
        { label: 'Upload your business documents', completed: false },
        { label: 'Set shipping preferences', completed: false },
        { label: 'Set up your bank details', completed: false },
    ]);

    const toggleStep = (index) => {
        setSteps(steps.map((step, i) => i === index ? { ...step, completed: !step.completed } : step));
    }

    return (
        <div className="flex home wh">
            <div className="step-verification">
                {steps.map((step, index) => (
                    <div key={index} className={`step ${step.completed ? 'completed' : ''}`} onClick={() => toggleStep(index)}>
                        {step.completed ? <span className="checkmark">✔</span> : <span className="number">{index + 1}</span>}
                        <span>{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Translator;
