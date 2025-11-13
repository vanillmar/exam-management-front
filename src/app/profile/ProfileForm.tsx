"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ProfilePictureUploader from "@/components/profile/profile-picture-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UUID } from "@/types/user";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/services/profile";
import { Profile } from "@/types/profile";
import { convertToProfile } from "@/lib/utils";
import Calendar22 from "@/components/calendar-22";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default function ProfileForm({
  userId,
  currentImage,
  username,
  email,
}: Readonly<Props>) {
  const [confirmText, setConfirmText] = React.useState("");
  const requiredText = "delete";
  const isConfirmed = confirmText === requiredText;

  const { data, error, mutate } = useSWR(
    userId ? ["user", userId] : null,
    () => fetcher(userId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  const [form, setForm] = useState({
    userId: userId || "",
    username: username || "",
    email: email || "",
    personId: 0,
    firstName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    birthDate: "",
    nationalId: "",
    addressId: 0,
    primaryAddress: true,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    contactId: 0,
    primaryContact: true,
    phoneNumber: "",
    alternativeEmail: "",
    emergencyContactPhone: "",
    bio: "",
    notifications: false,
  });

  useEffect(() => {
    if (data) {
      // Map server keys to local form fields safely
      console.log(data);
      setForm((prev) => ({
        ...prev,
        userId: data.user.id ?? prev.userId,
        username: data.user.username ?? prev.username,
        email: data.user.email ?? prev.email,
        personId: data.person.id,
        firstName: data.person.firstName ?? prev.firstName,
        lastName: data.person.lastName ?? prev.lastName,
        gender: data.person.gender ?? prev.gender,
        maritalStatus: data.person.maritalStatus ?? prev.maritalStatus,
        birthDate: data.person.birthDate ?? prev.birthDate,
        nationalId: data.person.nationalId ?? prev.nationalId,
        addressId: data.address.id,
        primaryAddress: data.address.primary ?? prev.primaryAddress,
        street: data.address.street ?? prev.street,
        city: data.address.city ?? prev.city,
        state: data.address.state ?? prev.state,
        zipCode: data.address.zipCode ?? prev.zipCode,
        contactId: data.contact.id,
        primaryContact: data.contact.primary ?? prev.primaryContact,
        phoneNumber: data.contact.phoneNumber ?? prev.phoneNumber,
        emergencyContactPhone:
          data.contact.emergencyContactPhone ?? prev.emergencyContactPhone,
        bio: data.person.bio ?? prev.bio,
        notifications: data.user.notifications ?? prev.notifications,
      }));
    }
  }, [data]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { id: string; value: unknown } },
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const onSave = async () => {
    try {
      // create payload without id
      const data: Profile = convertToProfile(form);
      console.log("Profile", data);
      const response = await updateUserProfile(userId, data);
      mutate(response, { revalidate: true });
      toast.info("Profile updated");
    } catch (err) {
      toast.error((err as Error).message || "Update failed");
    }
  };

  const onDelete = () => {
    if (isConfirmed) {
      // Perform the delete action (e.g., API call)
      console.log("Deletion confirmed and executed!");
      // Close the dialog manually if needed (DialogClose helps with this)
      // You might also want to reset the input state after successful deletion
      setConfirmText("");
    }
  };

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load profile. {error.message}
      </div>
    );
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
          <ProfilePictureUploader
            userId={userId}
            username={form.username}
            currentImage={currentImage}
          />

          {/* ID */}
          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                placeholder="Your user Id"
                value={form.userId}
                disabled
              />
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Your username"
                value={form.username}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={onChange}
                />
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
              <Input
                id="firstName"
                placeholder="Your first name"
                value={form.firstName}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Your last name"
                value={form.lastName}
                onChange={onChange}
              />
            </div>

            {/* Gender and Marital Status */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={form.gender}
                defaultValue={form.gender}
                onValueChange={(v: string) =>
                  setForm((f) => ({ ...f, gender: v }))
                }
              >
                <SelectTrigger className="w-70">
                  <SelectValue id="gender" placeholder="Your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={form.maritalStatus}
                defaultValue={form.maritalStatus}
                onValueChange={(v: string) =>
                  setForm((f) => ({ ...f, maritalStatus: v }))
                }
              >
                <SelectTrigger className="w-70">
                  <SelectValue
                    id="maritalStatus"
                    placeholder="Your marital status"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SINGLE">Single</SelectItem>
                  <SelectItem value="MARRIED">Married</SelectItem>
                  <SelectItem value="DIVORCED">Divorced</SelectItem>
                  <SelectItem value="WIDOWED">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BirthDate NationaID */}
            <div>
              <Label htmlFor="birthDate" className="px-1">
                Date of birth
              </Label>
              <Calendar22
                id="birthDate"
                value={new Date(form.birthDate)}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="nationalId">National Id</Label>
              <Input
                id="nationalId"
                placeholder="National Id"
                value={form.nationalId}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Address*/}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                placeholder="Your street"
                value={form.street}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Your city"
                value={form.city}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Your state"
                value={form.state}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip code</Label>
              <Input
                id="zipCode"
                placeholder="Your zip code"
                value={form.zipCode}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Contacts*/}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="Your phone number"
                value={form.phoneNumber}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">
                Emergency Contact Phone
              </Label>
              <Input
                id="emergencyContactPhone"
                placeholder="Emergency contact phone"
                value={form.emergencyContactPhone}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us something about you..."
              value={form.bio}
              onChange={onChange}
            />
          </div>

          <Separator />

          {/* Preferences */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch
              id="notifications"
              checked={form.notifications}
              onCheckedChange={(v) =>
                setForm((f) => ({ ...f, notifications: !!v }))
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              /* reset to server */ mutate();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <h2 className="text-xl font-semibold text-destructive">
            Danger Zone
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete profile</DialogTitle>
                <DialogDescription>
                  Write delete in the inputbox. Click delete when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex grid-cols-4 items-center gap-4">
                  <Input
                    id="deleteInput"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={`Type "${requiredText}"`}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                  disabled={!isConfirmed}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
}
