import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Page Imports
import Dashboard from "@/pages/dashboard";
import JsonFormatter from "@/pages/tools/json-formatter";
import PasswordGenerator from "@/pages/tools/password-generator";
import WordCounter from "@/pages/tools/word-counter";
import ColorGenerator from "@/pages/tools/color-generator";
import AgeCalculator from "@/pages/tools/age-calculator";
import BmiCalculator from "@/pages/tools/bmi-calculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tools/json-formatter" component={JsonFormatter} />
      <Route path="/tools/password-generator" component={PasswordGenerator} />
      <Route path="/tools/word-counter" component={WordCounter} />
      <Route path="/tools/color-generator" component={ColorGenerator} />
      <Route path="/tools/age-calculator" component={AgeCalculator} />
      <Route path="/tools/bmi-calculator" component={BmiCalculator} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
