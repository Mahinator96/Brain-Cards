import { createElement } from "../helper/createElement.js";
import { shuffle } from "../helper/shuffle.js";
import { showAlert } from "./showAlert.js";
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
    ariaLabel: 'Возврат к категориям',
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

  // Ф-ия управления карточкой со словом
  const cardController = (data) => {
    // для шага по данным из сервера по массиву pairs
    let index = 0;
    // Получение фронтальной стороны карточки (англ. слова) из массива pairs[index][0]
    // pairs[["me", "меня"], ["you", "тебя"] ...] где pairs[index] - пара слов ["me", "меня"], pairs[index][0] - первое словов из пары
    front.textContent = data[index][0];
    back.textContent = data[index][1];

    // Ф-ия переворачивания карточки при клике
    const flipCard = () => {
      buttonCard.classList.add('card__item_flipped');
      // Удаляем обработчик (переворачивания карточки), чтобы исправить баг с частым кликом на карточки
      buttonCard.removeEventListener('click', flipCard);
      // Карточка переварачивается обратно спустя setTimeout
      setTimeout(() => {
        buttonCard.classList.remove('card__item_flipped');
        // Переход к следующей карточке спустя половину времени переворота карточки
        // card__item__flipped.card__front {transition 0.2s}
        setTimeout(() => {
          index++;
          // Если подошли в конец массива карточек - возвращаемся к категориям
          if (index === data.length) {
            // Изменяем текст карточки
            front.textContent = 'The end';
            showAlert('Вернёмся к категориям!', 2000);
            // Из JS кликаем по button.card__return[aria-label="Возврат к категориям"]
            setTimeout(() => {
              buttonReturn.click();
            }, 2000);
            return;
          } 
          // Иначе продолжаем переходить к следующей карточке
          front.textContent = data[index][0];
          back.textContent = data[index][1];
          // Для того, чтобы точно пользователь успел прочитать
          setTimeout(() => {
            // Снова разрешаем переворачивать карточку
            buttonCard.addEventListener('click', flipCard);
          }, 200);
        }, 100);
      }, 1000);
    };
    // При клике на button.card__item - переворачиваем карточку
    buttonCard.addEventListener('click', flipCard);
  };


  const mount = (data) => {
    app.append(pairs);
    
    // Здесь перемешать массив - принимает массив и возвращает новый перемешанный массив
    const newData = shuffle(data.pairs);
    cardController(newData);
  };

  const unmount = () => {
    pairs.remove();
  };

  return {buttonReturn, mount, unmount};

};