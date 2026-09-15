/**
 * Recommended Section 508 clause.
 *
 * Shown only when Section 508 APPLIES to a solicitation but no 508 language was
 * found at all. When any 508 language already exists we deliberately stay quiet
 * — we don't second-guess clauses that are already in the document (that's the
 * agency-by-agency work).
 *
 * This is deliberately data, not markup: agency-specific expansion replaces the
 * clause for a given agency (or a deviation) by adding entries to CLAUSES_BY_ID
 * and resolving on the solicitation's agency — no template changes required.
 */

export interface Section508Clause {
  /** 'default', or an agency key once agency-specific clauses land. */
  id: string;
  /** Clause title as it should appear in the solicitation. */
  title: string;
  /** The clause body — this is what reviewers copy and paste. */
  paragraphs: string[];
  /** Guidance on where/how to insert it. Not part of the copied text. */
  instructions: string[];
}

export const DEFAULT_508_CLAUSE: Section508Clause = {
  id: 'default',
  title: 'Section 508 Accessibility Requirements for Information and Communication Technology (ICT)',
  paragraphs: [
    'The contractor shall test and validate Information and Communication Technology (ICT) for conformance to Section 508 of the Rehabilitation Act of 1973, as amended (29 U.S.C. 794d) in accordance with the required testing methods. The contractor must provide test results in the form of an Accessibility Conformance Report (ACR) that includes the information requested in the government supplement defined and available at https://www.section508.gov/sell/acr-supplement/. For ICT developed, modified, or configured under this solicitation, the contractor must provide an Accessibility Conformance Report (ACR) plus government supplement before acceptance.',
    'Before final acceptance of any ICT item, including updates and replacements, if the contracting officer determines that any furnished ICT item is not in compliance with the applicable Revised 508 Standards requirements, the contracting officer will promptly inform the submitting organization in writing of the noncompliance. The offeror must repair or replace the non-compliant products or services within the period specified by the contracting officer at no cost to the government.',
    'ICT must remain accessible throughout the contract period of performance, even as products and software are updated or modified.'
  ],
  instructions: [
    'Insert the clause entitled "Section 508 Accessibility Requirements for Information and Communication Technology (ICT)" in all solicitations and contracts, including orders, when the acquisition includes Information and Communication Technology (ICT), as defined in FAR 2.101, or services that develop, configure, integrate, maintain, host, support, or otherwise affect ICT.',
    'The Government shall identify and include the applicable Section 508 accessibility requirements for the acquisition in the solicitation and resulting contract. Such requirements shall be provided in the statement of work (SOW), performance work statement (PWS), statement of objectives (SOO), requirements document, attachment, appendix, or other solicitation provision designated by the contracting activity.',
    'Section 508 of the Rehabilitation Act of 1973 (29 U.S.C. 794d) requires that when Federal agencies develop, procure, maintain, or use information and communications technology, individuals with disabilities, who are members of the public seeking information or services from a Federal agency, have access to and use of information and data that is comparable to that provided to the public who are not individuals with disabilities, unless an undue burden would be imposed on the agency.',
    'Specific Section 508 accessibility requirements applicable to this acquisition are provided by the Government in [insert applicable attachment, appendix, SOW/PWS/SOO section, requirements document, or other designated solicitation section].'
  ]
};

/** Registry — agency-specific clauses get added here as that work lands. */
export const CLAUSES_BY_ID: { [id: string]: Section508Clause } = {
  default: DEFAULT_508_CLAUSE
};

/**
 * Resolve the clause to recommend. Today everything resolves to the default;
 * once agency-specific clauses and deviations exist, this is the single place
 * that decides which one a reviewer sees.
 */
export function resolveClause(agency?: string): Section508Clause {
  const key = (agency || '').trim().toLowerCase();
  return CLAUSES_BY_ID[key] || DEFAULT_508_CLAUSE;
}

/** Plain-text form for the clipboard — pastes cleanly into Word/SAM.gov. */
export function clauseToPlainText(clause: Section508Clause): string {
  return [clause.title, '', ...clause.paragraphs.join('\n\n').split('\n')].join('\n');
}
