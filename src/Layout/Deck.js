import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {Switch, Route, Link} from 'react-router-dom'
import Card from "./Card";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import StudyDeck from "./StudyDeck";

function Deck() {
    const {deckId} = useParams()
    const history = useHistory()

    const [deck, setDeck] = useState({});

    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }

  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }

    loadDeck();
  }, [deckId]);

  const deleteFunc = async () => {
    if (window.confirm("Delete this deck?")){
      await deleteDeck(deck.id)
      history.push("/")
      // TODO decks don't reload
    }
  }

  const deleteCardFunc = async (cardId) => {
    if (window.confirm("Delete this card?")){
        await deleteCard(cardId)
        await loadDeck()
      }
  }

  return (
    <React.Fragment>
        <Switch>
            <Route exact path={"/decks/:deckId"}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
              </nav>
                <h1>{deck.name}</h1>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}/edit`}><button>Edit</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
                <Link to={`/decks/${deck.id}/cards/new`}><button>Add Cards</button></Link>
                <button onClick={deleteFunc}>Delete</button>
                <h2>Cards</h2>
                {deck.cards && deck.cards.map((card, index) => 
                    <Card key={index} deckId={deckId} card={card} deleteCard={() => deleteCardFunc(card.id)}/>
                )}
            </Route>
            <Route exact path={"/decks/:deckId/edit"}> 
                <EditDeck deck={deck} />
            </Route> 
            <Route exact path={"/decks/:deckId/study"}> 
                <StudyDeck />
            </Route>
            <Route exact path={"/decks/:deckId/cards/new"}>
                <AddCard />
            </Route>
            <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
                <EditCard />
            </Route>
      </Switch> 
    </React.Fragment>
  );
}

export default Deck;
