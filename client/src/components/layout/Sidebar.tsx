import { Link, useLocation } from "wouter";
import { tools } from "@/lib/tools-config";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  Github, 
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Sidebar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const NavContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-2xl cursor-pointer group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
              <Laptop className="h-6 w-6" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              DevUtils
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-1 overflow-y-auto">
        <Link href="/">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer mb-6",
            location === "/" 
              ? "bg-primary/10 text-primary shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </div>
        </Link>

        <div className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider px-3 mb-2 mt-6">
          Tools
        </div>
        
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.path}>
            <div 
              onClick={() => isMobile && setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                location === tool.path 
                  ? "bg-primary/10 text-primary shadow-sm translate-x-1" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <tool.icon className={cn("h-4 w-4", location === tool.path && "animate-pulse")} />
              {tool.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 lg:hidden flex items-center justify-between">
         <Link href="/">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Laptop className="h-5 w-5" />
            </div>
            <span>DevUtils</span>
          </div>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-[280px] h-screen fixed left-0 top-0 border-r border-border bg-background/50 backdrop-blur-xl z-40">
      <NavContent />
    </div>
  );
}
