"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package2,
  Settings,
  UserRoundPen,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "لوحة التحكم",
    href: "/dashboard",
    logo: <Home className="h-5 w-5" />,
  },
  {
    name: "الأساتذة",
    href: "/dashboard/teacher",
    logo: <UserRoundPen className="h-5 w-5" />,
  },
  {
    name: "الطلبة",
    href: "/dashboard/student",
    logo: <Users2 className="h-5 w-5" />,
  },
  {
    name: "",
    href: "/dashboard/statistics",
    logo: <LineChart className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const path = usePathname();

  //   const activeLink = path.sli;
  console.log(path);
  return (
    <aside className="fixed inset-y-0 right-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {links.map((link, index) => {
          const activeLink = path.endsWith(link.href);
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={`${
                    activeLink && "bg-accent"
                  } flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                >
                  {link.logo}
                  <span className="sr-only">{link.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.name}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
