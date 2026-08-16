function StatCard({ title, value, icon: Icon, tag = "STAT", trendLabel, isHighlight = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 group ${
        isHighlight
          ? "bright-brown-card text-white shadow-xl"
          : "liquid-glass-type3 text-slate-900 shadow-sm"
      }`}
    >
      {/* Glow Ambient Corner */}
      {isHighlight && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/25 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-mono-custom font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                isHighlight
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              [ {tag} ]
            </span>
          </div>

          <p
            className={`text-xs font-semibold uppercase tracking-wider pt-1.5 ${
              isHighlight ? "text-blue-100" : "text-slate-500"
            }`}
          >
            {title}
          </p>

          <h2 className="text-3xl font-black tracking-tight font-mono-custom pt-1">
            {value}
          </h2>

          {trendLabel && (
            <p
              className={`text-[11px] font-mono-custom font-medium pt-1 ${
                isHighlight ? "text-blue-100/90" : "text-slate-400"
              }`}
            >
              ✦ {trendLabel}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`p-3.5 rounded-2xl transition-transform group-hover:scale-110 shadow-sm ${
              isHighlight
                ? "bg-white/15 text-sky-200 border border-white/20"
                : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      {/* Bottom highlight line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2.5px] ${
          isHighlight ? "bg-gradient-to-r from-blue-400 to-sky-300" : "bg-transparent group-hover:bg-blue-600 transition-colors"
        }`}
      />
    </div>
  );
}

export default StatCard;