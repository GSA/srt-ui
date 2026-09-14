import { AgencyManagementComponent, AgencyRow } from './agency-management.component';

/**
 * Covers the hierarchy flattening in visibleAgencies.
 *
 * This is tested directly on the instance rather than through TestBed, because
 * the getter is pure over `agencies` and needs no template, HTTP, or DI.
 *
 * The first case is a regression test. An earlier implementation grouped
 * components one level under their parent, which silently dropped every
 * third-level component (NAVSEA under Navy under DOD) from the table with no
 * error anywhere.
 */
describe('AgencyManagementComponent hierarchy ordering', () => {

  let component: AgencyManagementComponent;

  const agency = (
    id: number, name: string, parent: AgencyRow | null, active = true, domains: string[] = []
  ): AgencyRow => ({
    id,
    agency: name,
    acronym: null,
    agencyType: parent ? 'federal_component' : 'federal_agency',
    active,
    provenance: 'test',
    parent: parent ? { id: parent.id, agency: parent.agency } : null,
    domains: domains.map((d, i) => ({
      id: id * 100 + i, domain: d, active: true, source: 'test', originalRawValue: d
    })),
    aliases: [],
    activeUsers: 0,
    totalUsers: 0,
    solicitationCount: 0,
    solicitationAccess: [{ id, agency: name }],
    solicitationAccessIsDefault: true,
    deviationSource: null,
    deviationIsInherited: true
  });

  const DOD = agency(1, 'Department of Defense', null);
  const NAVY = agency(2, 'Department of the Navy', DOD);
  const NAVSEA = agency(3, 'Naval Sea Systems Command', NAVY);
  const HHS = agency(4, 'Department of Health and Human Services', null);
  const CMS = agency(5, 'Centers for Medicare and Medicaid Services', HHS, true, ['cms.hhs.gov']);

  const shape = () => component.visibleAgencies.map(r => `${r.agency}@${r.depth}`);

  beforeEach(() => {
    component = new AgencyManagementComponent(null as any);
    component.agencies = [DOD, NAVY, NAVSEA, HHS, CMS];
  });

  it('shows only top-level agencies when everything is collapsed', () => {
    // The default. 653 agencies in one flat list is unreadable, so departments
    // start closed and open on demand.
    expect(shape()).toEqual([
      'Department of Defense@0',
      'Department of Health and Human Services@0'
    ]);
  });

  it('opening a department reveals its own components and no others', () => {
    component.openParents = new Set([1]);
    expect(shape()).toEqual([
      'Department of Defense@0',
      'Department of the Navy@1',
      'Department of Health and Human Services@0'
    ]);
  });

  it('opening a department does not open its children in turn', () => {
    // Navy stays closed, so NAVSEA is not revealed by opening DOD alone.
    component.openParents = new Set([1]);
    expect(shape()).not.toContain('Naval Sea Systems Command@2');
  });

  it('a search overrides collapsing, so a match is never hidden', () => {
    component.openParents = new Set();
    component.search = 'Naval Sea';
    expect(shape()).toEqual([
      'Department of Defense@0',
      'Department of the Navy@1',
      'Naval Sea Systems Command@2'
    ]);
  });

  it('counts only the direct children of an agency', () => {
    expect(component.childCount(1)).toBe(1);   // DOD has Navy
    expect(component.childCount(2)).toBe(1);   // Navy has NAVSEA
    expect(component.childCount(3)).toBe(0);   // NAVSEA has none
  });

  it('renders three levels of nesting in order when fully expanded', () => {
    component.expandAll();
    expect(shape()).toEqual([
      'Department of Defense@0',
      'Department of the Navy@1',
      'Naval Sea Systems Command@2',
      'Department of Health and Human Services@0',
      'Centers for Medicare and Medicaid Services@1'
    ]);
  });

  it('pulls in the whole ancestor chain when a grandchild matches the search', () => {
    component.search = 'Naval Sea';
    expect(shape()).toEqual([
      'Department of Defense@0',
      'Department of the Navy@1',
      'Naval Sea Systems Command@2'
    ]);
  });

  it('matches on a mapped domain as well as on the name', () => {
    component.search = 'cms.hhs.gov';
    expect(shape()).toEqual([
      'Department of Health and Human Services@0',
      'Centers for Medicare and Medicaid Services@1'
    ]);
  });

  it('hides inactive agencies unless asked for them', () => {
    const retired = agency(6, 'Retired Component', DOD, false);
    component.agencies = [DOD, retired];

    expect(shape()).toEqual(['Department of Defense@0']);

    component.showInactive = true;
    expect(shape()).toEqual(['Department of Defense@0', 'Retired Component@1']);
  });

  it('surfaces a component whose parent is missing rather than dropping it', () => {
    const orphan = { ...agency(7, 'Orphaned Component', null), parent: { id: 999, agency: 'Missing' } };
    component.agencies = [DOD, orphan];
    expect(shape()).toEqual(['Department of Defense@0', 'Orphaned Component@0']);
  });

  it('terminates on a cycle and still renders every row', () => {
    // The API refuses to write a cycle, but the table must not depend on that
    // to stay usable.
    const x = { ...agency(10, 'X', null), parent: { id: 11, agency: 'Y' } };
    const y = { ...agency(11, 'Y', null), parent: { id: 10, agency: 'X' } };
    component.agencies = [x, y];
    expect(component.visibleAgencies.length).toBe(2);
  });
});

/**
 * Triage. Exposing the inherited configuration turned this table into several
 * hundred rows, and the screen is only usable if an administrator can get to
 * the handful that need a decision. These cover the shortcuts that do that.
 */
describe('AgencyManagementComponent triage', () => {
  let component: AgencyManagementComponent;

  const row = (over: Partial<AgencyRow>): AgencyRow => ({
    id: 1, agency: 'X', acronym: null, agencyType: 'federal_agency', active: true,
    provenance: 'test', parent: null, domains: [], aliases: [],
    activeUsers: 0, totalUsers: 0, solicitationCount: 0,
    solicitationAccess: [], solicitationAccessIsDefault: true,
    deviationSource: null, deviationIsInherited: true, ...over
  });

  beforeEach(() => { component = new AgencyManagementComponent(null as any); });

  it('counts only live agencies in the tallies, and archived ones separately', () => {
    component.agencies = [
      row({ id: 1, agencyType: 'needs_review' }),
      row({ id: 2, activeUsers: 3, domains: [{ id: 1, domain: 'a.gov', active: true, source: 't', originalRawValue: 'a.gov' }] }),
      row({ id: 3, solicitationCount: 40 }),
      row({ id: 4, active: false, agencyType: 'needs_review' })
    ];
    const t2 = component.tallies;
    expect(t2.total).toBe(3);
    expect(t2.needsReview).toBe(1);
    expect(t2.hasUsers).toBe(1);
    expect(t2.noDomain).toBe(2);
    expect(t2.hasSolicitations).toBe(1);
    expect(t2.hidden).toBe(1);
  });

  it('narrows to the rows a quick filter names', () => {
    component.agencies = [
      row({ id: 1, agency: 'Unclassified', agencyType: 'needs_review' }),
      row({ id: 2, agency: 'Settled' })
    ];
    component.quickFilter = 'needs_review';
    expect(component.visibleAgencies.map(r => r.agency)).toEqual(['Unclassified']);
  });

  it('clicking the same quick filter again turns it off', () => {
    component.setQuickFilter('has_users');
    expect(component.quickFilter).toBe('has_users');
    component.setQuickFilter('has_users');
    expect(component.quickFilter).toBe('all');
  });

  it('suspends collapsing while a quick filter is on, so matches are not hidden', () => {
    expect(component.isSearching).toBeFalsy();
    component.quickFilter = 'no_domain';
    expect(component.isSearching).toBeTruthy();
  });

  it('flags an unclassified row only when something points at it', () => {
    expect(component.attentionReason(row({ agencyType: 'needs_review' }))).toBe('');
    expect(component.attentionReason(row({ agencyType: 'needs_review', solicitationCount: 9 }))).toBe('has solicitations');
    expect(component.attentionReason(row({ agencyType: 'needs_review', activeUsers: 2 }))).toBe('has people');
    expect(component.attentionReason(row({ agencyType: 'needs_review', activeUsers: 2, solicitationCount: 9 })))
      .toBe('people and solicitations');
  });

  it('does not flag a row that has already been classified', () => {
    expect(component.attentionReason(row({ agencyType: 'federal_agency', activeUsers: 5, solicitationCount: 99 }))).toBe('');
  });

  it('finds an agency by a spelling that was folded into it', () => {
    // Folding duplicates retired the name an administrator may still search for.
    component.agencies = [
      row({ id: 1, agency: 'Department of Agriculture', aliases: [{ id: 1, alias: 'U.S. Department of Agriculture' }] }),
      row({ id: 2, agency: 'Department of Commerce' })
    ];
    component.search = 'U.S. Department of Agriculture';
    expect(component.visibleAgencies.map(r => r.agency)).toEqual(['Department of Agriculture']);
  });
});

describe('AgencyManagementComponent access and deviation are shown separately', () => {

  let component: AgencyManagementComponent;

  beforeEach(() => {
    component = new AgencyManagementComponent(null as any);
  });

  it('describes default access so it reads with the column heading', () => {
    const row = {
      solicitationAccess: [{ id: 1, agency: 'Navy' }], solicitationAccessIsDefault: true
    } as AgencyRow;
    // Reads as "Sees solicitations from: Own agency only". The earlier wording
    // produced "Sees solicitations from own solicitations only".
    expect(component.accessSummary(row)).toBe('Own agency only');
  });

  it('lists every agency when access has been widened', () => {
    const row = {
      solicitationAccess: [{ id: 5, agency: 'CMS' }, { id: 4, agency: 'HHS' }],
      solicitationAccessIsDefault: false
    } as AgencyRow;
    expect(component.accessSummary(row)).toBe('CMS, HHS');
  });

  it('marks an inherited deviation as inherited', () => {
    const row = {
      deviationSource: { id: 1, agency: 'Department of Defense' }, deviationIsInherited: true
    } as AgencyRow;
    expect(component.deviationSummary(row)).toBe('Department of Defense (inherited)');
  });

  it('does not mark an explicitly set deviation as inherited', () => {
    const row = {
      deviationSource: { id: 2, agency: 'Department of the Navy' }, deviationIsInherited: false
    } as AgencyRow;
    expect(component.deviationSummary(row)).toBe('Department of the Navy');
  });
});
