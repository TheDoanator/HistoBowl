import FadeIn from '../components/FadeIn';

function Tournaments() {
  return (
    <FadeIn>
      <div className="flex items-center justify-center flex-1 flex-col mt-12 px-4">
        <h1 className="text-5xl font-black italic tracking-tight uppercase text-slate-800 dark:text-slate-100 transition-colors duration-500">
          Tournaments
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium text-center mt-2 transition-colors duration-500">
          Season history and data coming soon!
        </p>
      </div>
    </FadeIn>
  );
}

export default Tournaments;