
interface Props {
  text: string,
  className?: string
}

export const ColorText = ({ text, className }: Props) => {
  return (
    <h1 className={`${className}   `}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={
          `${index % 2 === 0 ? "text-primary-dark" : "text-primary-light"} bg-transparent`
            
          }
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export const GradientButton = ({ text }: { text: string }) => {
  return (
    <button className="relative inline-block rounded-lg p-[2px] overflow-hidden group">
      {/* Border gradient */}
      <span
        className="absolute inset-0 rounded-lg 
                   bg-gradient-to-r from-primary-dark via-primary-light to-primary-dark
                   bg-[length:200%_200%]
                   animate-[spin_6s_linear_infinite]
                   group-hover:animate-[spin_4s_linear_infinite]"
      ></span>

      {/* Inner background */}
      <span
        className="relative flex items-center justify-center 
       hover:transition-all hover:duration-300 hover:ease-in-out  hover:scale-95
                       bg-white dark:bg-black rounded-lg 
                       px-5 py-2.5 text-sm font-medium"
      >
        <ColorText text={text} />
      </span>
    </button>
  );
};



