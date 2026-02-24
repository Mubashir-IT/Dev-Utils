import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) return;

    let calculatedBmi = 0;
    if (unit === "metric") {
      // Weight (kg) / Height (m)^2
      calculatedBmi = w / Math.pow(h / 100, 2);
    } else {
      // (Weight (lbs) / Height (in)^2) * 703
      // Simplified: expecting height in feet.inches for simplicity? Or just inches?
      // Let's assume input is inches for simplicity or ft only.
      // Standard is inches for imperial calc
      // Let's assume user inputs total inches if imperial for simplicity 
      // Or maybe switch input to ft/in UI? Let's keep it simple: inches.
      calculatedBmi = (w / Math.pow(h, 2)) * 703;
    }

    setBmi(Math.round(calculatedBmi * 10) / 10);
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500" };
    if (val < 25) return { label: "Healthy Weight", color: "text-green-500", bg: "bg-green-500" };
    if (val < 30) return { label: "Overweight", color: "text-orange-500", bg: "bg-orange-500" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-500" };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to check your health status."
      toolId="bmi-calculator"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <Label className="text-base">Measurement System</Label>
            <RadioGroup defaultValue="metric" onValueChange={(v) => { setUnit(v as any); setBmi(null); setWeight(""); setHeight(""); }} className="flex gap-4">
              <div className="flex items-center space-x-2 border border-border rounded-lg p-3 flex-1 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="metric" id="metric" />
                <Label htmlFor="metric" className="cursor-pointer flex-1">Metric (kg/cm)</Label>
              </div>
              <div className="flex items-center space-x-2 border border-border rounded-lg p-3 flex-1 hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="imperial" id="imperial" />
                <Label htmlFor="imperial" className="cursor-pointer flex-1">Imperial (lbs/in)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={calculateBmi} className="w-full h-12 text-base font-semibold" disabled={!weight || !height}>
              Calculate BMI
            </Button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          {!bmi ? (
            <div className="text-muted-foreground">
              <p>Enter your details to see the result.</p>
            </div>
          ) : (
            <div className="space-y-6 w-full animate-in fade-in zoom-in-95 duration-300 relative z-10">
              <div>
                <h3 className="text-muted-foreground font-medium uppercase tracking-wide text-xs mb-2">Your BMI Score</h3>
                <div className="text-6xl font-black text-foreground tracking-tighter">{bmi}</div>
              </div>
              
              <div className={cn("inline-flex items-center px-4 py-2 rounded-full font-bold text-sm bg-muted", category?.color)}>
                {category?.label}
              </div>

              <div className="w-full h-4 bg-muted rounded-full overflow-hidden mt-8 relative">
                {/* Gradient Bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-500 opacity-20"></div>
                {/* Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-foreground transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  style={{ 
                    left: `${Math.min(Math.max((bmi - 15) * 3, 0), 100)}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground w-full">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40+</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
