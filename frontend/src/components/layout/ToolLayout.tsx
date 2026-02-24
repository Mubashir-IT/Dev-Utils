import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { tools } from "@/lib/tools-config";
import { useTrackView } from "@/hooks/use-stats";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  toolId?: string;
}

export function ToolLayout({ children, title, description, toolId }: ToolLayoutProps) {
  const { mutate: trackView } = useTrackView();
  const [location] = useLocation();

  useEffect(() => {
    // If explicit toolId provided, track it. 
    // Otherwise try to find matching tool from URL
    if (toolId) {
      const tool = tools.find(t => t.id === toolId);
      if (tool) trackView({ toolId: tool.id, name: tool.name });
    } else {
      const tool = tools.find(t => t.path === location);
      if (tool) trackView({ toolId: tool.id, name: tool.name });
    }
  }, [toolId, location, trackView]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <main className="lg:pl-[280px] min-h-screen pt-16 lg:pt-0 transition-all duration-300">
        <div className="container mx-auto max-w-5xl p-6 lg:p-10">
          {(title || description) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 lg:mb-12 space-y-2"
            >
              {title && (
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
