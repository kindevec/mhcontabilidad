import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortApplications,
  filterAndSortCompanies,
  getApplicationCounts,
  updateApplicationStatus,
} from './jobieLogic';
import { INITIAL_APPLICATIONS, INITIAL_COMPANIES } from '../data/mockData';

test('getApplicationCounts tallies All, Pending, On-Hold, and Candidate accurately', () => {
  const counts = getApplicationCounts(INITIAL_APPLICATIONS);
  assert.equal(counts.All, INITIAL_APPLICATIONS.length);
  assert.equal(
    counts.Pending + counts['On-Hold'] + counts.Candidate,
    INITIAL_APPLICATIONS.length
  );
  assert.equal(counts.Pending, 3);
  assert.equal(counts['On-Hold'], 2);
  assert.equal(counts.Candidate, 3);
});

test('filterAndSortApplications filters by status and search query', () => {
  const pendingOnly = filterAndSortApplications(
    INITIAL_APPLICATIONS,
    'Pending',
    '',
    'Newest'
  );
  assert.equal(pendingOnly.length, 3);
  assert.ok(pendingOnly.every((item) => item.status === 'Pending'));

  const searchHighspeed = filterAndSortApplications(
    INITIAL_APPLICATIONS,
    'All',
    'Highspeed',
    'Newest'
  );
  assert.equal(searchHighspeed.length, 2);
  assert.ok(
    searchHighspeed.every((item) => item.companyName === 'Highspeed Studios')
  );
});

test('updateApplicationStatus transitions status immutably', () => {
  const updated = updateApplicationStatus(
    INITIAL_APPLICATIONS,
    'app-1',
    'Candidate'
  );
  const target = updated.find((a) => a.id === 'app-1');
  assert.equal(target?.status, 'Candidate');
  assert.equal(INITIAL_APPLICATIONS[0].status, 'Pending');
});

test('filterAndSortCompanies filters by suggestion skill, location, and keyword', () => {
  const photoCompanies = filterAndSortCompanies(INITIAL_COMPANIES, {
    keyword: '',
    locationFilter: 'Around You',
    suggestionSkill: 'Photographer',
    sortOrder: 'Newest',
  });
  assert.equal(photoCompanies.length, 3);

  const keywordFiltered = filterAndSortCompanies(INITIAL_COMPANIES, {
    keyword: 'Simonis',
    locationFilter: 'Around You',
    suggestionSkill: null,
    sortOrder: 'Newest',
  });
  assert.equal(keywordFiltered.length, 1);
  assert.equal(keywordFiltered[0].name, 'Simonis Ltd');
});
