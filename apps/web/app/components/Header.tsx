import BrookNotification from './BrookNotification';

export default function Header() {
  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" 
        alt="Lush Forest Canopy" 
        className="w-full h-full object-cover opacity-50 contrast-110"
      />
      <div className="absolute inset-0 nature-gradient" />
      
      <div className="absolute top-8 left-8">
        <div className="text-[11px] text-white/80 font-semibold uppercase tracking-[0.3em] bg-black/60 border border-white/10 px-4 py-2 sharp backdrop-blur-md">
          Portfolio // Active
        </div>
      </div>

      {/* Brook Notification - Top Right */}
      <BrookNotification />
    </div>
  );
}
