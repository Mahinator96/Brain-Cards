import { createElement } from "../helper/createElement.js";

export const createHeader = (parent) => {
  // Создаём div, даём класс, добавляем в конец header
  const container = createElement('div', {
    className: 'container header__container',
  });
  parent.append(container);
  
  // Создаём ссылку, прописываем href, даём класс
  const headerLogoLink = createElement('a', {
    href: '#',
    className: 'header__logo-link',
  });

  // Создаём картинку, прописываем src, даём класс и alt, добавляем в конец headerLogoLink
  const logo = createElement('img', {
    src:        'img/logo.svg',
    className:  'header__logo',
    alt:        'Логотип сервиса Brain Cards',
  });
  headerLogoLink.append(logo);

  // Создаём h2, даём класс и текст
  const headerTitle = createElement('h2', {
    className: 'header__subtitle',
    textContent: 'Категории',
  });

  const headerBtn = createElement('button', {
    className: 'header__btn',
    textContent: 'Добавить категорию',
  });

  // Добавляем в container созданные элементы в нужном порядке
  container.append(headerLogoLink, headerTitle, headerBtn);

  // Функция для изменения содержимого headerTitle
  const updateHeaderTitle = (title) => {
    headerTitle.textContent = title;
  }

  // Функция возвращает элементы и функцию для их дальнейшего использования (добавления обработчиков события, изменения текста в headerTitle)
  return { headerLogoLink, headerBtn, updateHeaderTitle };
};