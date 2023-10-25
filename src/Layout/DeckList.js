import React from "react";
import DeckSummary from "./DeckSummary";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Decklist({starterDecks, reloadDecks}) {

  const deleteFunc = async (id) => {
    if (window.confirm("Delete this deck?")){
      await deleteDeck(id)
      // await reloadDecks()
    }
  }

  return (
    <React.Fragment>
      <Link to="/decks/new"><button>Create Deck</button></Link>
      {starterDecks.map((deck, index) => 
        <DeckSummary key={index} deck={deck} deleteDeck={() => deleteFunc(deck.id)} />
      )}
    </React.Fragment>
  );
}

export default Decklist;
