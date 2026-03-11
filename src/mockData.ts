import { Chat, Message } from "./types";

export const chats: Chat[] = [
  { id: "1", title: "React помощь", lastMessageDate: "12:30" },
  { id: "2", title: "TypeScript вопросы", lastMessageDate: "11:45" },
  { id: "3", title: "GigaChat API", lastMessageDate: "10:20" },
  { id: "4", title: "UI идеи", lastMessageDate: "Вчера" },
  { id: "5", title: "Алгоритмы", lastMessageDate: "Пн" },
];

export const messages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Привет! Чем могу помочь?",
    createdAt: "12:00",
  },
  {
    id: "2",
    role: "user",
    content: "Объясни **React hooks**",
    createdAt: "12:01",
  },
  {
    id: "3",
    role: "assistant",
    content: `
### Основные hooks

- useState
- useEffect

\`\`\`ts
const [count, setCount] = useState(0)
\`\`\`
`,
    createdAt: "12:02",
  },
  {
    id: "4",
    role: "user",
    content: "Спасибо!",
    createdAt: "12:03",
  },
  {
    id: "5",
    role: "assistant",
    content: "Всегда пожалуйста 🙂",
    createdAt: "12:04",
  },
  {
    id: "6",
    role: "user",
    content: "Как работает markdown?",
    createdAt: "12:05",
  },
];