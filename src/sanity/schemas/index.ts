import { articleSchema } from './article';
import { encyclopediaSchema } from './encyclopedia';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { authorSchema } from './author';
import { siteSettingsSchema } from './siteSettings';
import { seoDefaultsSchema } from './seoDefaults';

export const schemaTypes = [
  articleSchema,
  encyclopediaSchema,
  categorySchema,
  tagSchema,
  authorSchema,
  siteSettingsSchema,
  seoDefaultsSchema,
];

