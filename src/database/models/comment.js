import { Model } from './index';

export default class Comment extends Model {
  constructor(attributes) {
    super();
    this.id = attributes.id;
    this.gifId = attributes.gifId;
    this.articleId = attributes.articleId;
    this.comment = attributes.comment;
    this.authorId = attributes.authorId;
  }

  static table() {
    return 'comments';
  }

  static get attributes() {
    return {
      id: 'id',
      gifId: 'gif_id',
      articleId: 'article_id',
      comment: 'body',
      authorId: 'user_id',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }

  static async all(options) {
    const rows = await super.all(options);
    const comments = this.collect(rows);
    return comments;
  }

  static collect(rows) {
    const comments = rows.map((row) => {
      const comment = {};
      const deepValues = {};

      Object.entries(row).forEach((pairs) => {
        const [key, value] = pairs;
        if (key.includes('.')) {
          const [outerKey, innerKey] = key.split('.');
          deepValues[innerKey] = value;
          comment[outerKey] = deepValues;
        } else comment[key] = value;
      });
      return comment;
    });
    return comments;
  }
}
