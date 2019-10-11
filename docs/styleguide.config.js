module.exports = {
  title: 'Intellectus Docs',
  pagePerSection: true,
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
        },
        {
          name: 'Роутинг',
          content: './src/Server/Routing.md',
        },
        {
          name: 'База данных и схема',
        }
      ],
      sectionDepth: 2
    }
  ]
};
