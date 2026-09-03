import FadeIn from '../components/FadeIn';
import { useQuery } from '@tanstack/react-query';

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
                      <td className="pl-6 py-4 font-black text-slate-900 dark:text-white max-w-[250px]">{p.name || '—'}</td>
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