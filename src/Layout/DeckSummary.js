import React from "react";
import { Link } from "react-router-dom";

function DeckSummary({deck, deleteDeck}) {
  return (
    <React.Fragment>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <p>{deck.cards.length} cards</p>
        <Link to={`/decks/${deck.id}`}><button>View</button></Link>
        <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
        <button onClick={deleteDeck}>Delete</button>
    </React.Fragment>
  );
}

export default DeckSummary;
