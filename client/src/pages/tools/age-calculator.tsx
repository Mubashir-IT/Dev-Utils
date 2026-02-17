import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { differenceInYears, differenceInMonths, differenceInDays, isValid, parseISO } from "date-fns";
import { Calendar, PartyPopper } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = parseISO(birthDate);
    const today = new Date();

    if (!isValid(birth) || birth > today) {
      setResult(null);
      return;
    }

    const years = differenceInYears(today, birth);
    const months = differenceInMonths(today, birth) % 12;
    // Approximation for days after full months
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - (today.getDate() < birth.getDate() ? 1 : 0), birth.getDate());
    const days = differenceInDays(today, lastMonth);

    setResult({ years, months, days });
  };

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days."
      toolId="age-calculator"
    >
      <div className="max-w-xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <Label htmlFor="birthdate" className="text-base">Enter Date of Birth</Label>
            <div className="flex gap-4">
              <Input
                id="birthdate"
                type="date"
                className="h-12 text-lg"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              <Button 
                size="lg" 
                onClick={calculateAge}
                className="h-12 px-8 font-semibold"
                disabled={!birthDate}
              >
                Calculate
              </Button>
            </div>
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative overflow-hidden bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                
                <h3 className="text-muted-foreground font-medium uppercase tracking-wide text-xs mb-6">You are exactly</h3>
                
                <div className="grid grid-cols-3 gap-4 divide-x divide-border/50">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold text-primary mb-1">{result.years}</span>
                    <span className="text-sm text-muted-foreground font-medium">Years</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold text-primary mb-1">{result.months}</span>
                    <span className="text-sm text-muted-foreground font-medium">Months</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold text-primary mb-1">{result.days}</span>
                    <span className="text-sm text-muted-foreground font-medium">Days</span>
                  </div>
                </div>

                {result.years === 0 && result.months === 0 && result.days === 0 && (
                   <div className="mt-6 flex items-center justify-center gap-2 text-orange-500 font-bold animate-bounce">
                     <PartyPopper className="h-5 w-5" />
                     Welcome to the world!
                   </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
