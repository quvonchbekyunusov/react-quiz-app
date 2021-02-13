import React, {useState, useEffect} from 'react';
import {formatTime} from '../utils/index'

function End({ results, data, onReset, onAnswersCheck, time, leaderboard, name, onQuit, fireData, leaderData }) {

    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        var correct = 0;
        results.forEach((result, index) => {
            if(result.a === data.[index].answer) {
                correct++;
                leaderboard.correct++
            }
        });
        setCorrectAnswers(correct)
        // leaderboard.correct = correctAnswers
        leaderboard.name=name;
        leaderboard.time=time;
        leaderData.push(leaderboard)
        console.log(leaderData)

// eslint-disable-next-line 
    }, [])
    useEffect(() => {
        console.log(leaderData.sort((correct) => {
          return (a, b) => (a[correct] > b[correct]) ? 1 : ((b[correct] > a[correct]) ? -1 : 0)}))
        // eslint-disable-next-line
      }, [])
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h3>Your results</h3>
                    <p>{correctAnswers} of {data.length}</p>
                    <p><strong>{Math.floor(correctAnswers/data.length * 100)}%</strong></p>
                    <p><strong>Your time: </strong> {formatTime(time)} </p>
                    <button className="button is-info mr-2" onClick={onAnswersCheck} >Check your answers</button>
                    <button className="button is-success mr-2" onClick={onReset}>Try again</button>
                    <button className="button is-danger" onClick={onQuit}>Quit</button>
                    <table className="table">
                    <thead>
                        <tr>
                        <th><abbr title="Position">Name</abbr></th>
                        <th><abbr title="Played">Correct answers</abbr></th>
                        <th><abbr title="Won">Time</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.correct}</td>
                                <td>{data.time} s</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default End;
