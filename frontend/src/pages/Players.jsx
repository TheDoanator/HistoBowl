import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  DollarSign,
  MapPin,
  Search,
  Settings2,
  Trophy,
} from 'lucide-react';

const PLAYERS_PER_PAGE = 20;
const PLAYER_COLUMNS = [
  { key: 'name', label: 'NAME', className: 'pl-6 pr-4 py-3' },
  { key: 'hometown', label: 'HOMETOWN', optional: true, defaultVisible: true, className: 'px-4 py-3' },
  { key: 'titles', label: 'TITLES', optional: true, defaultVisible: true, className: 'px-4 py-3' },
  { key: 'major_titles', label: 'MAJOR TITLES', optional: true, defaultVisible: true, className: 'px-4 py-3' },
  { key: 'earnings', label: 'EARNINGS', optional: true, defaultVisible: true, className: 'px-4 py-3' },
];
const OPTIONAL_PLAYER_COLUMNS = PLAYER_COLUMNS.filter((column) => column.optional);

function getActiveStatus(value) {
  if (value === null || value === undefined || value === '') return '—';

  const normalizedValue = String(value).trim().toLocaleLowerCase();
  return ['true', '1', 'yes', 'active'].includes(normalizedValue) ? 'Active' : 'Inactive';
}

function formatBirthdate(value) {
  if (value === null || value === undefined || value === '') return '—';

  const dateText = String(value).trim();
  const dateOnlyMatch = dateText.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const date = dateOnlyMatch
    ? new Date(Date.UTC(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3]),
      ))
    : new Date(dateText);

  if (Number.isNaN(date.getTime())) return dateText;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatNumericValue(value) {
  if (value === null || value === undefined || value === '') return '—';

  const number = Number(value);
  return Number.isNaN(number) ? '—' : number;
}

function getPlayerDisplayValue(player, key) {
  if (key === 'currently_active') return getActiveStatus(player[key]);
  if (key === 'birthdate') return formatBirthdate(player[key]);
  if (['first_season', 'last_season', 'major_titles'].includes(key)) {
    return formatNumericValue(player[key]);
  }

  return player[key] || '—';
}

function getSortValue(player, key) {
  const value = player[key];

  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (key === 'earnings') {
    const earnings = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    return Number.isNaN(earnings) ? null : earnings;
  }

  if (['titles', 'major_titles', 'first_season', 'last_season'].includes(key)) {
    const number = Number(value);
    return Number.isNaN(number) ? null : number;
  }

  if (key === 'currently_active') {
    return getActiveStatus(value) === 'Active' ? 1 : 0;
  }

  if (key === 'birthdate') {
    const timestamp = Date.parse(String(value));
    return Number.isNaN(timestamp) ? null : timestamp;
  }

  return String(value);
}

function comparePlayerNames(playerA, playerB) {
  return String(playerA.name ?? '').localeCompare(String(playerB.name ?? ''), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let visiblePages;

  if (currentPage <= 4) {
    visiblePages = [1, 2, 3, 4, 5, totalPages];
  } else if (currentPage >= totalPages - 3) {
    visiblePages = [1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    visiblePages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
  }

  return visiblePages.reduce((items, page, index) => {
    if (index > 0 && page - visiblePages[index - 1] > 1) {
      items.push(`ellipsis-${page}`);
    }

    items.push(page);
    return items;
  }, []);
}

export default function Players() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'titles', direction: 'descending' });
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(() => Object.fromEntries(
    OPTIONAL_PLAYER_COLUMNS.map((column) => [column.key, Boolean(column.defaultVisible)]),
  ));

  //Data fetching
  const { data: players, isLoading, isError, error } = useQuery({
    queryKey: ['playersData'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
    staleTime: Infinity, 
  });

  //Search, sorting, and pagination
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredPlayers = players?.filter((player) =>
    String(player.name ?? '').toLocaleLowerCase().includes(normalizedSearchQuery)
  ) ?? [];
  const sortedPlayers = [...filteredPlayers].sort((playerA, playerB) => {
    const valueA = getSortValue(playerA, sortConfig.key);
    const valueB = getSortValue(playerB, sortConfig.key);

    if (valueA === null && valueB === null) return comparePlayerNames(playerA, playerB);
    if (valueA === null) return 1;
    if (valueB === null) return -1;

    const comparison = typeof valueA === 'number'
      ? valueA - valueB
      : valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });

    if (comparison === 0) return comparePlayerNames(playerA, playerB);

    return sortConfig.direction === 'ascending' ? comparison : -comparison;
  });
  const totalPlayers = filteredPlayers.length;
  const totalPages = Math.ceil(totalPlayers / PLAYERS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const pageStartIndex = (activePage - 1) * PLAYERS_PER_PAGE;
  const pageEndIndex = Math.min(pageStartIndex + PLAYERS_PER_PAGE, totalPlayers);
  const paginatedPlayers = sortedPlayers.slice(pageStartIndex, pageEndIndex);
  const paginationItems = getPaginationItems(activePage, totalPages);
  const displayedColumns = PLAYER_COLUMNS.filter(
    (column) => column.key === 'name' || visibleColumns[column.key],
  );
  const tableMinWidth = Math.max(800, displayedColumns.length * 150);

  const toggleColumn = (key) => {
    setVisibleColumns((currentColumns) => ({
      ...currentColumns,
      [key]: !currentColumns[key],
    }));
  };

  const handleSort = (key) => {
    setSortConfig((currentSort) => ({
      key,
      direction: currentSort.key === key && currentSort.direction === 'ascending'
        ? 'descending'
        : 'ascending',
    }));
    setCurrentPage(1);
  };

  //Loading and error screens
  if (isLoading) return <div className="text-white dark:text-slate-400 text-center mt-10">Loading players...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
  
  //Main page
  return (
    <FadeIn>
      <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6 mb-6">
          <h1 className="text-5xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">
            Players
          </h1>

          <div className="mt-6 sm:mt-0 flex w-full sm:w-auto items-center gap-3">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowColumnToggle((isOpen) => !isOpen)}
                aria-expanded={showColumnToggle}
                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <Settings2 className="w-4 h-4 text-orange-500" />
                Columns
              </button>

              {showColumnToggle && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowColumnToggle(false)} />
                  <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 z-20 flex flex-col gap-3">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 mb-1">
                      Visible Columns
                    </p>
                    {OPTIONAL_PLAYER_COLUMNS.map((column) => (
                      <label key={column.key} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 cursor-pointer hover:text-orange-500 transition-colors select-none">
                        <input
                          type="checkbox"
                          checked={visibleColumns[column.key]}
                          onChange={() => toggleColumn(column.key)}
                          className="w-4 h-4 rounded text-orange-600 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer accent-orange-500"
                        />
                        {column.label}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative min-w-0 flex-1 sm:w-80 sm:flex-none">
              <label htmlFor="player-search" className="sr-only">Search players by name</label>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="player-search"
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search players..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 shadow-sm outline-none transition-colors duration-300 ease-out placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW: CARDS (Visible below lg) --- */}
        {players && (
          <div className="flex flex-col gap-4 lg:hidden">
            {filteredPlayers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                No players found.
              </div>
            ) : (
              paginatedPlayers.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col gap-3"
                >
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                      <Link to={`/players/${p.id}`} className="transition-colors duration-200 ease-out hover:text-orange-600">
                        {p.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    {visibleColumns.hometown && (
                      <div className="col-span-2 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Hometown</p>
                          <p className="font-medium text-slate-700 dark:text-slate-300 text-xs">
                            {p.hometown || '—'}
                          </p>
                        </div>
                      </div>
                    )}

                    {visibleColumns.titles && (
                      <div className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Titles</p>
                          <p className="font-bold text-orange-600 dark:text-orange-400 text-xs">
                            {p.titles || '0'}
                          </p>
                        </div>
                      </div>
                    )}

                    {visibleColumns.major_titles && (
                      <div className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Major Titles</p>
                          <p className="font-bold text-orange-600 dark:text-orange-400 text-xs">
                            {getPlayerDisplayValue(p, 'major_titles')}
                          </p>
                        </div>
                      </div>
                    )}

                    {visibleColumns.earnings && (
                      <div className="col-span-2 flex items-start gap-2 pt-1">
                        <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Earnings</p>
                          <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                            {p.earnings || '—'}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- DESKTOP VIEW: TABLE (Visible on lg and up) --- */}
        {players && (
          <div className="hidden lg:block w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/40 transition-colors duration-300 ease-out">
            <table
              className="w-full table-fixed text-left border-collapse"
              style={{ minWidth: `${tableMinWidth}px` }}
            >
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase tracking-widest text-slate-400 h-12 transition-colors duration-300 ease-out">
                  {displayedColumns.map((column) => {
                    const isActive = sortConfig.key === column.key;
                    const SortIcon = isActive
                      ? sortConfig.direction === 'ascending' ? ArrowUp : ArrowDown
                      : ArrowUpDown;

                    return (
                      <th
                        key={column.key}
                        scope="col"
                        aria-sort={isActive ? sortConfig.direction : 'none'}
                        className={column.className}
                        style={{ width: `${100 / displayedColumns.length}%` }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSort(column.key)}
                          className={`group/sort inline-flex items-center gap-1.5 transition-colors cursor-pointer hover:text-orange-600 focus-visible:outline-none focus-visible:text-orange-600 ${
                            isActive ? 'text-orange-600 dark:text-orange-400' : ''
                          }`}
                        >
                          <span>{column.label}</span>
                          <SortIcon aria-hidden="true" className="w-3.5 h-3.5" />
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y text-sm font-medium">
                {filteredPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={displayedColumns.length} className="text-center py-12 text-slate-400 italic">No players found.</td>
                  </tr>
                ) : (
                  paginatedPlayers.map((p) => (
                    <tr key={p.id} className="border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-300 ease-out h-16 group">
                      {displayedColumns.map((column) => {
                        if (column.key === 'name') {
                          return (
                            <td key={column.key} className="pl-6 pr-4 py-4 font-black text-slate-900 dark:text-white max-w-[250px]">
                              <Link to={`/players/${p.id}`} className="transition-colors duration-200 ease-out hover:text-orange-600">
                                {p.name}
                              </Link>
                            </td>
                          );
                        }

                        const cellClassName = ['titles', 'major_titles'].includes(column.key)
                          ? 'px-4 py-4 font-bold text-orange-600 dark:text-orange-400'
                          : column.key === 'earnings'
                            ? 'px-4 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap'
                            : 'px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap';

                        return (
                          <td key={column.key} className={cellClassName}>
                            {column.key === 'titles' ? p.titles || '0' : getPlayerDisplayValue(p, column.key)}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {players && filteredPlayers.length > 0 && (
          <div className="flex flex-col items-center gap-3 mt-6 px-1 sm:px-2 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
            <p className="text-center text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 lg:justify-self-start lg:text-left">
              Showing <span className="font-black text-slate-700 dark:text-slate-200">{pageStartIndex + 1}</span> to{' '}
              <span className="font-black text-slate-700 dark:text-slate-200">{pageEndIndex}</span> of{' '}
              <span className="font-black text-slate-700 dark:text-slate-200">{totalPlayers}</span> players
            </p>

            <nav aria-label="Players pagination" className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:justify-self-center">
              {paginationItems.map((item) => {
                if (typeof item === 'string') {
                  return (
                    <span
                      key={item}
                      aria-hidden="true"
                      className="w-5 text-center text-sm font-bold text-slate-400 dark:text-slate-500"
                    >
                      ...
                    </span>
                  );
                }

                const isActive = item === activePage;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    aria-label={`Go to page ${item}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border text-sm font-black shadow-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 border-orange-600 text-white dark:bg-orange-600 dark:border-orange-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900/60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:border-slate-600'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
            <p className="min-w-0 text-center text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 lg:justify-self-end lg:text-right">
              <span className="block">Earnings reflect 2025 totals</span>
              <span className="block">Players included from televised PBA events, 1987-2026</span>
            </p>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
