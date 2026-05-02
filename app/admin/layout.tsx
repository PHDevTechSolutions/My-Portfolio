"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { onAuthChange, logOut, AuthUser } from "@/lib/auth-service";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setIsLoading(false);

      // Redirect to login if not authenticated and not already on login page
      if (!authUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If not authenticated and on login page, just show children (login form)
  if (!user && pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If not authenticated, don't render (will redirect)
  if (!user) {
    return null;
  }

  // Authenticated layout with header
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            {user.email && (
              <span className="text-sm text-muted-foreground">({user.email})</span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
