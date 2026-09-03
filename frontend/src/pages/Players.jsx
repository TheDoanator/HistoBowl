import FadeIn from '../components/FadeIn';
import { useQuery } from '@tanstack/react-query';
import { MapPin, CalendarRange, Trophy, DollarSign } from 'lucide-react';

export default function Players() {
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

  //Loading and error screens
  if (isLoading) return <div className="text-white text-center mt-10">Loading players...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
  
  //Main page
  return (
    <FadeIn>
      <div className="max-w-[90%] xl:max-w-[85%] mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6 mb-6">
          <h1 className="text-5xl font-black italic tracking-tight uppercase text-slate-900 dark:text-white">
            Players
          </h1>
        </div>

        {/* --- MOBILE VIEW: CARDS (Visible only on small screens) --- */}
        {players && (
          <div className="flex flex-col gap-4 md:hidden">
            {players.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                No records found.
              </div>
            ) : (
              players.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col gap-3"
                >
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                      {p.name || '—'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    <div className="col-span-2 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Hometown</p>
                        <p className="font-medium text-slate-700 dark:text-slate-300 text-xs">
                          {p.hometown || '—'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CalendarRange className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Years Active</p>
                        <p className="font-medium text-slate-700 dark:text-slate-300 text-xs">
                          {p.years_active || '—'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Titles</p>
                        <p className="font-bold text-orange-600 dark:text-orange-400 text-xs">
                          {p.titles || '0'}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-start gap-2 pt-1">
                      <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Earnings</p>
                        <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                          {p.earnings || '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* --- DESKTOP VIEW: TABLE (Hidden on mobile, visible on md and up) --- */}
        {players && (
          <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/40">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase tracking-widest text-slate-400 h-12">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Hometown</th>
                  <th className="px-4 py-3">Years Active</th>
                  <th className="px-4 py-3">Titles</th>
                  <th className="px-4 py-3">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm font-medium">
                {players.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-12 text-slate-400 italic">No records found.</td>
                  </tr>
                ) : (
                  players.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors h-16 group">
                      <td className="pl-6 py-4 font-black text-slate-900 dark:text-white max-w-[250px]">
                        {p.name || '—'}
                      </td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.hometown || '—'}</td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{p.years_active || '—'}</td>
                      <td className="px-4 py-4 font-bold text-orange-600 dark:text-orange-400">{p.titles || '0'}</td>
                      <td className="px-4 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{p.earnings || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
