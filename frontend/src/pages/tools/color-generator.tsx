import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { RefreshCcw, Copy, Check, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ColorGenerator() {
  const [colors, setColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState("");
  const { toast } = useToast();

  const generateColor = () => {
    const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return `#${hex.toUpperCase()}`;
  };

  const generatePalette = () => {
    const newColors = Array(5).fill(null).map(generateColor);
    setColors(newColors);
  };

  useEffect(() => {
    generatePalette();
  }, []);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `${color} copied to clipboard`,
      duration: 1500,
    });
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("#") && value.length > 0) value = "#" + value;
    setCustomColor(value);
    
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColors(prev => [value.toUpperCase(), ...prev.slice(0, 4)]);
    }
  };

  return (
    <ToolLayout
      title="Palette Generator"
      description="Generate beautiful, random color palettes or test your own colors."
      toolId="color-generator"
    >
      <div className="flex flex-col h-[calc(100vh-250px)] min-h-[500px] gap-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full max-w-xs">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Enter HEX code (e.g. #FF5733)" 
              className="pl-10 h-12"
              value={customColor}
              onChange={handleCustomColor}
            />
          </div>
          <Button 
            size="lg" 
            onClick={generatePalette}
            className="w-full md:w-auto px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            <RefreshCcw className="h-5 w-5 mr-2" />
            Generate New Palette
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
          {colors.map((color, index) => (
            <div 
              key={`${color}-${index}`} 
              className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ring-1 ring-border/20"
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                <span className="font-mono font-bold text-lg text-slate-800">{color}</span>
                <Copy className="h-5 w-5 text-slate-500" />
              </div>

              {/* Mobile View Label */}
              <div className="md:hidden absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-slate-800 font-mono font-bold shadow-sm">
                {color}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-6 text-center text-muted-foreground border border-border/50 border-dashed">
          <p>Enter a HEX code to preview it, or click on any color card to copy its code.</p>
        </div>
      </div>
    </ToolLayout>
  );
}
