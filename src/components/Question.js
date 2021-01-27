import React, {useState, useEffect, useRef} from 'react'

function Question({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) {

    const [selected, setSelected] = useState('');
    const [error, SetError] = useState('');
    const radiosWrapper = useRef();

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if(findCheckedInput) {
            findCheckedInput.checked = false;
        }
    }, [data])

    const changeHandler = (e) => {
        setSelected(e.target.value);
    }

    const nextClickHandler = (e) => {
        if(selected==='') {
            return SetError('Please select one answer!');
        }

        onAnswerUpdate(prevState => [...prevState, {q: data.question, a: selected}]);
        setSelected('');
        if(activeQuestion < numberOfQuestions - 1 ) {
            onSetActiveQuestion(activeQuestion + 1);
        } else {
            onSetStep(3);
        }

    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h2 className="mb-5">{data.question}</h2>
                    <div className="control" ref={radiosWrapper}>
                        {data.answers.map((choice, index) => (
                        <label className="radio has-background-light" key={index}>
                            <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                            {choice}
                        </label>
                        ))}
                    </div>
                    {error && <div className="has-text-danger">{error}</div>}
                    <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Question
