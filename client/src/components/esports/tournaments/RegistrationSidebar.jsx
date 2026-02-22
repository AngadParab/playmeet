import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Trophy, User, Users, Monitor, Hash, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const RegistrationSidebar = ({ open, onOpenChange, tournament, userProfile, onConfirm }) => {
    const [teamName, setTeamName] = useState("");

    if (!tournament) return null;

    const hasEsportsProfile = !!userProfile;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="border-l border-purple-500/20 bg-black/95 text-white sm:max-w-md backdrop-blur-xl">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Tournament Registration
                    </SheetTitle>
                    <SheetDescription className="text-gray-400">
                        You are registering for <span className="text-white font-semibold">{tournament.name}</span>.
                    </SheetDescription>
                </SheetHeader>

                {!hasEsportsProfile ? (
                    <div className="space-y-6">
                        <Alert variant="destructive" className="bg-red-900/20 border-red-500/50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Profile Missing</AlertTitle>
                            <AlertDescription>
                                You need to set up your Esports Profile (Gamertag, Rank, etc.) before joining tournaments.
                            </AlertDescription>
                        </Alert>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Create Esports Profile
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* User Info Card */}
                        <div className="p-4 rounded-xl bg-purple-900/10 border border-purple-500/20 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/20">
                                    <User className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Gamertag</p>
                                    <p className="font-bold text-white">{userProfile.gamertag}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/20">
                                    <Monitor className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Platform & Region</p>
                                    <p className="font-bold text-white">{userProfile.platform} • {userProfile.region}</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Name Input (if needed) */}
                        <div className="space-y-2">
                            <Label htmlFor="teamName" className="text-gray-300">Team Name (Optional for Solo)</Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <Input
                                    id="teamName"
                                    placeholder="Enter your team name..."
                                    className="pl-9 bg-gray-900/50 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Rules & Confirmation */}
                        <div className="p-4 rounded-lg bg-gray-900/50 text-xs text-gray-400 space-y-2">
                            <p>By registering, you agree to:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>The tournament rules and guidelines.</li>
                                <li>Being present 15 minutes before match start.</li>
                                <li>Allowing result data to be public.</li>
                            </ul>
                        </div>
                    </div>
                )}

                <SheetFooter className="mt-8">
                    <Button
                        onClick={() => onConfirm(teamName)}
                        disabled={!hasEsportsProfile}
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold h-12 shadow-lg shadow-purple-900/25"
                    >
                        Confirm Registration
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default RegistrationSidebar;
