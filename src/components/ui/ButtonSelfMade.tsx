interface ButtonProps {
    text?: string;
  }
  
  const ButtonSelfMade: React.FC<ButtonProps> = ({ text = "Explore More" }) => {
    return (
      <button className="bg-[#FF7A28] text-white text-base font-semibold px-6 sm:px-10 mt-8 py-2 border border-[#FF7A28] hover:text-[#FF7A28] hover:bg-white transition-all duration-300 ease-in-out">
        {text}
      </button>
    );
  };
  
  export default ButtonSelfMade;
  