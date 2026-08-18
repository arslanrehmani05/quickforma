import { articleSchema } from './article';
import { encyclopediaSchema } from './encyclopedia';
import { eCategorySchema } from './eCategory';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { authorSchema } from './author';
import { siteSettingsSchema } from './siteSettings';
import { seoDefaultsSchema } from './seoDefaults';

export const schemaTypes = [
  articleSchema,
  encyclopediaSchema,
  eCategorySchema,
  categorySchema,
  tagSchema,
  authorSchema,
  siteSettingsSchema,
  seoDefaultsSchema,
];

