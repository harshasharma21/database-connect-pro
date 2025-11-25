import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, User, Phone, Mail, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { totalItems } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-3 md:gap-6">
              <a href="tel:+44123456789" className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-smooth">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">+44 123 456 789</span>
              </a>
              <a href="mailto:sales@cnfoods.com" className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-smooth">
                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">sales@cnfoods.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {user ? (
                <div className="flex items-center gap-1 md:gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/profile')}
                    className="text-primary-foreground hover:bg-primary-foreground/10 h-8 text-xs md:text-sm px-2 md:px-3"
                  >
                    <User className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                    <span className="hidden md:inline">My Profile</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-primary-foreground hover:bg-primary-foreground/10 h-8 text-xs md:text-sm px-2 md:px-3"
                  >
                    <LogOut className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                    <span className="hidden md:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="text-primary-foreground hover:bg-primary-foreground/10 h-8 text-xs md:text-sm px-2 md:px-3"
                >
                  <User className="h-3 w-3 md:h-4 md:w-4 md:mr-2" />
                  <span className="hidden md:inline">Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-xl md:text-2xl font-bold text-primary">CN Foods</div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, SKU, categories..."
                className="pl-10 pr-4 h-11 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10" asChild>
              <Link to="/liked">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-[10px] md:text-xs">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 pr-4 h-10 w-full text-sm"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 min-w-max md:min-w-0">
            <li>
              <Button variant="ghost" className="rounded-none h-10 md:h-12 text-sm whitespace-nowrap" asChild>
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="rounded-none h-10 md:h-12 text-sm whitespace-nowrap" asChild>
                <Link to="/shop">Shop</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="rounded-none h-10 md:h-12 text-sm whitespace-nowrap" asChild>
                <Link to="/fast-order">Fast Order</Link>
              </Button>
            </li>
            {!user && (
              <li>
                <Button variant="ghost" className="rounded-none h-10 md:h-12 text-sm whitespace-nowrap" asChild>
                  <Link to="/auth">Sign Up / Sign In</Link>
                </Button>
              </li>
            )}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-none h-10 md:h-12 text-sm whitespace-nowrap">
                    Get in Touch
                    <ChevronDown className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/contact-us" className="cursor-pointer">Contact Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer-services" className="cursor-pointer">Customer Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
