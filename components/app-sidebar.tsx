"use client"

import type * as React from "react"
import {
    BarChart3,
    Bell,
    BookOpen,
    Home,
    MessageSquare,
    Newspaper,
    PieChart,
    Settings,
    Star,
    TrendingUp,
    User,
    Wallet,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

// Navigation data
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Analytics",
            url: "#",
            icon: BarChart3,
            items: [
                {
                    title: "Market Trends",
                    url: "/dashboard/analytics",
                },
                /* The code snippet you provided is defining an item in the "Analytics" section of the
                main navigation. This specific item has a title of "Technical Indicators" and a URL
                of "/dashboard/technical". It represents a sub-item under the main "Analytics"
                section in the sidebar navigation. When this item is clicked or selected, it would
                likely navigate the user to the "/dashboard/technical" page within the application. */
                // {
                //     title: "Technical Indicators",
                //     url: "/dashboard/technical",
                // },
                // {
                //     title: "Fundamentals",
                //     url: "/dashboard/fundamentals",
                // },
            ],
        },
        {
            title: "Portfolio",
            url: "#",
            icon: PieChart,
            items: [
                {
                    title: "My Holdings",
                    url: "/dashboard/portfolio",
                },
                {
                    title: "Watchlist",
                    url: "/dashboard/watchlist",
                },
                // {
                //     title: "Performance",
                //     url: "/dashboard/performance",
                // },
            ],
        },
        // {
        //     title: "Market Data",
        //     url: "#",
        //     icon: TrendingUp,
        //     items: [
        //         {
        //             title: "Live Prices",
        //             url: "/dashboard/live-prices",
        //         },
        //         {
        //             title: "Market Summary",
        //             url: "/dashboard/market-summary",
        //         },
        //         {
        //             title: "Sector Analysis",
        //             url: "/dashboard/sectors",
        //         },
        //     ],
        // },
        // {
        //     title: "News & Insights",
        //     url: "/dashboard/news",
        //     icon: Newspaper,
        // },
        {
            title: "Sentiment Analysis",
            url: "/dashboard/sentiment",
            icon: MessageSquare,
        },
    ],
    navSecondary: [
        // {
        //     title: "Education Hub",
        //     url: "/education",
        //     icon: BookOpen,
        // },
        // {
        //     title: "Notifications",
        //     url: "/notifications",
        //     icon: Bell,
        // },
        // {
        //     title: "Settings",
        //     url: "/settings",
        //     icon: Settings,
        // },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout } = useAuth()
    const userFullName = user ? `${user.first_name} ${user.last_name}`.trim() : "Guest"
    const userInitials = user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() : "G"

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200" {...props}>
            <SidebarHeader className="border-b border-gray-200">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-white">
                                    <TrendingUp className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">NEPTREND</span>
                                    <span className="truncate text-xs">NEPSE Analytics</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.items ? (
                                        <>
                                            <SidebarMenuButton tooltip={item.title}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </>
                                    ) : (
                                        <SidebarMenuButton tooltip={item.title} isActive={item.isActive} asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Secondary Navigation */}
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Resources</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navSecondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Quick Actions */}
                <SidebarGroup>
                    <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="My Watchlist" asChild>
                                    <Link href="/dashboard/watchlist">
                                        <Star className="text-yellow-500" />
                                        <span>My Watchlist</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="Portfolio" asChild>
                                    <Link href="/dashboard/portfolio">
                                        <Wallet />
                                        <span>Portfolio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.avatar_url} alt={userFullName} />
                                        <AvatarFallback className="rounded-lg bg-green-600 text-white">{userInitials}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{userFullName}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <span className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
