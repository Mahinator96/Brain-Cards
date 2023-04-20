import { createElement } from "../helper/createElement.js";
// Функция создания карточки пары слов
export const createPairs = (app) => {
  // section.card.section__offset
  const pairs = createElement('section', {
    className: 'card section__offset',
  });
  // div.container
  const container = createElement('div', {
    className: 'container card__container',
  })
  // button.card__return[aria-label="Возврат к категориям"]
  const buttonReturn = createElement('button', {
    className: 'card__return',
    ariaLabel: 'Возврат к категории',
  })
  // button.card__item
  const buttonCard = createElement('button', {
    className: 'card__item',
  });
  // span.card__front
  const front = createElement('span', {
    className: 'card__front',
    textContent: 'one',
  });
  // span.card__back
  const back = createElement('span', {
    className: 'card__back',
    textContent: 'two',
  });
  
  buttonCard.append(front, back);
  container.append(buttonReturn, buttonCard);
  pairs.append(container);

  const mount = (data) => {
    app.append(pairs);
  };

  const unmount = () => {
    pairs.remove();
  };

  return {buttonReturn, mount, unmount};

};