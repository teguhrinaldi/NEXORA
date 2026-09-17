export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need any technical experience to use NEXORA?",
    answer:
      "No. NEXORA is built for anyone doing knowledge work — writing, organizing documents, or automating repetitive tasks — without requiring any code.",
  },
  {
    id: "faq-2",
    question: "What happens if I reach my monthly credit limit?",
    answer:
      "You'll receive an in-app notification before you reach your limit. You can upgrade your plan at any time to continue without interruption.",
  },
  {
    id: "faq-3",
    question: "Can I change plans later?",
    answer: "Yes. You can upgrade, downgrade, or cancel your plan at any time from the Billing page.",
  },
  {
    id: "faq-4",
    question: "Is my data private?",
    answer: "Your documents, prompts, and conversations belong to your workspace and are never used to train shared models.",
  },
  {
    id: "faq-5",
    question: "Does NEXORA support team collaboration?",
    answer: "Yes. The Team plan includes shared documents, prompt libraries, and role-based permissions for your whole team.",
  },
  {
    id: "faq-6",
    question: "Can I cancel anytime?",
    answer: "Yes, there are no long-term contracts. You can cancel your subscription at any time from your billing settings.",
  },
];
