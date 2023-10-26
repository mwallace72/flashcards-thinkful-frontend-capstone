import React, { useState, useEffect } from "react";
import { readDeck} from "../utils/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function StudyDeck() {
    const {deckId} = useParams()
    const history = useHistory()

    const [deck, setDeck] = useState({});
    const [cardLength, setCardLength] = useState(0)
    const [currentCardNumber, setCurrentCardNumber] = useState(1)
    const [flipped, setFlipped] = useState(false)

    

    useEffect(() => {
        const loadDeck = async () => {
            const response = await readDeck(deckId);
            setDeck(response);
            setCardLength(response.cards.length)
        }

        loadDeck();
    }, [deckId]);

    const nextCard = () => {
        if (currentCardNumber == cardLength) setCurrentCardNumber(1)
        else setCurrentCardNumber(currentCardNumber+1)
        setFlipped(false)
    }
    
    const flipCard = () => {
        setFlipped(!flipped)
        if (currentCardNumber == cardLength) {
            if (window.confirm("Restart cards?")) {
                nextCard()
            } else {
                history.push("/")
            }
        }
    }

  return (
    <React.Fragment>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        {cardLength < 3 
            ? <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {cardLength} cards in this deck.</p>
            </div>
            : <div>
                <h3>Card {currentCardNumber} of {cardLength}</h3>
                <p>{flipped ? deck.cards[currentCardNumber-1].back : deck.cards[currentCardNumber-1].front}</p>
                <button onClick={flipCard}>Flip</button>
                {flipped && <button onClick={nextCard}>Next</button>}
            </div>
        }
    </React.Fragment>
  );
}

export default StudyDeck;
