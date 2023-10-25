
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CardForm({nonSubmitButtonText, submitFunc, startFrontValue, startBackValue, deckId}) {
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")

    useEffect(() => {
        setFront(startFrontValue)
        setBack(startBackValue)
    }, [startFrontValue, startBackValue])

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitted:", front, back);
        const cardDetails = {front, back}
        setFront("");
        setBack("");
        await submitFunc(cardDetails)
      }

    return (
        <form name="card">
            <label htmlFor="front">
                Front
                <textarea id="front" name="front" onChange={handleFrontChange} value={front} />
            </label>
            <label htmlFor="back">
                Back
                <textarea id="back" name="back" onChange={handleBackChange} value={back} />
            </label>
            <Link to={`/decks/${deckId}`}><button>{nonSubmitButtonText}</button></Link>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default CardForm