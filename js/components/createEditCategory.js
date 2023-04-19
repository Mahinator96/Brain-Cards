import { createElement } from "../helper/createElement.js";

const TITLE = 'Введите название категории';

export const createEditCategory = (app) => {
  // Создание секции
  const editCategory = createElement('section', {
    className: 'edit section-offset',
  });
  // Создание .container
  const container = createElement('div', {
    className: 'container edit__container',
  });
  // Создание h2.edit__title
  const title = createElement('h2', {
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });
  // Создание таблицы table.edit__table.table
  const table = createElement('table', {
    className: 'edit__table table',
  });
  // Создание thead
  const thead = createElement('thead');
  // Создание thead>tr
  const trThead = createElement('tr');
  // Создание thead>th.table__cell{main}
  const tableHeadCellMain = createElement('th', {
      className: 'table__cell',
      textContent: 'main',
  });
  // Создание thead>th.table__cell{second}
  const tableHeadCellSecond = createElement('th', {
      className: 'table__cell',
      textContent: 'second',
  });
  // Создание thead>th.table__cell
  const tableHeadCellEmpty = createElement('th', {
      className: 'table__cell',
  });

  // Создание tbody
  const tbody = createElement('tbody');
  // Создание div.edit__btn-wrapper
  const btnWrapper = createElement('div', {
    className: 'edit__btn-wrapper',
  });
  // Создание button.edit__btn.edit__add-row{Добавить пару}
  const btnAddRow = createElement('button', {
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  }); 
  // Создание button.edit__btn.edit__save{Сохранить}
  const btnSave = createElement('button', {
    className: 'edit__btn edit__save',
    textContent: 'Сохранить',
  }); 
  // Создание button.edit__btn edit__cancel{Отмена}
  const btnCancel = createElement('button', {
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  editCategory.append(container);
  table.append(thead, tbody);
  thead.append(trThead);
  trThead.append(tableHeadCellMain, tableHeadCellSecond, tableHeadCellEmpty);
  btnWrapper.append(btnAddRow, btnSave, btnCancel);
  container. append(title, table, btnWrapper);

  // Функция создание одной строки tr
  const createTRCell = (dataArr) => {
    // Создание tr
    const tr = createElement('tr');
    // Создание td.table__cell.table__cell_one
    const tableCellMain = createElement('td', {
      className: 'table__cell table__cell_one',
      textContent: dataArr[0],
      contentEditable: true,
    });
    // Создание td.table__cell.table__cell_two
    const tableCellSecond = createElement('td', {
      className: 'table__cell table__cell_two',
      textContent: dataArr[1],
      contentEditable: true,
    });
    // Создание td.table__cell
    const tableCellDel = createElement('td', {
      className: 'table__cell',
    });
    // Создание button.table__del
    const delRow = createElement('button', {
      className: 'table__del',
      textContent: 'x',
    });
    // При клике на button.table__del спросить об удалении
    delRow.addEventListener('click', () =>  {
      // Если пользователь ответиль "ОК" - удалить строку
      if(confirm('Вы уверены, что хотите удалить строку?')) {
        tr.remove();
      };
    });

    tableCellDel.append(delRow);
    tr.append(tableCellMain, tableCellSecond, tableCellDel);

    return tr;
  }; 

  // Очистка заголовка h2.edit__title
  const clearTitle = () => {
    if(title.textContent === TITLE) {
      title.textContent = '';
    }
  };

  // Заполнение заголовка h2.edit__title
  const checkTitle = () => {
    if(title.textContent === '') {
      title.textContent = TITLE;
    }
  };
  // При клике на h2.edit__title происходит удаление содержимого, если до этого он сержал const TITLE 
  title.addEventListener('focus', clearTitle);
  // При ухода с фокуса h2.edit__title происходит его заполнение содержимым, или автоматически заполняется const TITLTE
  title.addEventListener('blur', checkTitle);

  const emptyRow = createTRCell(['', '']);
  
  btnAddRow.addEventListener('click', () => {
    tbody.append(emptyRow); 
  });
  
  // Создание категории
  const mount = (data = {title: TITLE, pairs: []}) => {
    // Очистка tbody и изменение заголовка h2.edit__title на данные из базы
    tbody.textContent = '';
    title.textContent = data.title;

    // Если заголовок h2.edit__title имеет содержимое по умолчанию - задать класс с отрисовкой
    if (title.textContent === TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    // Создание tr для для каждого элемента массива pairs
    const rows = data.pairs.map(createTRCell);
    // Добавление в tbody => массив созданных tr
    tbody.append(...rows, emptyRow);

    app.append(editCategory);
  };

  // Удаление всех категорий
  const unmount = () => {
    editCategory.remove();
  };

  return {unmount, mount };
}