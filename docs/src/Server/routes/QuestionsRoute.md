Данный роут используется для получения теста, сгенерированного сервером.


### Тип Запроса: 
*GET*

### Параметры: 
*N/A*

### Возвращает:
```typescript
interface Returns {
  token: string;
  questions: Question[]; // 12 questions
}

interface Question {
  problemFields: (string | null)[]; // 8 strings and 1 null
  questions: string[]; // 6 strings
}
```
