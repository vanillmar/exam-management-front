import { createTheme } from "flowbite-react";

/*
  Fedgtech Flowbite theme: map the project's design tokens to Flowbite theme keys.
  Keep this small and extend later as needed.
*/
const fedgtechTheme = createTheme({
  
  button: {
    color: {
      /* Use project CSS variables where possible */
      primary: "bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-black",
      secondary: "bg-slate-600 hover:bg-slate-700 text-white",
    },
    size: {
      lg: "px-6 py-3 text-lg",
      sm: "px-3 py-3 text-sm",
    },
  },
  textInput: {

    size: { 
      lg: "px-6 py-10 text-lg",
      sm: "px-3 py-1 text-sm",
    },  
  },
});

export default fedgtechTheme;