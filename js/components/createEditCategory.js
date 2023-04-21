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
    textContent: 'Сохранить категорию',
    // dataID: app.id,
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
    const emptyRow = createTRCell(['', '']);
    tbody.append(emptyRow); 
  });

  // Ф-ия создания новых пар слов
  const parseData = () => {
    // Получение нового русского слова
    const cellsMain = document.querySelectorAll('.table__cell_one');
    // Получение нового английского слова
    const cellsSecond = document.querySelectorAll('.table__cell_two'); 
    // Массив в котором будут храниться пары
    const pairs = [];
    // Объект данных для строки из которой будут браться необходимые данные для рендера
    const data = {
      pairs: [],
    };
    // Проходимся циклом по строке со словами 
    for (let i = 0; i < cellsMain.length; i++) {
      // Получаем и очишаем содержимое ячеек
      const textMain = cellsMain[i].textContent.trim();
      const texSecond = cellsSecond[i].textContent.trim();
      // Если две ячейки заполнены
      if (textMain && texSecond) {
        // В объект data массива pairs ячейки проходимого циклом числа записывается пара слов 
        data.pairs[i] = [textMain, texSecond];
      }
    };
    // Если title категории не пустой и не равен болванке - он равен заплненными данными
    if (title.textContent.trim && title.textContent !== TITLE) {
      data.title = title.textContent.trim();
    }
    // Если у кнопки СОХРАНИТЬ КАТЕГОРИЮ - есть dataset-id
    if (btnSave.dataset.id) {
      // Передать в объект data.id - id кнопки
      data.id = btnSave.dataset.id;
    }

    return data;
  };
  
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
    const emptyRow = createTRCell(['', '']);
    // Добавление в tbody => массив созданных tr
    tbody.append(...rows, emptyRow);
    // Если в базе data есть id - присваиваем его кнопке СОХРАНИТЬ КАТЕГОРИЮ иначе - пустую строку
    btnSave.dataset.id = data.id ? data.id : '' ;

    app.append(editCategory);
    // Временно
    parseData();
  };

  // Удаление всех категорий
  const unmount = () => {
    editCategory.remove();
  };

  return {unmount, mount, parseData, btnSave, btnCancel};
}