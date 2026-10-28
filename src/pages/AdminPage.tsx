/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ApplicationFilter,
  ApplicationItem,
  ApplicationStatus,
  MessageItem,
  NavSection,
  SortOrder,
} from '../admin/types/jobie';
import {
  INITIAL_APPLICATIONS,
  INITIAL_COMPANIES,
  INITIAL_MESSAGES,
  INITIAL_NEWS,
} from '../admin/data/mockData';
import {
  filterAndSortApplications,
  filterAndSortCompanies,
  updateApplicationStatus,
} from '../admin/utils/jobieLogic';
import { Sidebar } from '../admin/components/Sidebar';
import { Header } from '../admin/components/Header';
import { ApplicationsView } from '../admin/components/ApplicationsView';
import { CompaniesView } from '../admin/components/CompaniesView';
import {
  DashboardOverview,
  MessagesView,
  NewsView,
  StatisticsView,
} from '../admin/components/SecondaryViews';

export function AdminPage() {
  // Default to 'dashboard' or 'applications'
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global header search query
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Applications (Trámites & Asesorías) state
  const [applications, setApplications] =
    useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState<ApplicationFilter>('All');
  const [appSortOrder, setAppSortOrder] = useState<SortOrder>('Newest');

  // Companies (Clientes & Empresas) state
  const [companyKeyword, setCompanyKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('Around You');
  const [suggestionSkill, setSuggestionSkill] = useState<string | null>(
    'Declaraciones IVA'
  );
  const [companySortOrder, setCompanySortOrder] =
    useState<SortOrder>('Newest');

  // Messages & Notifications state
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(2);
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Set document title
  useEffect(() => {
    document.title = 'Panel Administrativo | MH Contabilidad';
  }, []);

  // Filtered & sorted applications
  const filteredApplications = useMemo(
    () =>
      filterAndSortApplications(
        applications,
        statusFilter,
        globalSearchQuery,
        appSortOrder
      ),
    [applications, statusFilter, globalSearchQuery, appSortOrder]
  );

  // Filtered & sorted companies
  const effectiveCompanyKeyword = companyKeyword || globalSearchQuery;
  const filteredCompanies = useMemo(
    () =>
      filterAndSortCompanies(INITIAL_COMPANIES, {
        keyword: effectiveCompanyKeyword,
        locationFilter,
        suggestionSkill,
        sortOrder: companySortOrder,
      }),
    [
      effectiveCompanyKeyword,
      locationFilter,
      suggestionSkill,
      companySortOrder,
    ]
  );

  const handleUpdateApplicationStatus = (
    id: string,
    nextStatus: ApplicationStatus
  ) => {
    setApplications((prev) => updateApplicationStatus(prev, id, nextStatus));
  };

  const handleAddApplication = (
    newApp: Omit<ApplicationItem, 'id' | 'timestamp'>
  ) => {
    const created: ApplicationItem = {
      ...newApp,
      id: `app-${Date.now()}`,
      timestamp: Date.now(),
    };
    setApplications((prev) => [created, ...prev]);
  };

  const handleViewApplicationsForCompany = (companyName: string) => {
    setGlobalSearchQuery(companyName);
    setStatusFilter('All');
    setActiveSection('applications');
  };

  const handleSendMessage = (threadId: string, text: string) => {
    setMessages((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              preview: text,
              time: 'Just now',
              unread: false,
              messages: [
                ...thread.messages,
                {
                  id: `m-${Date.now()}`,
                  fromMe: true,
                  text,
                  time: 'Just now',
                },
              ],
            }
          : thread
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-[#005BB2] text-[#172B3A]">
      {/* Left Blue Sidebar MH Contabilidad */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (sec === 'message' && unreadMessagesCount > 0) {
            setUnreadMessagesCount(0);
          }
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area with signature rounded-l-[38px] container on desktop */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F3F6FA] lg:rounded-l-[38px] min-h-screen overflow-x-hidden border-l border-white/20">
        <Header
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          searchQuery={globalSearchQuery}
          onSearchChange={setGlobalSearchQuery}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          unreadMessagesCount={unreadMessagesCount}
          notificationsCount={notificationsCount}
          onClearNotifications={() => setNotificationsCount(0)}
        />

        <main className="flex-1 pb-10">
          {activeSection === 'dashboard' && (
            <DashboardOverview
              applications={applications}
              companies={INITIAL_COMPANIES}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'applications' && (
            <ApplicationsView
              applications={applications}
              filteredApplications={filteredApplications}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOrder={appSortOrder}
              onSortOrderChange={setAppSortOrder}
              onUpdateStatus={handleUpdateApplicationStatus}
              onAddApplication={handleAddApplication}
            />
          )}

          {activeSection === 'search-job' && (
            <CompaniesView
              companies={filteredCompanies}
              keyword={companyKeyword}
              onKeywordChange={setCompanyKeyword}
              locationFilter={locationFilter}
              onLocationFilterChange={setLocationFilter}
              suggestionSkill={suggestionSkill}
              onSuggestionSkillChange={setSuggestionSkill}
              sortOrder={companySortOrder}
              onSortOrderChange={setCompanySortOrder}
              onViewApplicationsForCompany={handleViewApplicationsForCompany}
            />
          )}

          {activeSection === 'message' && (
            <MessagesView
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeSection === 'statistics' && (
            <StatisticsView
              applications={applications}
              companies={INITIAL_COMPANIES}
            />
          )}

          {activeSection === 'news' && <NewsView news={INITIAL_NEWS} />}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
