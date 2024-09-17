import ThemeToggler from "./ThemeToggler";
import UserBtn from "./UserBtn";

type props = {
  isDark : boolean,
  setIsDark : (dark : boolean) => void; 
}

function Navbar({isDark , setIsDark} : props) {
  return (
    <div className=" dark:bg-neutral-800 dark:text-white p-2 pl-4 pr-4 flex justify-between items-center duration-500 border-b-2">
      LOGO
      <div className="flex gap-8">
        <ThemeToggler isDark={isDark} setIsDark={setIsDark}/>
        <UserBtn/>
      </div>
      
    </div>
  )
}

export default Navbar