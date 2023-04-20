import { createElement } from "../helper/createElement.js";

export const showAlert = (text, time = 3000) => {
  // div.alert
  const alertBlock = createElement('div', {
    className: 'alert',
  });
  // p.alert__text{text - принятый в функцию текст ошибки}
  const alertText = createElement('p', {
    className: 'alert__text',
    textContent: text,
  });
  alertBlock.append(alertText);
  document.body.append(alertBlock);
  // Для плавности
  setTimeout(() => {
    // Для отображения на странице
    alertBlock.classList.add('alert_show');
  }, 200);
  // Удаление со страницы
  setTimeout(() => {
    alertBlock.classList.remove('alert_show');
    // Удаление будет плавным (как и анимация в css)
    setTimeout(() => {
      alertBlock.classList.remove('alert_show');
    }, 200);
  }, time);
};