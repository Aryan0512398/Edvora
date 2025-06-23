"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Book,
  BookA,
  CompassIcon,
  LayoutDashboardIcon,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCardsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";

export function AppSidebar() {
  const SidebarOptions = [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      path: "/workspace",
    },
    {
      title: "My Learning",
      icon: Book,
      path: "/workspace/my-learning",
    },
    {
      title: "Explore Courses",
      icon: CompassIcon,
      path: "/workspace/explore",
    },
    {
      title: "AI Tools",
      icon: PencilRulerIcon,
      path: "/workspace/ai-tools",
    },
    {
      title: "Billing",
      icon: WalletCardsIcon,
      path: "/workspace/billing",
    },
    {
      title: "Profile",
      icon: UserCircle2Icon,
      path: "/workspace/profile",
    },
  ];
  const path = usePathname();
  const router=useRouter()
  return (
    <Sidebar>
      <SidebarHeader className={"p-4 "} onClick={()=> router.push("/")}>
        <Image src={"/logo.svg"} alt="logo" className="cursor-pointer" width={130} height={140}></Image>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button className={"cursor-pointer"}>Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={"p-5"}>
                    <Link
                      href={item.path}
                      className={`text-[17px] ${path === item.path ? "text-primary bg-purple-50" : ""}`}
                    >
                      <item.icon className="w-7 h-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
