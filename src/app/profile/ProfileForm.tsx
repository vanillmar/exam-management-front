"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ProfilePictureUploader from "@/components/profile/profile-picture-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Calendar22 } from "@/components/Calendar22";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UUID } from "@/types/user";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { getUserProfile } from "@/services/profile";

type Props = {
  userId: string;
  currentImage?: string;
  username?: string;
  email?: string;
};

const fetcher = async (userId: UUID) => {
  const res = await getUserProfile(userId);
  return res;
};


export default function ProfileForm({ userId, currentImage, username, email }: Readonly<Props>) {
  const { data, error, mutate } = useSWR(userId ? ["user", userId] : null,
    () => fetcher(userId),  
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const [form, setForm] = useState({
    id: userId || "",
    username: username || "",
    email: email || "",
    firstName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    birthDate: "",
    nationalId: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    emergencyContactPhone: "",
    bio: "",
    notifications: false,
  });

  useEffect(() => {
    if (data) {
      // Map server keys to local form fields safely
      setForm((prev) => ({
        ...prev,
        id: data.userRes.id ?? prev.id,
        username: data.userRes.username ?? prev.username,
        email: data.userRes.email ?? prev.email,
        // firstName: data.firstName ?? data.first_name ?? prev.firstName,
        // lastName: data.lastName ?? data.last_name ?? prev.lastName,
        // gender: data.gender ?? prev.gender,
        // maritalStatus: data.maritalStatus ?? data.marital_status ?? prev.maritalStatus,
        // birthDate: data.birthDate ?? data.birth_date ?? prev.birthDate,
        // nationalId: data.nationalId ?? data.national_id ?? prev.nationalId,
        // street: data.street ?? prev.street,
        // city: data.city ?? prev.city,
        // state: data.state ?? prev.state,
        // zipCode: data.zipCode ?? data.zip_code ?? prev.zipCode,
        // phoneNumber: data.phoneNumber ?? data.phone_number ?? prev.phoneNumber,
        // emergencyContactPhone: data.emergencyContactPhone ?? data.emergency_contact_phone ?? prev.emergencyContactPhone,
        // bio: data.bio ?? prev.bio,
        // notifications: !!data.notifications,
      }));
    }
  }, [data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const onSave = async () => {
    try {
      // create payload without id
      const payloadBody: Record<string, unknown> = { ...form };
      delete payloadBody.id;

      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const updated = await res.json();
      mutate(updated, { revalidate: true });
      // use alert as a simple fallback for notifications so no extra dependency is required
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert((err as Error).message || "Update failed");
    }
  };

  if (error){
    return (<div className="text-red-500">Failed to load profile. ${}</div>);
  }


  const isLoading = !data && !error;

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar */}
          <ProfilePictureUploader userId={userId} username={form.username} currentImage={currentImage} />

          {/* ID */}
          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <Label htmlFor="id">ID</Label>
              <Input id="id" placeholder="Your user Id" value={form.id} disabled />
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Your username" value={form.username} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <InputGroup>
                <InputGroupInput id="email" placeholder="Your email address" value={form.email} onChange={onChange} />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        size="icon-xs"
                      >
                        <HelpCircle />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>We&apos;ll use this to send you notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* FirstName and LastName */}
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Your first name" value={form.firstName} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Your last name" value={form.lastName} onChange={onChange} />
            </div>

            {/* Gender and Marital Status */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger className="w-70">
                  <SelectValue id="gender" placeholder="Your gender">{form.gender || undefined}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select>
                <SelectTrigger className="w-70">
                  <SelectValue id="maritalStatus" placeholder="Your marital status">{form.maritalStatus || undefined}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BirthDate NationaID */}
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Calendar22 />
            </div>
            <div>
              <Label htmlFor="nationalId">National Id</Label>
              <Input id="nationalId" placeholder="National Id" value={form.nationalId} onChange={onChange} />
            </div>
          </div>

          {/* Address*/}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="street">Street</Label>
              <Input id="street" placeholder="Your street" value={form.street} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Your city" value={form.city} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Your state" value={form.state} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip code</Label>
              <Input id="zipCode" placeholder="Your zip code" value={form.zipCode} onChange={onChange} />
            </div>
          </div>

          {/* Contacts*/}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="Your phone number" value={form.phoneNumber} onChange={onChange} />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" placeholder="Emergency contact phone" value={form.emergencyContactPhone} onChange={onChange} />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us something about you..." value={form.bio} onChange={onChange} />
          </div>

          <Separator />

          {/* Preferences */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch id="notifications" checked={form.notifications} onCheckedChange={(v) => setForm((f) => ({ ...f, notifications: !!v }))} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => { /* reset to server */ mutate(); }}>Cancel</Button>
          <Button onClick={onSave} disabled={isLoading}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Once you delete your account, there is no going back.</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </>
  );
}
