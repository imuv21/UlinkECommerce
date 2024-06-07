import React, { useState } from 'react';
import './Translator.css'; 

const Translator = () => {

    const [steps, setSteps] = useState([
        { label: 'Verify your contacts', completed: true },
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
                <div className={`step ${steps[0].completed ? 'completed' : ''}`} >
                    {steps[0].completed ? <span className="checkmark">✔</span> : <span className="number">1</span>}
                    <span>{steps[0].label}</span>
                </div>
                <div className={`step ${steps[1].completed ? 'completed' : ''}`} >
                    {steps[1].completed ? <span className="checkmark">✔</span> : <span className="number">2</span>}
                    <span>{steps[1].label}</span>
                </div>
                <div className={`step ${steps[2].completed ? 'completed' : ''}`} >
                    {steps[2].completed ? <span className="checkmark">✔</span> : <span className="number">3</span>}
                    <span>{steps[2].label}</span>
                </div>
                <div className={`step ${steps[3].completed ? 'completed' : ''}`} onClick={() => toggleStep(3)}>
                    {steps[3].completed ? <span className="checkmark">✔</span> : <span className="number">4</span>}
                    <span>{steps[3].label}</span>
                </div>
            </div>
        </div>
    );
}

export default Translator;
