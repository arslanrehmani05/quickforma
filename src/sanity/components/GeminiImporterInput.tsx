import React, { useState, useEffect } from 'react';
import { useFormValue, useDocumentOperation, PatchEvent, set } from 'sanity';
import { Card, Stack, TextArea, TextInput, Button, Text, Badge, Flex, Inline, Box } from '@sanity/ui';
import { parseMasterMarkdownTemplate, callGeminiApi, ParsedEncyclopediaData } from '../utils/markdownToSanity';

export function GeminiImporterInput(props: any) {
  const [apiKey, setApiKey] = useState<string>('');
  const [rawContent, setRawContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [status, setStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);

  const documentId = (useFormValue(['_id']) as string) || '';
  const documentType = (useFormValue(['_type']) as string) || 'encyclopedia';
  const cleanDocId = documentId ? documentId.replace(/^drafts\./, '') : '';

  const { patch } = useDocumentOperation(cleanDocId, documentType);

  // Load saved Gemini API Key from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('QUICKFORMA_GEMINI_API_KEY') || '';
      if (savedKey) setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('QUICKFORMA_GEMINI_API_KEY', key.trim());
    }
  };

  const handleImport = async (useAi: boolean) => {
    if (!rawContent.trim()) {
      setStatus({ message: 'Please paste your Markdown content before importing.', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setStatus({ message: useAi ? 'Sending content to Gemini AI for intelligent schema parsing...' : 'Parsing markdown section headers...', type: 'info' });

    try {
      let parsedData: ParsedEncyclopediaData;

      if (useAi && apiKey.trim()) {
        parsedData = await callGeminiApi(apiKey.trim(), rawContent);
      } else {
        parsedData = parseMasterMarkdownTemplate(rawContent);
      }

      const patchSet: Record<string, any> = {};

      if (parsedData.title) patchSet.title = parsedData.title;
      if (parsedData.slug?.current) patchSet.slug = { _type: 'slug', current: parsedData.slug.current };
      if (parsedData.previousSlugs) patchSet.previousSlugs = parsedData.previousSlugs;
      if (parsedData.shortDefinition) patchSet.shortDefinition = parsedData.shortDefinition;
      if (parsedData.synonyms) patchSet.synonyms = parsedData.synonyms;
      if (parsedData.simpleExplanation) patchSet.simpleExplanation = parsedData.simpleExplanation;
      if (parsedData.howItWorks) patchSet.howItWorks = parsedData.howItWorks;
      if (parsedData.formulaMethod) patchSet.formulaMethod = parsedData.formulaMethod;
      if (parsedData.workedExample) patchSet.workedExample = parsedData.workedExample;
      if (parsedData.interpretation) patchSet.interpretation = parsedData.interpretation;
      if (parsedData.realWorldApplications) patchSet.realWorldApplications = parsedData.realWorldApplications;
      if (parsedData.commonMistakes) patchSet.commonMistakes = parsedData.commonMistakes;
      if (parsedData.faqs) patchSet.faqs = parsedData.faqs.map(f => ({ _type: 'faqItem', _key: `faq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, question: f.question, answer: f.answer }));
      if (parsedData.relatedTools) patchSet.relatedTools = parsedData.relatedTools;
      if (parsedData.seoTitle) patchSet.seoTitle = parsedData.seoTitle;
      if (parsedData.metaDescription) patchSet.metaDescription = parsedData.metaDescription;

      const fieldCount = Object.keys(patchSet).length;

      if (fieldCount === 0) {
        setStatus({ message: 'No matching headers found. Make sure your text uses standard headers like ### Concept Title or ## Simple Explanation.', type: 'error' });
        setIsProcessing(false);
        return;
      }

      // Apply real-time patch to Sanity Studio form
      if (patch && typeof patch.execute === 'function') {
        patch.execute([{ set: patchSet }]);
      }

      // Update current field value with confirmation log
      props.onChange(PatchEvent.from(set(`Imported ${fieldCount} fields on ${new Date().toLocaleTimeString()}`)));

      setStatus({ message: `✨ Success! Auto-filled ${fieldCount} Sanity fields instantly. Scroll down to review!`, type: 'success' });
    } catch (err: any) {
      console.error('Import issue:', err);
      setStatus({ message: `Import error: ${err.message || 'Failed to parse content'}`, type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card padding={4} radius={3} shadow={1} style={{ backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #1e293b' }}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Inline space={2}>
            <Text weight="bold" style={{ color: '#38bdf8', fontSize: '15px' }}>
              ✨ 1-Shot Gemini Content Importer
            </Text>
            <Badge tone="caution" style={{ backgroundColor: '#1e293b', color: '#38bdf8' }}>
              Auto-Fill All 18 Fields
            </Badge>
          </Inline>
          <Text size={1} style={{ color: '#94a3b8' }}>
            Paste raw text or Markdown
          </Text>
        </Flex>

        {/* Gemini API Key Collapsible Input */}
        <Box>
          <Text size={1} weight="medium" style={{ color: '#cbd5e1', marginBottom: '6px' }}>
            Gemini API Key (Optional — Auto-saved in browser)
          </Text>
          <TextInput
            type="password"
            placeholder="AIzaSy... (Leave empty for instant offline section parser)"
            value={apiKey}
            onChange={(e) => handleSaveApiKey(e.currentTarget.value)}
            style={{ backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155' }}
          />
        </Box>

        {/* Content Paste Text Area */}
        <Box>
          <Text size={1} weight="medium" style={{ color: '#cbd5e1', marginBottom: '6px' }}>
            Paste Raw Article / Notes / Markdown Document:
          </Text>
          <TextArea
            rows={7}
            placeholder="Paste your markdown content (e.g. ### Concept Title, ## Simple Explanation, # Formula, # Worked Example)..."
            value={rawContent}
            onChange={(e) => setRawContent(e.currentTarget.value)}
            style={{ backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155', fontFamily: 'monospace', fontSize: '12px' }}
          />
        </Box>

        {/* Action Buttons */}
        <Flex gap={3} style={{ flexWrap: 'wrap' }}>
          <Button
            tone="primary"
            disabled={isProcessing || !rawContent.trim()}
            onClick={() => handleImport(false)}
            text={isProcessing ? 'Parsing Content...' : '⚡ Instant 1-Shot Section Import'}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: 'bold' }}
          />
          {apiKey.trim() && (
            <Button
              tone="positive"
              disabled={isProcessing || !rawContent.trim()}
              onClick={() => handleImport(true)}
              text="✨ Gemini AI Intelligent Import"
              style={{ backgroundColor: '#059669', color: '#ffffff', fontWeight: 'bold' }}
            />
          )}
          {rawContent.trim() && (
            <Button
              tone="critical"
              mode="ghost"
              disabled={isProcessing}
              onClick={() => { setRawContent(''); setStatus(null); }}
              text="Clear Box"
            />
          )}
        </Flex>

        {/* Status Feedback */}
        {status && (
          <Card padding={3} radius={2} style={{
            backgroundColor: status.type === 'success' ? '#064e3b' : status.type === 'error' ? '#7f1d1d' : '#1e293b',
            color: status.type === 'success' ? '#6ee7b7' : status.type === 'error' ? '#fca5a5' : '#93c5fd',
            border: `1px solid ${status.type === 'success' ? '#047857' : status.type === 'error' ? '#991b1b' : '#3b82f6'}`
          }}>
            <Text size={1} weight="bold">
              {status.message}
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

export default GeminiImporterInput;
