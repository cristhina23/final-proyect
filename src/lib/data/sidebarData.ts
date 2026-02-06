// lib/data/sidebarData.ts
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  HandHeart,
  
  Settings,
  
  MoreHorizontal,
  
  CreditCard,
  BarChart3,
  Star,
  Scissors,
  Wallet,
  Calendar,
  CalendarPlus,
  Heart,
  ClipboardList,
  User
} from "lucide-svelte";
import type { ComponentType } from "svelte";

import type { UserRole } from "$lib/types/role";

export type SidebarItem = {
  label: string;
  route?: string;
  icon: ComponentType;
  mobile?: boolean;
  primary?: boolean;
  desktop?: boolean;
  modal?: boolean;
};

export const sidebarData: Record<UserRole, SidebarItem[]> = {
  ADMIN: [
    {
      label: "Overview",
      route: "/dashboard",
      icon: LayoutDashboard,
      desktop: true,
      mobile: true
    },
    {
      label: "Staff",
      route: "/dashboard/admin/staff",
      icon: Users,
      desktop: true,
      mobile: true
    },
    {
      label: "Schedule",
      route: "/dashboard/admin/schedule",
      icon: CalendarCheck,
      desktop: true,
      mobile: true
    },
    {
      label: "Services",
      route: "/dashboard/admin/services",
      icon: HandHeart,
      desktop: true,
      mobile: false
    },
    {
      label: "Payments",
      route: "/dashboard/admin/payments",
      icon: CreditCard,
      desktop: true,
      mobile: true
    },
    {
      label: "Reports",
      route: "/dashboard/admin/reports",
      icon: BarChart3,
      desktop: true,
      mobile: false
    },
    {
      label: "Settings",
      route: "/dashboard/admin/settings",
      icon: Settings,
      desktop: true,
      mobile: false
    },
    {
      label: "More",
      icon: MoreHorizontal,
      mobile: true,
      modal: true
    }
  ],

  STYLIST: [
  {
    label: "Overview",
    route: "/dashboard",
    icon: LayoutDashboard,
    desktop: true,
    mobile: true
  },
  {
    label: "My Schedule",
    route: "/dashboard/stylist/my-schedule",
    icon: Calendar,
    desktop: true,
    mobile: true
  },
  {
    label: "Appointments",
    route: "/dashboard/stylist/appointments",
    icon: ClipboardList,
    desktop: true,
    mobile: true
  },
  {
    label: "Earnings",
    route: "/dashboard/stylist/earnings",
    icon: Wallet,
    desktop: true,
    mobile: false
  },
  {
    label: "My Services",
    route: "/dashboard/stylist/services",
    icon: Scissors,
    desktop: true,
    mobile: false
  },
  {
    label: "Reviews",
    route: "/dashboard/stylist/reviews",
    icon: Star,
    desktop: true,
    mobile: false
  },
  {
    label: "Profile",
    route: "/dashboard/stylist/profile",
    icon: User,
    desktop: true,
    mobile: false
  },
  {
    label: "More",
    icon: MoreHorizontal,
    mobile: true,
    modal: true
  }
],

  CLIENT: [
    {
      label: "Overview",
      route: "/dashboard",
      icon: LayoutDashboard,
      desktop: true,
      mobile: true
    },
    {
      label: "Book",
      route: "/dashboard/user/book",
      icon: CalendarPlus,
      desktop: true,
      mobile: true
    },
    {
      label: "Appointments",
      route: "/dashboard/user/my-appointments",
      icon: CalendarCheck,
      desktop: true,
      mobile: true
    },
    {
      label: "Payments",
      route: "/dashboard/user/payments",
      icon: CreditCard,
      desktop: true,
      mobile: false
    },
    {
      label: "Reviews",
      route: "/dashboard/user/reviews",
      icon: Star,
      desktop: true,
      mobile: false
    },
    {
      label: "Preferences",
      route: "/dashboard/user/preferences",
      icon: Heart,
      desktop: true,
      mobile: false
    },
    {
      label: "Profile",
      route: "/dashboard/user/profile",
      icon: User,
      desktop: true,
      mobile: true
    },
    {
      label: "More",
      icon: MoreHorizontal,
      mobile: true,
      modal: true
    }
  ]

};
