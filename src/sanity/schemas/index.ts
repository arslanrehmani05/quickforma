import { articleSchema } from './article';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { authorSchema } from './author';
import { siteSettingsSchema } from './siteSettings';
import { seoDefaultsSchema } from './seoDefaults';
import { searchIntentItemSchema } from './searchIntentItem';
import { keywordItemSchema } from './keywordItem';
import { topicClusterSchema } from './topicCluster';
import { questionItemSchema } from './questionItem';
import { researchSprintSchema } from './researchSprint';
import { competitorIntelSchema } from './competitorIntel';
import { contentBriefSchema } from './contentBrief';

export const schemaTypes = [
  articleSchema,
  categorySchema,
  tagSchema,
  authorSchema,
  siteSettingsSchema,
  seoDefaultsSchema,
  searchIntentItemSchema,
  keywordItemSchema,
  topicClusterSchema,
  questionItemSchema,
  researchSprintSchema,
  competitorIntelSchema,
  contentBriefSchema,
];
