import { app, headerParent } from "./elem.js";
import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/api.service.js";
import { createPairs } from "./components/createPairs.js";
// Ф-ия асинхронная - чтобы получить данные с сервера
const initApp = async () => {
  // Запись в константу всех возвращаемых из функции элементов и функций
  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = createPairs(app);

  // Убрать все категории 
  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
  }

  // Функция добавляет все категории на страницу 
  const renderIndex = async (e) => {
    // Добавление preventDefault тогда - когда он есть, чтобы не было ошибки
    e?.preventDefault();
    allSectionUnmount();
    // Получение данных списка категорий из сервера
    const categories = await fetchCategories();
    // Если запрос вернул ошибку - создать p.server-error{Ошибка...} в .app
    if(categories.error) {
      const errorText = createElement('p', {
        className: 'server-error',
        textContent: 'Ошибка сервера, попробуйте зайти позже',
      });
      app.append(errorText);
      // Чтобы программа дальше не продолжала работать
      return;
    };
    // Запуск создания элеметов li.category__item на странице если ошибок нет
    categoryObj.mount(categories);
    headerObj.updateHeaderTitle('Категории');
  };
  renderIndex();

  // При клике на headerLogoLink - выполняет ф-ию renderIndex
  headerObj.headerLogoLink.addEventListener('click', renderIndex);

  // При клике на headerBtn - изменяет содержимое headerTitle
  headerObj.headerBtn.addEventListener('click', () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle('Новая категория');
    editCategoryObj.mount();
  });
  // При нажатии на ul.category__list
  categoryObj.categoryList.addEventListener('click', async ({target}) => {
    // При клике на li.category__item
    const categoryItem = target.closest('.category__item');

    // Если клик был на li.category__item
    if (target.closest('.category__edit')) {
      // Получить данные о категории 
      const dataCards = await fetchCards(categoryItem.dataset.id);
      // Удалить всё с страницы
      allSectionUnmount();
      // Изменить заголовок
      headerObj.updateHeaderTitle('Редактирование');
      // Собрать таблицу из полученных данных
      editCategoryObj.mount(dataCards);
      
      return;
    }
  });
};

initApp();