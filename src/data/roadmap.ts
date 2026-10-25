// src/data/roadmap.ts
import { repoUrl } from './navigation';

export type Status = 'published' | 'drafting' | 'planned' | 'external';

export interface RoadmapItem {
  label: string;
  href?: string;
  status: Status;
}

export interface RoadmapCategory {
  title: string;
  items: RoadmapItem[];
}

export interface RoadmapSection {
  title: string;
  /** GitHub issue tracking this section's planned items. Its checklist and this
   *  section's `planned` items are kept in sync by hand; edit both together. */
  issue: number;
  categories: RoadmapCategory[];
}

export const issuesUrl = `${repoUrl}/issues`;

export const roadmap: RoadmapSection[] = [
  {
    title: 'Guides',
    issue: 25,
    categories: [
      {
        title: 'Foundations',
        items: [
          { label: 'How to select a bank partner', href: '/guides/how-to-select-a-bank-partner/', status: 'published' },
          { label: 'MTL vs MSB vs National Trust bank charter vs National Charter', status: 'planned' },
          { label: 'How to launch a card product', href: '/guides/how-to-launch-a-card-product/', status: 'published' },
          { label: 'Credit card vs Charge Card vs Debit Card', status: 'planned' },
        ],
      },
      {
        title: 'Operations',
        items: [
          { label: 'Financial crime prevention and compliance partner selection', status: 'planned' },
          { label: 'Financial Crime compliance roles, responsibilities, and alerts', status: 'planned' },
        ],
      },
    ],
  },
  {
    title: 'Models',
    issue: 26,
    categories: [
      {
        title: 'Identity & Fraud',
        items: [
          { label: 'Financial Crime risk assessment', status: 'planned' },
          { label: 'Fraud loss (origination, KYC & identity, transactional, synthetic)', status: 'planned' },
        ],
      },
      {
        title: 'Financial Product',
        items: [
          { label: 'Bank Accounts (debit & savings)', href: '/models/bank-account/', status: 'published' },
          { label: 'Term Loans (installment, mortgage, student)', href: '/models/term-loan/', status: 'published' },
          { label: 'Credit Cards (credit & charge)', href: '/models/credit-card/', status: 'published' },
          { label: 'Interactive calculators: bank account & credit card', status: 'planned' },
        ],
      },
      {
        title: 'Underwriting',
        items: [
          { label: 'Credit Risk (Mortgage, Credit Card, Installment, Auto, Payday)', status: 'planned' },
          { label: 'Payments risk (ACH & wire)', status: 'planned' },
        ],
      },
      {
        title: 'People',
        items: [
          { label: 'Customer Operations staffing', status: 'planned' },
          { label: 'Financial Crime Operations staffing', status: 'planned' },
        ],
      },
    ],
  },
  {
    title: 'Disclosures & Agreements',
    issue: 27,
    categories: [
      {
        title: 'Credit Card',
        items: [
          { label: 'Schumer Box', href: 'https://en.wikipedia.org/wiki/Schumer_box', status: 'external' },
          { label: 'Credit Cardholder Agreement — CFPB template', href: 'https://www.consumerfinance.gov/data-research/credit-card-data/know-you-owe-credit-cards/', status: 'external' },
          { label: 'Statement Disclosure', status: 'planned' },
        ],
      },
      {
        title: 'Bank Account',
        items: [
          { label: 'Deposit Account Agreement (checking, savings, automatic savings)', status: 'planned' },
        ],
      },
      {
        title: 'General',
        items: [
          { label: 'E-SIGN consent (electronic communications)', status: 'planned' },
          { label: 'GLBA Privacy Notice', status: 'planned' },
        ],
      },
    ],
  },
  {
    title: 'Policies',
    issue: 28,
    categories: [
      {
        title: 'Compliance & Risk',
        items: [
          { label: 'Bank Secrecy Act / AML / OFAC Policy', href: '/docs/bsa/', status: 'published' },
          { label: 'Fraud prevention policy', status: 'planned' },
          { label: 'Collections Policy', status: 'planned' },
          { label: 'Credit Bureau Reporting', status: 'planned' },
          { label: 'Third Party Vendor Management', status: 'planned' },
          { label: 'Information Security Program and Policies', href: 'https://docs.google.com/document/d/19b9vL85524hHLElJ3O5xnEOrgvgRKbgQxjiM89196Fo/edit?usp=sharing', status: 'external' },
          { label: 'Business Continuity / Disaster Recovery', href: 'https://docs.google.com/document/d/1-dRk6RjxaT1jUWssw_6kgek8YPIjU0egLmPew_Q3cZQ/edit?usp=sharing', status: 'external' },
        ],
      },
    ],
  },
  {
    title: 'Procedures',
    issue: 29,
    categories: [
      {
        title: 'Operations',
        items: [
          { label: 'Complaints & disputes (Reg E / Reg Z)', status: 'planned' },
          { label: 'SAR Filing Process', status: 'planned' },
          { label: 'OFAC Procedure', status: 'planned' },
        ],
      },
    ],
  },
];
