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