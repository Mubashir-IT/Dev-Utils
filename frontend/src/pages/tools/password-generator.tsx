import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    let charset = "";
    if (options.uppercase) charset += chars.uppercase;
    if (options.lowercase) charset += chars.lowercase;
    if (options.numbers) charset += chars.numbers;
    if (options.symbols) charset += chars.symbols;

    if (charset === "") {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length[0]);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length[0]; i++) {
      result += charset[array[i] % charset.length];
    }
    
    setPassword(result);
  }, [length, options]);

  // Generate on mount and when options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
      duration: 2000,
    });
  };

  const getStrength = () => {
    if (!password) return { label: "None", color: "bg-gray-200", icon: Shield };
    let score = 0;
    if (length[0] > 8) score++;
    if (length[0] >= 12) score++;
    if (options.uppercase && options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", icon: ShieldAlert };
    if (score <= 4) return { label: "Medium", color: "bg-orange-500", icon: Shield };
    return { label: "Strong", color: "bg-green-500", icon: ShieldCheck };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure, random passwords for your accounts."
      toolId="password-generator"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Display Area */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden group">
          <div className={cn("absolute top-0 left-0 w-1 h-full", strength.color)}></div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <strength.icon className="h-3 w-3" />
                {strength.label} Password
              </span>
              <span className="text-xs text-muted-foreground">{length} characters</span>
            </div>
            <div className="flex gap-4">
              <Input 
                value={password} 
                readOnly 
                className="font-mono text-xl md:text-2xl h-14 bg-transparent border-0 px-0 shadow-none focus-visible:ring-0 selection:bg-primary/20" 
              />
              <Button size="icon" variant="ghost" className="h-14 w-14 shrink-0 rounded-xl hover:bg-muted" onClick={copyToClipboard}>
                <Copy className="h-6 w-6 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Password Length</Label>
              <span className="text-xl font-bold font-mono bg-muted px-3 py-1 rounded-md min-w-[3ch] text-center">
                {length}
              </span>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              min={6}
              max={32}
              step={1}
              className="py-4 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
              <Switch 
                id="uppercase" 
                checked={options.uppercase} 
                onCheckedChange={(c) => setOptions(prev => ({ ...prev, uppercase: c }))} 
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
              <Switch 
                id="lowercase" 
                checked={options.lowercase} 
                onCheckedChange={(c) => setOptions(prev => ({ ...prev, lowercase: c }))} 
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
              <Switch 
                id="numbers" 
                checked={options.numbers} 
                onCheckedChange={(c) => setOptions(prev => ({ ...prev, numbers: c }))} 
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#$)</Label>
              <Switch 
                id="symbols" 
                checked={options.symbols} 
                onCheckedChange={(c) => setOptions(prev => ({ ...prev, symbols: c }))} 
              />
            </div>
          </div>

          <Button 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" 
            onClick={generatePassword}
            disabled={!options.uppercase && !options.lowercase && !options.numbers && !options.symbols}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Generate New Password
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
