"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Shield, CreditCard, Bell, Edit, Save, X } from "lucide-react"

interface UserProfile {
    name: string
    email: string
    phone: string
    location: string
    joinDate: string
    accountType: string
    avatar: string
}

interface PaymentHistory {
    id: string
    date: string
    description: string
    amount: number
    status: "completed" | "pending" | "failed"
}

const mockProfile: UserProfile = {
    name: "Khambu",
    email: "khambu@email.com",
    phone: "+977-980000000000",
    location: "Kathmandu, Nepal",
    joinDate: "January 2024",
    accountType: "Premium",
    avatar: "/placeholder.svg?height=100&width=100",
}

const mockPayments: PaymentHistory[] = [
    {
        id: "1",
        date: "2024-12-01",
        description: "Premium Subscription - Monthly",
        amount: 1500,
        status: "completed",
    },
    {
        id: "2",
        date: "2024-11-01",
        description: "Premium Subscription - Monthly",
        amount: 1500,
        status: "completed",
    },
    {
        id: "3",
        date: "2024-10-01",
        description: "Premium Subscription - Monthly",
        amount: 1500,
        status: "completed",
    },
]

export function ProfileContent() {
    const [profile, setProfile] = useState<UserProfile>(mockProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile)

    const handleEdit = () => {
        setIsEditing(true)
        setEditedProfile(profile)
    }

    const handleSave = () => {
        setProfile(editedProfile)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedProfile(profile)
        setIsEditing(false)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
            case "failed":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="bg-card border-border">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {profile.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                                <p className="text-muted-foreground">{profile.email}</p>
                                <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                                    {profile.accountType} Member
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isEditing ? handleCancel : handleEdit}
                            variant="outline"
                            className="border-border text-foreground hover:bg-accent bg-transparent"
                        >
                            {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-muted">
                    <TabsTrigger
                        value="personal"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Personal Info
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="billing"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Billing
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                    >
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-foreground">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            id="name"
                                            value={isEditing ? editedProfile.name : profile.name}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10 bg-background border-border text-foreground disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={isEditing ? editedProfile.email : profile.email}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10 bg-background border-border text-foreground disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-foreground">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            id="phone"
                                            value={isEditing ? editedProfile.phone : profile.phone}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10 bg-background border-border text-foreground disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-foreground">
                                        Location
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            id="location"
                                            value={isEditing ? editedProfile.location : profile.location}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                                            disabled={!isEditing}
                                            className="pl-10 bg-background border-border text-foreground disabled:opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Member since {profile.joinDate}</span>
                            </div>

                            {isEditing && (
                                <div className="flex space-x-4">
                                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        variant="outline"
                                        className="border-border text-foreground hover:bg-accent bg-transparent"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-foreground">
                                <Shield className="w-5 h-5 mr-2" />
                                Security Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">Password</h3>
                                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        Change Password
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        Enable 2FA
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">Login Sessions</h3>
                                        <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        View Sessions
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing">
                    <div className="space-y-6">
                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center text-foreground">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Billing Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                        <div>
                                            <h3 className="font-medium text-foreground">Current Plan</h3>
                                            <p className="text-sm text-muted-foreground">Premium Monthly - Rs. 1,500/month</p>
                                        </div>
                                        <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                            Change Plan
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                        <div>
                                            <h3 className="font-medium text-foreground">Payment Method</h3>
                                            <p className="text-sm text-muted-foreground">•••• •••• •••• 1234</p>
                                        </div>
                                        <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="text-foreground">Payment History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockPayments.map((payment) => (
                                        <div
                                            key={payment.id}
                                            className="flex items-center justify-between p-4 border border-border rounded-lg bg-background"
                                        >
                                            <div>
                                                <h3 className="font-medium text-foreground">{payment.description}</h3>
                                                <p className="text-sm text-muted-foreground">{payment.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-foreground">Rs. {payment.amount.toLocaleString()}</p>
                                                <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center text-foreground">
                                <Bell className="w-5 h-5 mr-2" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">Email Notifications</h3>
                                        <p className="text-sm text-muted-foreground">Receive market updates via email</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        Configure
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">Push Notifications</h3>
                                        <p className="text-sm text-muted-foreground">Get alerts on your device</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        Configure
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                                    <div>
                                        <h3 className="font-medium text-foreground">SMS Alerts</h3>
                                        <p className="text-sm text-muted-foreground">Important alerts via SMS</p>
                                    </div>
                                    <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                                        Configure
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
