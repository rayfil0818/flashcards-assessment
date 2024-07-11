import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { deleteCard, readDeck } from '../utils/api';

function ViewCards({ initialCards = [] }) {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        if (deck && deck.cards) {
          setCards(deck.cards);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }

    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const deleteCardHandler = async (cardId) => {
    const response = window.confirm(
      'Delete this card? You will not be able to recover it.'
    );
    if (response) {
      await deleteCard(cardId);
      setCards((currentCards) => currentCards.filter((card) => card.id !== cardId));
    }
  };

  const styledCards = cards.map((card, index) => (
    <div key={index} className='card'>
      <div className='card-body'>
        <div className='row d-flex justify-content-between'>
          <div className='col-5'>{card.front}</div>
          <div className='col-5'>
            {card.back}
            <div>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button className='btn btn-secondary m-3'>
                  <i className='fas fa-edit'></i> Edit
                </button>
              </Link>
              <button
                className='btn btn-danger m-3'
                onClick={() => deleteCardHandler(card.id)}
              >
                <i className='fas fa-trash'></i> Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className='card'>
        <div className='card-header text-center'>
          <h2 className='text-center'>Cards</h2>
        </div>
      </div>
      {styledCards}
    </div>
  );
}

export default ViewCards;
