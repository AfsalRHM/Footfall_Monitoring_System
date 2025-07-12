import { useState, type JSX } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({
  setActive,
  navItems,
  active,
}: {
  setActive: (id: string) => void;
  navItems: { id: string; icon: JSX.Element; label: string }[];
  active: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 shadow-md">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">
          Menu
        </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-slate-800 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex w-64 h-screen bg-white dark:bg-slate-800 shadow-md flex-col fixed md:static z-50`}
      >
        <nav className="flex-1 px-4 py-8 pt-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setIsOpen(false); // Close sidebar on mobile after selection
              }}
              className={`w-full flex items-center gap-3 px-6 py-2 rounded-md text-left hover:cursor-pointer ${
                active === item.id
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
