
export default function Reroute() {
    return (
      <div className="w-full h-screen flex items-center justify-center  bg-background">
        <div className="grid grid-cols-5 gap-4 grid-rows-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4  bg-button-base rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    )
  }