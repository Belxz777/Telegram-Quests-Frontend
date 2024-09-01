type Props = {
    text:string
}
export default function Reroute(props:Props) {
    return (
      <div className="w-full h-screen flex  flex-col items-center justify-center  bg-scin-base ">
        <div className="grid grid-cols-5 gap-4 grid-rows-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4   bg-button-base rounded-full   animate-pulse bg-gradient-to-r from-primary to-secondary"
              style={
                { animationDelay: `${i * 0.1}s`,
                // background: `linear-gradient(to right, hsl(${(i * 20) % 360}, 100%, 50%), hsl(${
                //   (i * 20 + 180) % 360
                // }, 100%, 50%))`,
                }}
            />
          ))}
        </div>
        <div className="absolute top-4 right-4  text-scin-base text-muted-foreground">{props.text}</div>
        {/* <p className=" text-link-base text-2xl">{props.text}</p> */}
      </div>
    )
  }