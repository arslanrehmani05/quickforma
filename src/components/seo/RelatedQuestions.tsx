import React from 'react';
import { HelpCircle, MessageSquareText } from 'lucide-react';
import { RelatedQuestionItem } from '../../types/seo';

interface RelatedQuestionsProps {
  questions?: RelatedQuestionItem[];
}

export const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({ questions }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Expert Answers to Related Questions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-slate-900 font-bold text-base flex items-start gap-2">
              <MessageSquareText className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
              <span>{item.question}</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
