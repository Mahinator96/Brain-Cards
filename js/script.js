import { app, headerParent } from "./elem.js";
import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/api.service.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";
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
  // Ф-ия которые отправляет новые данные (старых данных нет)
  const postHandler = async () => {
    const data = editCategoryObj.parseData();
    // Отправляем на сервер данные
    const dataCategories = await fetchCreateCategory(data);
    // Если есть ошибка при отправке - показать alert и прекратить дальнейшее выполнение программы
    if (dataCategories.error) {
      showAlert(dataCategories.error.message);
      return;
    }
    // Показываем alert что категория добавлена
    showAlert(`Новая категория ${data.title} была добавлена`);
    // Удаляем все со страницы, обновляем заголовок, выводим все категории
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);

  }
  // Ф-ия которые отправляет данные для обновления (старые данные есть)
  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data);

    // Показываем alert что категория добавлена
    showAlert(`Категория ${data.title} обновлена`);
    // Удаляем все со страницы, обновляем заголовок, выводим все категории
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');
    categoryObj.mount(dataCategories);
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

  // При клике на headerBtn ДОБАВИТЬ КАТЕГОРИЮ - изменяет содержимое headerTitle
  headerObj.headerBtn.addEventListener('click', () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle('Новая категория');
    editCategoryObj.mount();
    // При клике на СОХРАНИТЬ - отправляет данные 
    editCategoryObj.btnSave.addEventListener('click', postHandler);
    // При клике на СОХРАНИТЬ - удаляет обработчик обновления данных
    editCategoryObj.btnSave.removeEventListener('click', patchHandler);
  });

  // При нажатии на ul.category__list ВСЕ КАТЕГОРИИ НА СТРАНИЦЕ
  categoryObj.categoryList.addEventListener('click', async ({target}) => {
    // При клике на li.category__item ОПРЕДЁННАЯ КАТЕГОРИЯ
    const categoryItem = target.closest('.category__item');
    // Если клик был на button.category__btn.category__edit ИКОНКА РЕДАКТИРОВАНИЯ 
    if (target.closest('.category__edit')) {
      // Получить данные о категории 
      const dataCards = await fetchCards(categoryItem.dataset.id);
      // Удалить всё с страницы
      allSectionUnmount();
      // Изменить заголовок
      headerObj.updateHeaderTitle('Редактирование');
      // Собрать таблицу из полученных данных
      editCategoryObj.mount(dataCards);
      // При клике на СОХРАНИТЬ - обновляем данные 
      editCategoryObj.btnSave.addEventListener('click', patchHandler);
      // При клике на СОХРАНИТЬ - удаляет обработчик отпровления данных
      editCategoryObj.btnSave.removeEventListener('click', postHandler);
      
      return;
    }
    // Если клик был на button.category__btn.category__del
    if (target.closest('.category__del')) {
      // Спросить пользователя об подтверждении удаления
      if (confirm('Вы уверены, что хотите удалить категорию?')) {
        const result = fetchDeleteCategory(categoryItem.dataset.id);
        // Если есть ошибка - вывести alert
        if (result.error) {
          showAlert(result.error.message);
        }

        const categoryTitle = categoryItem.querySelector('.category__title').textContent;
        showAlert(`Категория ${categoryTitle} удалена!`);
        categoryItem.remove();
      }

      return;
    }
    // Если клик просто на карточке
    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      
      allSectionUnmount();

      headerObj.updateHeaderTitle(dataCards.title);

      pairsObj.mount(dataCards);
    }
  });

  pairsObj.buttonReturn.addEventListener('click', renderIndex);
};

initApp();