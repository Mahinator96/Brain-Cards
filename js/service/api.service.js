const API_URL = 'https://evanescent-fuchsia-team.glitch.me';

// Ф-ия которая производит запрос к серверу для получения списка категорий
export const fetchCategories = async () => {
  // При успешном запросе
  try { 
    // Ответ от сервера - response
    const response = await fetch(`${API_URL}/api/category`);

    if(response.status === 200 || response.status === 201) {
      // Преобразование данных в массив или объект
      const categories = await response.json();
      return categories;
    } else {
      const error = await response.json();
      // Прерывание функции
      throw error;
    }
  }
  // При неудачном запросе
  catch (error) {
    return { error };
  }
};

// Ф-ия которая производит запрос к серверу для получения списка категорий
export const fetchCards = async (id) => {
// При успешном запросе
try { 
  // Ответ от сервера - response
  const response = await fetch(`${API_URL}/api/category/${id}`);

  if(response.status === 200 || response.status === 201) {
    // Преобразование данных в массив или объект
    const cards = await response.json();
    return cards;
  } else {
    const error = await response.json();
    // Прерывание функции
    throw error;
  }
  }
  // При неудачном запросе
  catch (error) {
    return { error };
  }
};

// Ф-ия которая производит запрос к серверу для записи новых данных
export const fetchCreateCategory = async (data) => {
// При успешном запросе
try { 
  // Записываем добавленные данные
  const response = await fetch(`${API_URL}/api/category/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if(response.status === 200 || response.status === 201) {
    // Преобразование данных в массив или объект
    const categories = await response.json();
    return categories;
  } else {
    const error = await response.json();
    // Прерывание функции
    throw error;
  }
  }
  // При неудачном запросе
  catch (error) {
    return { error };
  }
};

// Ф-ия которая производит запрос к серверу для обновления данных
export const fetchEditCategory = async (id, data) => {
// При успешном запросе
try { 
  // Обновляем добавленные данные
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if(response.status === 200 || response.status === 201) {
    // Преобразование данных в массив или объект
    const categories = await response.json();
    return categories;
  } else {
    const error = await response.json();
    // Прерывание функции
    throw error;
  }
  }
  // При неудачном запросе
  catch (error) {
    return { error };
  }
};

// Ф-ия которая производит запрос к серверу для удаления
export const fetchDeleteCategory = async (id) => {
// При успешном запросе
try { 
  // Обновляем добавленные данные
  const response = await fetch(`${API_URL}/api/category/${id}`, {
    method: 'DELETE',
  });

  if(response.status === 200 || response.status === 201) {
    // Преобразование данных в массив или объект
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    // Прерывание функции
    throw error;
  }
  }
  // При неудачном запросе
  catch (error) {
    return { error };
  }
};

