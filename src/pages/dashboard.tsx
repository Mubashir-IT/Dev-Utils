import { ToolLayout } from "@/components/layout/ToolLayout";
import { tools } from "@/lib/tools-config";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useStats } from "@/hooks/use-stats";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: stats } = useStats();

  // Find most popular tool
  const popularToolId = stats?.length 
    ? [...stats].sort((a, b) => b.views - a.views)[0]?.toolId 
    : null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <ToolLayout 
      title="Dashboard" 
      description="Welcome to DevUtils. Handy utilities for developers, writers, and everyday tasks."
    >
      <div className="space-y-10">
        {/* Featured Section */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-8 lg:p-12 text-white shadow-xl shadow-primary/20">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-display tracking-tight">Handy Utilities for Work & Life</h2>
              <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed">
                Free, privacy-focused tools for developers, writers, and everyday tasks. No ads, no tracking—just simple utilities that work.
              </p>
              {popularToolId ? (
                <Link
                  href={tools.find(t => t.id === popularToolId)?.path ?? "/tools/json-formatter"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-200"
                >
                  Try {tools.find(t => t.id === popularToolId)?.name ?? "JSON Formatter"}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              ) : (
                <a
                  href="#tools"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-200"
                >
                  Explore Tools
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              )}
            </div>
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              All Tools <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{tools.length}</span>
            </h3>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool) => {
              const toolStats = stats?.find(s => s.toolId === tool.id);
              const isPopular = popularToolId === tool.id;

              return (
                <Link key={tool.id} href={tool.path}>
                  <motion.div variants={item}>
                    <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group relative overflow-hidden bg-card/50 backdrop-blur-sm">
                      {isPopular && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-600 px-2 py-1 rounded-full border border-orange-200 shadow-sm">
                            <TrendingUp className="h-3 w-3" /> Popular
                          </span>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                          "bg-gradient-to-br from-muted to-background border border-border"
                        )}>
                          <tool.icon className={cn("h-6 w-6", tool.color)} />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors flex items-center justify-between">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
                          <span className="flex items-center gap-1.5">
                            <span className={cn("w-2 h-2 rounded-full", tool.category === "Development" ? "bg-blue-400" : tool.category === "Design" ? "bg-purple-400" : tool.category === "Health" ? "bg-pink-400" : "bg-green-400")}></span>
                            {tool.category}
                          </span>
                          {toolStats && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {toolStats.views.toLocaleString()} uses
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </section>
      </div>
    </ToolLayout>
  );
}
