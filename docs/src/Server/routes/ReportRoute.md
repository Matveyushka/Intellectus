Данный роут используется для отправки жалобы об ошибке в тестах.


### Тип Запроса: 
*POST*

### Параметры: 
```typescript
interface Params {
  name: string;
  email: string;
  title: string;
  body: string;
  numberOfQuestion: number; // index of incorrect question
}
```

### Возвращает:
*N/A*
