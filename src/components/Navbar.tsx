
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Bell, MessageCircle, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-anime-purple to-anime-magenta flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-anime-purple to-anime-magenta bg-clip-text text-transparent">
              AnimeAvatars
            </span>
          </Link>
        </div>

        <div className="hidden md:flex relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search avatars..."
            className="pl-10 bg-muted/50 border-muted focus-visible:ring-anime-purple"
          />
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/explore" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors">
              Explore
            </Link>
            <Link to="/create" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors">
              Create
            </Link>
            <Link to="/chat" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors">
              Chat
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-anime-magenta"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-anime-purple to-anime-magenta flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
