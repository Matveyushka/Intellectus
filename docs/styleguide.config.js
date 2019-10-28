module.exports = {
  title: 'Intellectus Docs',
  pagePerSection: true,
  template: {
    favicon: './images/favicon.png',
  },
  sections: [
    {
      name: 'Documentation',
      content: './src/Documentation/Documentation.md',
      sections: [
        {
          name: 'Changelog',
          content: './src/Documentation/Changelog.md',
        }
      ],
      sectionDepth: 1,
    },
    {
      name: 'Client',
      sections: [
        {
          name: 'Страница Main',
          content: './src/Client/Main.md',
        },
        {
          name: 'Страница Statistics',
        },
        {
          name: 'Страница About',
        },
        {
          name: 'Страница Contact Us',
        },
      ],
      sectionDepth: 2
    },
    {
      name: 'Server',
      sections: [
        {
          name: 'Генерация задач',
          content: './src/Server/Problems.md',
          sections: [
            {
              name: 'Побитовая задача',
              content: './src/Server/problems/Bitwise.md',
            },
            {
              name: 'Полу-магический квадрат',
              content: './src/Server/problems/HalfMagicSquare.md',
            },
            {
              name: 'Задача недостающего элемента',
              content: './src/Server/problems/MissingElement.md',
            },
            {
              name: 'Судоку',
              content: './src/Server/problems/Sudoku.md',
            },
            {
              name: 'Задача суммы',
              content: './src/Server/problems/Sum.md',
            },
            {
              name: 'Задача двух фигур (Легкая сложность)',
              content: './src/Server/problems/TwoFiguresEasy.md',
            },
            {
              name: 'Задача двух фигур (Средняя средняя)',
              content: './src/Server/problems/TwoFiguresMedium.md',
            },
          ],
          sectionDepth: 1,
        },
        {
          name: 'Роутинг',
          content: './src/Server/Routing.md',
          sections: [
            {
              name: '/questions',
              content: './src/Server/routes/QuestionsRoute.md',
            },
            {
              name: '/answers',
              content: './src/Server/routes/AnswersRoute.md',
            },
            {
              name: '/feedback',
              content: './src/Server/routes/FeedbackRoute.md',
            },
            {
              name: '/report',
              content: './src/Server/routes/ReportRoute.md',
            },
            {
              name: '/statistics-data',
              content: './src/Server/routes/StatisticsRoute.md',
            },
          ],
          sectionDepth: 1,
        },
        {
          name: 'База данных и схема',
        }
      ],
      sectionDepth: 2
    }
  ]
};
