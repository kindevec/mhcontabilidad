import {
  ApplicationFilter,
  ApplicationItem,
  ApplicationStatus,
  CompanyItem,
  SortOrder,
} from '../types/jobie';

export function filterAndSortApplications(
  applications: ApplicationItem[],
  statusFilter: ApplicationFilter,
  searchQuery: string,
  sortOrder: SortOrder
): ApplicationItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = applications.filter((item) => {
    const matchesStatus =
      statusFilter === 'All' ? true : item.status === statusFilter;

    if (!matchesStatus) return false;
    if (!normalizedQuery) return true;

    return (
      item.code.toLowerCase().includes(normalizedQuery) ||
      item.companyName.toLowerCase().includes(normalizedQuery) ||
      item.companyDepartment.toLowerCase().includes(normalizedQuery) ||
      item.position.toLowerCase().includes(normalizedQuery) ||
      item.type.toLowerCase().includes(normalizedQuery) ||
      item.applicantName.toLowerCase().includes(normalizedQuery)
    );
  });

  return [...filtered].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return b.timestamp - a.timestamp;
    }
    if (sortOrder === 'Oldest') {
      return a.timestamp - b.timestamp;
    }
    return a.companyName.localeCompare(b.companyName);
  });
}

export function getApplicationCounts(applications: ApplicationItem[]): Record<ApplicationFilter, number> {
  const counts: Record<ApplicationFilter, number> = {
    All: applications.length,
    Pending: 0,
    'On-Hold': 0,
    Candidate: 0,
  };

  for (const app of applications) {
    counts[app.status] += 1;
  }

  return counts;
}

export function updateApplicationStatus(
  applications: ApplicationItem[],
  id: string,
  nextStatus: ApplicationStatus
): ApplicationItem[] {
  return applications.map((app) =>
    app.id === id ? { ...app, status: nextStatus } : app
  );
}

export function filterAndSortCompanies(
  companies: CompanyItem[],
  options: {
    keyword: string;
    locationFilter: string;
    suggestionSkill: string | null;
    sortOrder: SortOrder;
  }
): CompanyItem[] {
  const normalizedKeyword = options.keyword.trim().toLowerCase();
  const normalizedLocation = options.locationFilter.trim().toLowerCase();

  const filtered = companies.filter((comp) => {
    if (options.suggestionSkill && !comp.skills.includes(options.suggestionSkill)) {
      return false;
    }

    if (
      normalizedLocation &&
      normalizedLocation !== 'around you' &&
      !comp.location.toLowerCase().includes(normalizedLocation)
    ) {
      return false;
    }

    if (!normalizedKeyword) return true;

    return (
      comp.name.toLowerCase().includes(normalizedKeyword) ||
      comp.category.toLowerCase().includes(normalizedKeyword) ||
      comp.featuredPosition.toLowerCase().includes(normalizedKeyword) ||
      comp.location.toLowerCase().includes(normalizedKeyword) ||
      comp.skills.some((s) => s.toLowerCase().includes(normalizedKeyword))
    );
  });

  return [...filtered].sort((a, b) => {
    if (options.sortOrder === 'Newest') {
      return b.timestamp - a.timestamp;
    }
    if (options.sortOrder === 'Oldest') {
      return a.timestamp - b.timestamp;
    }
    return a.name.localeCompare(b.name);
  });
}
