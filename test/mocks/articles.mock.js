import faker from 'faker';

const newArticle = {
  title: faker.lorem.sentence(),
  article: faker.lorem.text(),
};

const updatedArticle = {
  title: faker.lorem.sentence(),
  article: faker.lorem.text(),
};

export { newArticle, updatedArticle };
