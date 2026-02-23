
'use client';

import { use } from 'react';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CloudSun, Plus, MoreVertical, Edit, Trash2, Thermometer, Droplets, Wind, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WeatherForm } from '@/components/construction/weather-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock function to get project name
async function getProjectNameById(id: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (id === "1") return "Alpha Launch";
  if (id === "2") return "Beta Platform Development";
  return `Project (ID: ${id})`;
}

const INITIAL_WEATHER_LOGS = [
  { id: '1', date: '2024-02-20', condition: 'Sunny', temp: 28, humidity: 45, windSpeed: 12, impact: 'None', notes: 'Clear skies, perfect for concrete pouring.' },
  { id: '2', date: '2024-02-21', condition: 'Cloudy', temp: 24, humidity: 60, windSpeed: 15, impact: 'Minimal', notes: 'Overcast but no rain reported.' },
  { id: '3', date: '2024-02-22', condition: 'Rainy', temp: 19, humidity: 85, windSpeed: 25, impact: 'Moderate', notes: 'Light rain in the morning, delayed excavation.' },
];

export default function WeatherReportsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const projectId = params.id;
  const [projectName, setProjectName] = useState('Loading...');
  const { toast } = useToast();
  const [weatherLogs, setWeatherLogs] = useState(INITIAL_WEATHER_LOGS);

  useEffect(() => {
    if (projectId) {
      getProjectNameById(projectId).then(setProjectName);
    }
  }, [projectId]);

  const handleSaveLog = (log: any) => {
    const exists = weatherLogs.some(l => l.id === log.id);
    setWeatherLogs(exists ? weatherLogs.map(l => l.id === log.id ? log : l) : [log, ...weatherLogs]);
    toast({ title: "Weather Recorded", description: `Log for ${log.date} has been saved.` });
  };

  const handleDeleteLog = (id: string) => {
    setWeatherLogs(weatherLogs.filter(l => l.id !== id));
    toast({ title: "Log Removed", description: "The weather record has been deleted.", variant: "destructive" });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'None': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
      case 'Minimal': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'Moderate': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'Significant': return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      case 'Work Stoppage': return 'bg-rose-100 text-rose-700 hover:bg-rose-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <>
      <PageTitle
        title={`Daily Weather Reports: ${projectName}`}
        description="Log and review daily weather conditions impacting project activities."
        actions={
          <div className="flex gap-2">
            <WeatherForm
              onSave={handleSaveLog}
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Log Weather
                </Button>
              }
            />
            <Button variant="outline" asChild>
              <Link href={`/projects/${projectId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project Details
              </Link>
            </Button>
          </div>
        }
      />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CloudSun className="mr-2 h-5 w-5 text-primary" />
            Weather Condition Log
          </CardTitle>
          <CardDescription>
            This section is for logging and viewing daily weather reports. Track temperature, precipitation, wind, and other conditions relevant to construction and site work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-32 font-bold text-slate-700">Date</TableHead>
                  <TableHead className="w-40 font-bold text-slate-700">Condition</TableHead>
                  <TableHead className="font-bold text-slate-700">Metrics</TableHead>
                  <TableHead className="w-40 font-bold text-slate-700">Site Impact</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weatherLogs.length > 0 ? (
                  weatherLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="font-medium text-slate-600">{log.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CloudSun className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-indigo-900">{log.condition}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                          <div className="flex items-center gap-1"><Thermometer className="h-3.5 w-3.5 text-rose-400" /> {log.temp}°C</div>
                          <div className="flex items-center gap-1"><Droplets className="h-3.5 w-3.5 text-blue-400" /> {log.humidity}%</div>
                          <div className="flex items-center gap-1"><Wind className="h-3.5 w-3.5 text-slate-400" /> {log.windSpeed} km/h</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-[10px] uppercase font-black px-2 py-0.5 border-none", getImpactColor(log.impact))}>
                          {log.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <WeatherForm
                              initialData={log}
                              onSave={handleSaveLog}
                              trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit Record
                                </DropdownMenuItem>
                              }
                            />
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Record
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete weather record?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the weather record for {log.date}. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteLog(log.id)}
                                    className="bg-destructive hover:bg-destructive/90 text-white"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-400 font-medium italic">
                      No weather reports recorded yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Operational Insight</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Consistent weather logging helps in identifying seasonal trends and potential schedule risks. Use the impact level to flag days where weather significantly hindered site work for delay claim documentation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
