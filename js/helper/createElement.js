// Функция создания элементов
export const createElement = (tag, attr) => {
  const element = document.createElement(tag);
  // Передаём оставшиеся аттрибуты (если их небыло - создаёт их)
  return Object.assign(element, attr);
};