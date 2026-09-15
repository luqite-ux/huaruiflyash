import type { LocalizedText } from "@/lib/i18n"

export interface FaqItem {
  slug: string
  question: LocalizedText
  answer: LocalizedText
}

export const faqItems: FaqItem[] = [
  {
    slug: "what-does-huarui-supply",
    question: { en: "What does Nantong Huarui Building Materials Co., Ltd. supply?" },
    answer: {
      en: "Huarui supplies Fly Ash in Grade I, Grade II and Grade III, produced through the processing and resource utilization of power-plant fly ash and slag.",
    },
  },
  {
    slug: "where-is-huarui-located",
    question: { en: "Where is Huarui located?" },
    answer: {
      en: "Huarui is based at Jinqiao Village, Pingdong Town Industrial Concentration Area, Tongzhou District, Nantong, Jiangsu, China.",
    },
  },
  {
    slug: "how-to-request-a-quote",
    question: { en: "How do I request a quotation?" },
    answer: {
      en: "Submit a Request a Quote form with your target product, purchasing requirements and contact details, or reach us directly by phone/WhatsApp or email using the details on the Contact page.",
    },
  },
  {
    slug: "what-to-include-in-an-inquiry",
    question: { en: "What information should I include in an inquiry?" },
    answer: {
      en: "Please include the fly ash grade you are interested in, your intended application, target quantity, destination and any other purchasing requirements so our team can respond accurately.",
    },
  },
  {
    slug: "product-documentation",
    question: { en: "Can Huarui provide product documentation for a specific order?" },
    answer: {
      en: "Order-specific documentation is discussed directly with our team after an inquiry is submitted. Please use the Request a Quote form or contact us to discuss what is available for your order.",
    },
  },
  {
    slug: "what-is-fly-ash",
    question: { en: "What is fly ash and how does Huarui produce it?" },
    answer: {
      en: "Fly ash is a byproduct of coal-fired power generation. Huarui processes power-plant fly ash and slag for resource reuse, supplying it back into the construction materials industry.",
    },
  },
]
