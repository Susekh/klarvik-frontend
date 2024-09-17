import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Moon, Sun } from "lucide-react";

type props = {
    isDark : boolean,
    setIsDark : (dark:boolean) => void
  }
  

function ThemeToggler({isDark , setIsDark} : props) {
    console.log(isDark);
    
    const handleToggle = () => {
        setIsDark(!isDark);
      };

  return (
    <div className="flex items-center gap-2">
      <Switch id="theme-toggle" checked={isDark} onClick={handleToggle} />
      <Label htmlFor="theme-toggle">{isDark? <Moon/> : <Sun/>}</Label>
    </div>
  )
}

export default ThemeToggler