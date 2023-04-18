import { createElement } from "../helper/createElement.js";

// Ф-ия создания категорий
export const createCategory = (app) => {
  const category = createElement('section', {
    className: 'category section-offset',
  });
  
  const container = createElement('div', {
    className: 'container'
  });
  category.append(container);

  const categoryList = createElement('ul', {
    className: 'category__list',
  });
  container.append(categoryList);
  // Создание карточки li. Т.к. количество карточек не известно заранее - создаём функцию которая их будет их генерировать в цикле 
  const createCategoryCard = (data) => {
    const item = createElement('li', {
      className: 'category__item',
      // textContent: data.title,
    });
    // Создаём data - берётся от id у передоваемоого массива
    item.dataset.id = data.id;


        /*----------- ДОМАШНЕЕ ЗАДАНИЕ -----------*/
        // Создание button.category__card
        const categoryCard = createElement('button', {
          className: 'category__card',
        });
        // Создание button.category__card>span.category__title
        const categoryTitle = createElement('span', {
          className: 'category__title',
          textContent: data.title,
        })
        // Создание button.category__card>span.category__pairs
        const categoryPairs = createElement('span', {
          className: 'category__pairs',
          textContent: `${data.length} пар`,
        })
        // Добавление в categoryCard => categoryTitle, categoryPairs
        categoryCard.append(categoryTitle, categoryPairs);
        // Создание button.category__btn category__edit[aria-label="редактировать"]
        const categoryEdit = createElement('button', {
          className: 'category__btn category__edit',
        });
        categoryEdit.setAttribute('aria-label', 'редактировать');
        // Создание button.category__btn category__del[aria-label="удалить"]
        const categoryDel = createElement('button', {
          className: 'category__btn category__del',
        });
        categoryEdit.setAttribute('aria-label', 'удалить');

        // Добавление в item => categoryCard, categoryEdit, categoryDel
        item.append(categoryCard, categoryEdit, categoryDel);
        /*----------- КОНЕЦ ДОМАШНЕГО ЗАДАНИЯ -----------*/

    // Возвращаем созданную карточку
    return item;
  };
  // Функция которая добавляет блок на страницу
  const mount = (data) => {
    // Очистка ul.category__list от li
    categoryList.textContent = '';
    // Добавление в main.app => section.category.section-offset
    app.append(category);
    // Создание массива из li элементов столько раз, сколько есть данных в data
    const cards = data.map(createCategoryCard);
    // Добавить в ul.category__list все li элемента массива через spread (spred - перечисляет через запятую)
    categoryList.append(...cards);
  }

  // Функция которая убирает section.category.section-offset с страницы
  const unmount = () => {
    category.remove();
  };

  return { mount, unmount, categoryList };
};