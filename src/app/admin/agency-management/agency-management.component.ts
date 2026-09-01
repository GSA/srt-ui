import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';

/**
 * Agency Management.
 *
 * Manages the agency hierarchy, email domain mappings, solicitation access, and
 * deviation inheritance. All of this previously lived in two hardcoded maps in
 * the API's config.js and needed a developer and a deploy to change.
 *
 * The screen is built around one distinction that is easy to get wrong: which
 * solicitations an agency's users can SEE is a different relationship from
 * whose deviation APPLIES to them. A component can inherit its parent's
 * deviation without seeing the parent's solicitations. The two are shown in
 * adjacent columns and saved through separate endpoints so the difference stays
 * visible and neither edit can quietly move the other.
 */

export interface AgencyRow {
  id: number;
  agency: string;
  acronym: string | null;
  agencyType: string;
  active: boolean;
  provenance: string | null;
  parent: { id: number; agency: string } | null;
  domains: Array<{ id: number; domain: string; active: boolean; source: string; originalRawValue: string }>;
  aliases: Array<{ id: number; alias: string }>;
  activeUsers: number;
  totalUsers: number;
  solicitationAccess: Array<{ id: number; agency: string | null }>;
  solicitationAccessIsDefault: boolean;
  deviationSource: { id: number; agency: string } | null;
  deviationIsInherited: boolean;
}

interface PendingDomain {
  domain: string;
  user_count: number;
  first_seen: string;
  last_seen: string;
  emails: string[];
}

@Component({
  selector: 'app-agency-management',
  templateUrl: './agency-management.component.html',
  styleUrls: ['./agency-management.component.scss'],
  standalone: false
})
export class AgencyManagementComponent implements OnInit {

  agencies: AgencyRow[] = [];
  agencyTypes: string[] = [];
  pending: PendingDomain[] = [];

  loading = false;
  loadingPending = false;
  error = '';
  notice = '';

  view: 'hierarchy' | 'review' = 'hierarchy';
  search = '';
  showInactive = false;

  /**
   * Per-column filters, matching the pattern the Users tab already uses so the
   * two admin tables behave the same way.
   *
   * Any active column filter implies a search, in the sense that collapsing is
   * suspended: a filter whose matches were hidden inside closed departments
   * would look like it had returned nothing.
   */
  colFilters = { agency: '', type: '', domain: '', access: '', deviation: '' };

  /**
   * Which parents are open. Empty means everything is collapsed, which is the
   * default: 653 agencies flattened into one list is unreadable, and the
   * hierarchy only helps if you can see the departments first and open the one
   * you want.
   *
   * A search bypasses this entirely, since hiding a row the user just searched
   * for behind a collapsed parent would be worse than no hierarchy at all.
   */
  openParents = new Set<number>();

  expandedId: number | null = null;
  /** Which editor is open on the expanded row. Only one at a time. */
  editorMode: 'details' | 'access' | 'deviation' | 'domains' | null = null;
  saving = false;

  // Create agency form
  showCreate = false;
  newAgency = { agency: '', acronym: '', agencyType: 'federal_component', parentId: null as number | null };

  // Working copies for the open editors
  editDetails = { agency: '', acronym: '', agencyType: '', parentId: null as number | null };
  editAccessIds: number[] = [];
  editDeviationId: number | null = null;
  newDomain = '';

  // Needs Review resolution
  resolvingDomain: string | null = null;
  resolveMode: 'existing' | 'component' = 'existing';
  resolveAgencyId: number | null = null;
  resolveComponent = { agency: '', acronym: '', parentId: null as number | null };

  constructor(private adminService: AdminManagementService) {}

  ngOnInit(): void {
    this.load();
    this.loadPending();
  }

  // ── Loading ────────────────────────────────────────────────────────

  load(): void {
    this.loading = true;
    this.error = '';
    this.adminService.getAgencyManagement().subscribe({
      next: (data) => {
        this.agencies = data.agencies || [];
        this.agencyTypes = data.agencyTypes || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = this.messageFrom(err, 'Could not load agency data.');
        this.loading = false;
      }
    });
  }

  loadPending(): void {
    this.loadingPending = true;
    this.adminService.getNeedsReview().subscribe({
      next: (data) => {
        this.pending = data.pending || [];
        this.loadingPending = false;
      },
      error: () => { this.loadingPending = false; }
    });
  }

  // ── Display helpers ────────────────────────────────────────────────

  /** How many agencies sit directly under this one, for the row's count. */
  childCount(id: number): number {
    return this.agencies.filter(a => a.parent && a.parent.id === id
      && (this.showInactive || a.active)).length;
  }

  isOpen(id: number): boolean {
    return this.openParents.has(id);
  }

  toggleOpen(a: AgencyRow, event?: Event): void {
    if (event) { event.stopPropagation(); }
    if (this.openParents.has(a.id)) { this.openParents.delete(a.id); }
    else { this.openParents.add(a.id); }
  }

  expandAll(): void {
    for (const a of this.agencies) {
      if (this.childCount(a.id) > 0) { this.openParents.add(a.id); }
    }
  }

  collapseAll(): void {
    this.openParents.clear();
  }

  /** True while a search is filtering, when collapsing would hide matches. */
  get isSearching(): boolean {
    return this.search.trim().length > 0 || this.hasColumnFilter;
  }

  get hasColumnFilter(): boolean {
    return Object.values(this.colFilters).some(v => String(v).trim().length > 0);
  }

  clearFilters(): void {
    this.search = '';
    this.colFilters = { agency: '', type: '', domain: '', access: '', deviation: '' };
  }

  /**
   * Flatten the hierarchy depth first so every agency sits directly beneath its
   * parent, at any nesting depth. A depth-first walk rather than a one-level
   * group, because components nest more than one level (NAVSEA under Navy under
   * DOD) and a single grouping pass silently drops the deepest rows.
   *
   * Anything whose parent is missing from the data is appended at the end rather
   * than dropped, so a broken reference is visible instead of invisible.
   */
  get visibleAgencies(): Array<AgencyRow & { depth: number }> {
    const term = this.search.trim().toLowerCase();

    const f = this.colFilters;
    const has = (haystack: string, needle: string) =>
      !needle || String(haystack || '').toLowerCase().includes(needle.trim().toLowerCase());

    const matches = (a: AgencyRow) => {
      if (!this.showInactive && !a.active) { return false; }

      // Column filters are ANDed together, so each one narrows the last.
      if (!has(a.agency + ' ' + (a.acronym || ''), f.agency)) { return false; }
      if (f.type && a.agencyType !== f.type) { return false; }
      if (f.domain && !a.domains.some(d => d.domain.toLowerCase().includes(f.domain.trim().toLowerCase()))) { return false; }
      if (!has(this.accessSummary(a), f.access)) { return false; }
      if (!has(this.deviationSummary(a), f.deviation)) { return false; }

      if (!term) { return true; }
      return a.agency.toLowerCase().includes(term)
        || (a.acronym || '').toLowerCase().includes(term)
        || (a.parent ? a.parent.agency.toLowerCase().includes(term) : false)
        || a.domains.some(d => d.domain.includes(term));
    };

    const byId = new Map(this.agencies.map(a => [a.id, a]));
    const kept = new Map<number, AgencyRow>();
    for (const a of this.agencies) {
      if (matches(a)) { kept.set(a.id, a); }
    }

    // A matching component still needs its ancestors present, or it has nothing
    // to sit under. Walk all the way up, not just one level.
    for (const a of [...kept.values()]) {
      let cursor = a.parent ? byId.get(a.parent.id) : undefined;
      let depth = 0;
      while (cursor && !kept.has(cursor.id) && depth < 50) {
        kept.set(cursor.id, cursor);
        cursor = cursor.parent ? byId.get(cursor.parent.id) : undefined;
        depth++;
      }
    }

    const childrenOf = new Map<number, AgencyRow[]>();
    const roots: AgencyRow[] = [];
    for (const a of kept.values()) {
      const parentPresent = a.parent && kept.has(a.parent.id);
      if (!parentPresent) {
        roots.push(a);
      } else {
        const key = a.parent!.id;
        if (!childrenOf.has(key)) { childrenOf.set(key, []); }
        childrenOf.get(key)!.push(a);
      }
    }

    const byName = (x: AgencyRow, y: AgencyRow) => x.agency.localeCompare(y.agency);
    const ordered: Array<AgencyRow & { depth: number }> = [];
    const seen = new Set<number>();

    const walk = (node: AgencyRow, depth: number) => {
      // Guards against a cycle in the data hanging the render. The API refuses
      // to write one, but the table must not depend on that to stay usable.
      if (seen.has(node.id) || depth > 20) { return; }
      seen.add(node.id);
      ordered.push({ ...node, depth });

      // A collapsed parent hides its children, unless a search is running, in
      // which case every match must stay visible.
      if (!this.isSearching && !this.openParents.has(node.id)) { return; }

      const kids = (childrenOf.get(node.id) || []).sort(byName);
      for (const kid of kids) { walk(kid, depth + 1); }
    };

    for (const root of roots.sort(byName)) { walk(root, 0); }

    // Anything a cycle kept us from reaching. Show it rather than lose it.
    for (const a of [...kept.values()].sort(byName)) {
      if (!seen.has(a.id)) { ordered.push({ ...a, depth: 0 }); }
    }

    return ordered;
  }

  get topLevelAgencies(): AgencyRow[] {
    return this.agencies.filter(a => !a.parent && a.active).sort((x, y) => x.agency.localeCompare(y.agency));
  }

  get sortedAgencies(): AgencyRow[] {
    return [...this.agencies].sort((x, y) => x.agency.localeCompare(y.agency));
  }

  typeLabel(t: string): string {
    return (t || '').replace(/_/g, ' ');
  }

  /** Access is the interesting case when it is more than the agency itself. */
  accessSummary(a: AgencyRow): string {
    // Reads with the column heading: "Sees solicitations from: Own agency only".
    // The previous wording produced "Sees solicitations from own solicitations
    // only", which parses as nonsense.
    if (a.solicitationAccessIsDefault || a.solicitationAccess.length <= 1) { return 'Own agency only'; }
    return a.solicitationAccess.map(x => x.agency).filter(Boolean).join(', ');
  }

  /**
   * Alternate spellings this agency answers to. Solicitations arrive from
   * SAM.gov with the agency written however the posting office wrote it, and a
   * merged duplicate survives as an alias, so this is how an admin sees why an
   * agency's work shows up under more than one name.
   */
  aliasSummary(a: AgencyRow): string {
    const list = a.aliases || [];
    if (!list.length) { return ''; }
    if (list.length <= 2) { return list.map(x => x.alias).join(', '); }
    return `${list[0].alias} and ${list.length - 1} more`;
  }

  deviationSummary(a: AgencyRow): string {
    if (!a.deviationSource) { return 'None set'; }
    // Reads as "Department of Defense (inherited)" so it is clear at a glance
    // whether the value was chosen here or came from the parent.
    return a.deviationIsInherited
      ? `${a.deviationSource.agency} (inherited)`
      : a.deviationSource.agency;
  }

  totalPendingUsers(): number {
    return this.pending.reduce((sum, p) => sum + (p.user_count || 0), 0);
  }

  // ── Row expansion ──────────────────────────────────────────────────

  toggleRow(a: AgencyRow, mode: 'details' | 'access' | 'deviation' | 'domains'): void {
    if (this.expandedId === a.id && this.editorMode === mode) {
      this.closeEditor();
      return;
    }
    this.expandedId = a.id;
    this.editorMode = mode;
    this.notice = '';
    this.error = '';

    if (mode === 'details') {
      this.editDetails = {
        agency: a.agency,
        acronym: a.acronym || '',
        agencyType: a.agencyType,
        parentId: a.parent ? a.parent.id : null
      };
    } else if (mode === 'access') {
      this.editAccessIds = a.solicitationAccess.map(x => x.id);
    } else if (mode === 'deviation') {
      this.editDeviationId = a.deviationIsInherited ? null : (a.deviationSource ? a.deviationSource.id : null);
    } else if (mode === 'domains') {
      this.newDomain = '';
    }
  }

  closeEditor(): void {
    this.expandedId = null;
    this.editorMode = null;
  }

  isAccessSelected(id: number): boolean {
    return this.editAccessIds.includes(id);
  }

  toggleAccess(id: number, agencyId: number): void {
    // An agency always keeps sight of its own solicitations. The API enforces
    // this too; disabling the control here explains why rather than letting the
    // user try and be silently overridden.
    if (id === agencyId) { return; }
    this.editAccessIds = this.isAccessSelected(id)
      ? this.editAccessIds.filter(x => x !== id)
      : [...this.editAccessIds, id];
  }

  // ── Saving ─────────────────────────────────────────────────────────

  saveDetails(a: AgencyRow): void {
    this.saving = true;
    this.adminService.updateAgency(a.id, {
      agency: this.editDetails.agency,
      acronym: this.editDetails.acronym,
      agencyType: this.editDetails.agencyType,
      parentId: this.editDetails.parentId
    }).subscribe({
      next: () => this.afterSave(`Updated ${this.editDetails.agency}.`),
      error: (err) => this.afterError(err, 'Could not update the agency.')
    });
  }

  toggleActive(a: AgencyRow): void {
    const next = !a.active;
    const verb = next ? 'Reactivate' : 'Deactivate';
    const warning = !next && a.totalUsers > 0
      ? `\n\n${a.totalUsers} user${a.totalUsers === 1 ? ' is' : 's are'} attached to this agency. They keep their access; the agency stops appearing in pickers.`
      : '';
    if (!confirm(`${verb} ${a.agency}?${warning}`)) { return; }

    this.saving = true;
    this.adminService.updateAgency(a.id, { active: next }).subscribe({
      next: () => this.afterSave(`${a.agency} ${next ? 'reactivated' : 'deactivated'}.`),
      error: (err) => this.afterError(err, 'Could not change the agency status.')
    });
  }

  saveAccess(a: AgencyRow): void {
    this.saving = true;
    this.adminService.setSolicitationScope(a.id, this.editAccessIds).subscribe({
      next: () => this.afterSave(`Updated solicitation access for ${a.agency}.`),
      error: (err) => this.afterError(err, 'Could not update solicitation access.')
    });
  }

  saveDeviation(a: AgencyRow): void {
    this.saving = true;
    this.adminService.setDeviationSource(a.id, this.editDeviationId).subscribe({
      next: (res) => this.afterSave(
        res.inherited
          ? `${a.agency} now inherits its deviation from its parent.`
          : `Deviation for ${a.agency} set to ${res.resolvedDeviationSource?.agency}.`
      ),
      error: (err) => this.afterError(err, 'Could not update the deviation source.')
    });
  }

  addDomain(a: AgencyRow): void {
    const domain = this.newDomain.trim();
    if (!domain) { return; }
    this.saving = true;
    this.adminService.createAgencyDomain(domain, a.id).subscribe({
      next: () => { this.newDomain = ''; this.afterSave(`Mapped ${domain} to ${a.agency}.`); },
      error: (err) => this.afterError(err, 'Could not map that domain.')
    });
  }

  removeDomain(d: { id: number; domain: string }): void {
    if (!confirm(`Remove the mapping for ${d.domain}?\n\nUsers who already signed in keep their agency. New sign-ups on this domain will go to Needs Review.`)) { return; }
    this.saving = true;
    this.adminService.deleteAgencyDomain(d.id).subscribe({
      next: () => this.afterSave(`Removed ${d.domain}.`),
      error: (err) => this.afterError(err, 'Could not remove that domain.')
    });
  }

  createAgency(): void {
    if (!this.newAgency.agency.trim()) { return; }
    this.saving = true;
    this.adminService.createAgency({
      agency: this.newAgency.agency.trim(),
      acronym: this.newAgency.acronym.trim(),
      agencyType: this.newAgency.agencyType,
      parentId: this.newAgency.parentId
    }).subscribe({
      next: () => {
        const name = this.newAgency.agency;
        this.newAgency = { agency: '', acronym: '', agencyType: 'federal_component', parentId: null };
        this.showCreate = false;
        this.afterSave(`Created ${name}.`);
      },
      error: (err) => this.afterError(err, 'Could not create the agency.')
    });
  }

  /** A component needs a parent; only real top-level types may stand alone. */
  get createNeedsParent(): boolean {
    return !['federal_agency', 'state_local', 'education', 'other'].includes(this.newAgency.agencyType);
  }

  get createDisabled(): boolean {
    return this.saving
      || !this.newAgency.agency.trim()
      || (this.createNeedsParent && !this.newAgency.parentId);
  }

  // ── Needs Review ───────────────────────────────────────────────────

  startResolve(p: PendingDomain): void {
    this.resolvingDomain = this.resolvingDomain === p.domain ? null : p.domain;
    this.resolveMode = 'existing';
    this.resolveAgencyId = null;
    this.resolveComponent = { agency: '', acronym: '', parentId: null };
    this.notice = '';
    this.error = '';
  }

  get resolveDisabled(): boolean {
    if (this.saving) { return true; }
    return this.resolveMode === 'existing'
      ? !this.resolveAgencyId
      : !this.resolveComponent.agency.trim() || !this.resolveComponent.parentId;
  }

  confirmResolve(p: PendingDomain): void {
    this.saving = true;
    const payload: any = { domain: p.domain };
    if (this.resolveMode === 'existing') {
      payload.agencyId = this.resolveAgencyId;
    } else {
      payload.newComponent = {
        agency: this.resolveComponent.agency.trim(),
        acronym: this.resolveComponent.acronym.trim(),
        agencyType: 'federal_component',
        parentId: this.resolveComponent.parentId
      };
    }

    this.adminService.resolveNeedsReview(payload).subscribe({
      next: (res) => {
        this.resolvingDomain = null;
        this.saving = false;
        this.notice = `${p.domain} mapped to ${res.agency.agency}. ${res.usersUpdated} user${res.usersUpdated === 1 ? '' : 's'} moved.`;
        this.load();
        this.loadPending();
      },
      error: (err) => this.afterError(err, 'Could not resolve that domain.')
    });
  }

  // ── Shared outcome handling ────────────────────────────────────────

  private afterSave(message: string): void {
    this.saving = false;
    this.notice = message;
    this.closeEditor();
    this.load();
  }

  private afterError(err: any, fallback: string): void {
    this.saving = false;
    this.error = this.messageFrom(err, fallback);
  }

  /** Surface the API's validation text, which explains cycles and guardrails. */
  private messageFrom(err: any, fallback: string): string {
    return err?.error?.error || err?.error?.message || fallback;
  }
}
