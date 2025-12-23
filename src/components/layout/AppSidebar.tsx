import { FileText, Send, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Cover Letter",
    url: "/",
    icon: FileText,
    description: "Generate professional cover letters",
  },
  {
    title: "Proposal Generator",
    url: "/proposal",
    icon: Send,
    description: "Create business proposals",
  },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-smooth"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-sidebar-accent transition-smooth"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-sidebar-foreground" />
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img 
              src="https://storage.googleapis.com/gpt-engineer-file-uploads/yAAKJhrcCROub1vhL5ukSocvL1H3/uploads/1765965008669-Letter-G.png" 
              alt="CoverCraft Logo" 
              className="w-10 h-10 rounded-xl object-contain"
            />
            <div>
              <h1 className="font-heading text-lg font-semibold text-sidebar-foreground">
                CoverCraft
              </h1>
              <p className="text-xs text-muted-foreground">
                Craft the perfect first impression
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Tools
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-smooth group"
              activeClassName="bg-primary/10 text-primary border border-primary/20 shadow-soft"
            >
              <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="px-4 py-3 rounded-xl bg-sidebar-accent/50">
            <p className="text-xs text-muted-foreground">
              Powered by AI • Fast & Professional
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
