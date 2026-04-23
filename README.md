
# Front-Task-3 — чат с ботом

## Демо

- Публичная ссылка: **https://front-task-3-46qy26cad-art4iba2s-projects.vercel.app** 
- Скриншоты:
  - Интерфейс чата (после редизайна): `docs/chat-ui.png`.
  - Аудит бандла: `docs/bundle-visualizer.svg`.

## Стек

- React `19.2.4`
- TypeScript `4.9.5`
- Роутинг: кастомный клиентский роутинг через History API (без React Router)
- Стейт-менеджмент: React Context + `useReducer`
- Стилизация: CSS (`src/styles/theme.css`) + CSS variables
- Markdown: `react-markdown 10.1.0` (ленивая загрузка)
- Сборка: `react-scripts 5.0.1` (CRA)

## Запуск локально

1. Клонируйте репозиторий:

   ```bash
   git clone <https://github.com/art4iba2/Front-Task-3>
   cd Front-Task-3
   ```
   
2. Установите зависимости:

   ```bash
   npm install
   ```
   
3. Запустите проект:

   ```bash
   npm run start
   ```
   
4. Откройте в браузере:

   ```text
   http://localhost:3000
   ```
   
Быстрые команды:

```bash
npm run build
# Анализ вручную по source map и размерам файлов из build/static/js
```