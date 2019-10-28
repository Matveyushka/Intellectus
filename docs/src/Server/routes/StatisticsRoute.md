Данный роут используется для получения данных о статистике, среди которых:
- Общее количество прохождений теста
- Среднее время прохождения теста
- Распрделение времени по числу правильно отвеченных задач
- Распредление правильно отвеченных задач по общему числу прохождений


### Тип Запроса: 
*GET*

### Параметры: 
```typescript
interface Params {
  passedTestsCounter: number;
  averageTime: number; // in ms
  pointsDistribution: number[]; // 12 points
  averageTimeDistribution: number[]; // 12 items
}
```

### Возвращает:
*N/A*
