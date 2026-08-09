import { articleSchema } from './article';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { authorSchema } from './author';
import { siteSettingsSchema } from './siteSettings';
import { seoDefaultsSchema } from './seoDefaults';

export const schemaTypes = [
  articleSchema,
  categorySchema,
  tagSchema,
  authorSchema,
  siteSettingsSchema,
  seoDefaultsSchema,
];

