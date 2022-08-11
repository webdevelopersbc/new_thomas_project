import React, { FunctionComponent, useEffect, useState } from 'react';
import { getSpeakerFromSpeakers, getSessionsForSpeakers, sort } from '@utils';
import { Dropdown } from 'semantic-ui-react';
import { SessionCard } from '@components';
import cloneDeep from 'lodash/cloneDeep';

export type SessionsTabProps = {
  sessions: any[];
  content: string;
  speakers: any[];
};

export const SessionsTab: FunctionComponent<SessionsTabProps> = ({
  sessions,
  content,
  speakers,
}) => {
  const [categoryFilters, setCategoryFilters] = useState<any[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<any[]>([]);

  useEffect(() => {
    const filteredSessions: any[] = [];
    sessions.forEach((s) => {
      const match = Array.from({ length: s.categories.length }, () => true);
      s.categories.forEach((c: any, index: number) => {
        const activeFilter = activeFilters.find((af) => af.name === c.name);
        if (activeFilter) {
          let activeFilterMatch = false;
          activeFilter.values.forEach((v: string) => {
            if (c.categoryItems.find((ci: any) => ci.name === v)) {
              activeFilterMatch = true;
            }
          });
          match[index] = activeFilterMatch;
        }
      });
      if (match.every((e) => e === true)) {
        filteredSessions.push(s);
      }
      console.log(match);
    });
    setFilteredSessions(filteredSessions);
  }, [activeFilters]);

  useEffect(() => {
    if (sessions.length <= 0) return;
    const allSessions = cloneDeep(sessions); // clone to prevent mutating the session
    const filters: any[] = [];
    allSessions.forEach((session) => {
      session.categories.forEach((currentCategory: any) => {
        const currentFilter = filters.find((f) => f.id == currentCategory.id);
        if (!currentFilter) {
          filters.push(currentCategory);
        } // if the filter doesn't exist in our array, add it
        else {
          currentCategory.categoryItems.forEach((ci: any) => {
            // does this item already exist in the current filter
            if (
              !currentFilter.categoryItems.find((ci2: any) => ci2.id == ci.id)
            )
              currentFilter.categoryItems.push(ci);
          });
        }
      });
    });
    const reducedFilterSet = filters.filter((f) => f.categoryItems.length > 1); // remove anything with just 1 value
    // TODO: determine if we want to reduce the filters for anything with 1 value
    setCategoryFilters(filters);
    setFilteredSessions(sessions);
  }, [sessions]);

  const message =
    filteredSessions.length <= 0
      ? sessions.length <= 0
        ? 'There are no sessions currently available.'
        : 'There are no sessions in the current filter.'
      : null;
  return (
    <>
      {content && (
        <div
          className="bg-light-gray rounded p-8 mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {categoryFilters.length > 0 && (
        <div className="bg-white rounded pl-1 mb-6 flex flex-row">
          {categoryFilters.map((categoryFilter) => (
            <div className="mr-8">
              <div className="uppercase font-bold text-lg mb-2">
                {categoryFilter.name}
              </div>
              <Dropdown
                placeholder={categoryFilter.name}
                clearable
                selection
                multiple
                onChange={(event, data) => {
                  const activeFilterIndex = activeFilters.findIndex(
                    (filter) => filter.name === data.placeholder
                  );
                  if (activeFilterIndex === -1) {
                    if ((data.value as unknown[]).length) {
                      setActiveFilters([
                        ...activeFilters,
                        { name: data.placeholder, values: data.value },
                      ]);
                    }
                  } else if ((data.value as unknown[]).length <= 0) {
                    const newActiveFilters = [...activeFilters];
                    newActiveFilters.splice(activeFilterIndex, 1);
                    setActiveFilters(newActiveFilters);
                  } else {
                    const newActiveFilters = [...activeFilters];
                    newActiveFilters[activeFilterIndex] = {
                      name: data.placeholder,
                      values: data.value,
                    };
                    setActiveFilters(newActiveFilters);
                  }
                }}
                options={sort(
                  categoryFilter.categoryItems.map((categoryItem: any) => ({
                    key: categoryItem.name,
                    text: categoryItem.name,
                    value: categoryItem.name,
                  })),
                  'key',
                  'asc'
                )}
              />
            </div>
          ))}
        </div>
      )}

      {filteredSessions.map((session) => {
        const sessionSpeakers = session.speakers.map((s: any) =>
          getSpeakerFromSpeakers(s.id, speakers)
        );
        const speakerSessions = getSessionsForSpeakers(speakers, sessions);
        return (
          <SessionCard
            key={session.id}
            session={session}
            speakers={sessionSpeakers}
            allSpeakerSessions={speakerSessions}
          />
        );
      })}

      {message && (
        <div className="bg-light-gray rounded p-8 mb-8">{message}</div>
      )}
    </>
  );
};
