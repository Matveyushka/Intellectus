Данный роут используется для отправки ответов пользователя и получения результатов.

Этим роутом можно воспользоваться только ***один*** раз за сессию.


### Тип Запроса: 
*POST*

### Параметры: 
```typescript
interface Params {
  token: string;
  answers: number[]; // 12 answers
}
```

### Возвращает:
```typescript
interface Returns {
  solutions: number[]; // 12 solutions
  pointsDistribution: number[]; // 12 points
}
```
