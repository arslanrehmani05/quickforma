import { articleSchema } from './article';
import { playbookSchema } from './playbook';
import { collectionSchema } from './collection';
import { glossarySchema } from './glossary';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { authorSchema } from './author';
import { siteSettingsSchema } from './siteSettings';
import { seoDefaultsSchema } from './seoDefaults';

export const schemaTypes = [
  articleSchema,
  playbookSchema,
  collectionSchema,
  glossarySchema,
  categorySchema,
  tagSchema,
  authorSchema,
  siteSettingsSchema,
  seoDefaultsSchema,
];
