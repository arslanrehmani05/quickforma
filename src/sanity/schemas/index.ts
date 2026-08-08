import { articleSchema } from './article';
import { playbookSchema } from './playbook';
import { collectionSchema } from './collection';
import { glossarySchema } from './glossary';
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
  playbookSchema,
  collectionSchema,
  glossarySchema,
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
