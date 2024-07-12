import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    fetchDecks();
    return () => abortController.abort();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    const confirmation = window.confirm(
      'Delete this deck? You will not be able to recover it.'
    );
    if (confirmation) {
      await deleteDeck(deckId);
      setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <div>
      {decks.map((deck) => (
        <div key={deck.id} className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{deck.name}</h5>
            <p className='card-text'>{deck.description}</p>
            <p className='card-text'>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}`} className='btn btn-secondary'>
              🔎 View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className='btn btn-primary'>
              📖 Study
            </Link>
            <button
              className='btn btn-danger'
              onClick={() => handleDeleteDeck(deck.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
