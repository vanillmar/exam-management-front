import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Star,
  Trash2,
  Plus,
  User as UserIcon,
  MapPin,
  Phone,
} from "lucide-react";
import User from "@/types/user";
import type { Person } from "@/types/person";
import { Address } from "@/types/address";
import { Contact } from "@/types/contact";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateUser: (newUser: User) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  onCreateUser,
}) => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    notifications: true,
    avatar: null,
    active: true,
    enabled: true,
    roles: [],
  });

  const [person, setPerson] = useState<Person>({
    firstName: "",
    lastName: "",
    gender: "MALE",
    dateOfBirth: "",
    maritalStatus: "SINGLE",
    nationalId: "",
    bio: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: Date.now(),
      street: "",
      city: "",
      state: "",
      zipCode: "",
      primary: true,
    },
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: Date.now(),
      phoneNumber: "",
      email: "",
      alternateEmail: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      primary: true,
    },
  ]);

  const addAddress = () => {
    const newId = Date.now();
    setAddresses([
      ...addresses,
      {
        id: newId,
        street: "",
        city: "",
        state: "",
        zipCode: "",
        primary: false,
      },
    ]);
  };

  const removeAddress = (id: number) => {
    if (addresses.length > 1) {
      const newAddresses = addresses.filter((a) => a.id !== id);
      const removedWasPrimary = addresses.find((a) => a.id === id)?.primary;

      if (removedWasPrimary && newAddresses.length > 0) {
        newAddresses[0].primary = true;
      }

      setAddresses(newAddresses);
    }
  };

  const setPrimaryAddress = (id: number) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        primary: a.id === id,
      })),
    );
  };

  const updateAddress = (id: number, field: string, value: unknown) => {
    setAddresses(
      addresses.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );
  };

  const addContact = () => {
    const newId = Date.now();
    setContacts([
      ...contacts,
      {
        id: newId,
        phoneNumber: "",
        email: "",
        alternateEmail: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        primary: false,
      },
    ]);
  };

  const removeContact = (id: number) => {
    if (contacts.length > 1) {
      const newContacts = contacts.filter((c) => c.id !== id);
      const removedWasPrimary = contacts.find((c) => c.id === id)?.primary;

      if (removedWasPrimary && newContacts.length > 0) {
        newContacts[0].primary = true;
      }

      setContacts(newContacts);
    }
  };

  const setPrimaryContact = (id: number) => {
    setContacts(
      contacts.map((c) => ({
        ...c,
        primary: c.id === id,
      })),
    );
  };

  const updateContact = (id: number, field: string, value: unknown) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New User</DialogTitle>
          <DialogDescription>
            Add a new user with complete personal information, addresses, and
            contacts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Account Information */}
          <Card className="border-slate-200">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                  <CardDescription>
                    User credentials and settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    placeholder="johndoe"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={user.avatar || ""}
                    onChange={(e) =>
                      setUser({ ...user, avatar: e.target.value })
                    }
                    placeholder="https://..."
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="notifications"
                    checked={user.notifications}
                    onCheckedChange={(checked) =>
                      setUser({ ...user, notifications: checked })
                    }
                  />
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Enable Notifications
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="active"
                    checked={user.active}
                    onCheckedChange={(checked) =>
                      setUser({ ...user, active: checked })
                    }
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    Active
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="enabled"
                    checked={user.enabled}
                    onCheckedChange={(checked) =>
                      setUser({ ...user, enabled: checked })
                    }
                  />
                  <Label htmlFor="enabled" className="cursor-pointer">
                    Enabled
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-slate-200">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                  <CardDescription>Detailed personal data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={person.firstName}
                    onChange={(e) =>
                      setPerson({ ...person, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={person.lastName}
                    onChange={(e) =>
                      setPerson({ ...person, lastName: e.target.value })
                    }
                    placeholder="Doe"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={person.gender || ""}
                    onValueChange={(value) =>
                      setPerson({ ...person, gender: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select gender" />
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
                    value={person.maritalStatus || ""}
                    onValueChange={(value) =>
                      setPerson({ ...person, maritalStatus: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE">Single</SelectItem>
                      <SelectItem value="MARRIED">Married</SelectItem>
                      <SelectItem value="DIVORCED">Divorced</SelectItem>
                      <SelectItem value="WIDOWED">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={person.dateOfBirth}
                    onChange={(e) =>
                      setPerson({ ...person, dateOfBirth: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input
                    id="nationalId"
                    value={person.nationalId || ""}
                    onChange={(e) =>
                      setPerson({ ...person, nationalId: e.target.value })
                    }
                    placeholder="123456789"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="personBio">Bio</Label>
                <Textarea
                  id="personBio"
                  value={person.bio || ""}
                  onChange={(e) =>
                    setPerson({ ...person, bio: e.target.value })
                  }
                  placeholder="Personal bio..."
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card className="border-slate-200">
            <CardHeader className=" border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Addresses</CardTitle>
                    <CardDescription>Physical addresses</CardDescription>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={addAddress}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      address.primary
                        ? "border-emerald-300"
                        : "border-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-600">
                          Address {index + 1}
                        </span>
                        {address.primary && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-600 text-xs">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {!address.primary && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setPrimaryAddress(address.id)}
                            className="h-8 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Set Primary
                          </Button>
                        )}
                        {addresses.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAddress(address.id)}
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <Label className="text-xs">Street Address</Label>
                        <Input
                          value={address.street || ""}
                          onChange={(e) =>
                            updateAddress(address.id, "street", e.target.value)
                          }
                          placeholder="123 Main Street"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">City</Label>
                        <Input
                          value={address.city || ""}
                          onChange={(e) =>
                            updateAddress(address.id, "city", e.target.value)
                          }
                          placeholder="New York"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">State</Label>
                          <Input
                            value={address.state || ""}
                            onChange={(e) =>
                              updateAddress(address.id, "state", e.target.value)
                            }
                            placeholder="NY"
                            className="mt-1 h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">ZIP</Label>
                          <Input
                            value={address.zipCode || ""}
                            onChange={(e) =>
                              updateAddress(
                                address.id,
                                "zipCode",
                                e.target.value,
                              )
                            }
                            placeholder="10001"
                            className="mt-1 h-9"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <Card className="border-slate-200">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Contacts</CardTitle>
                    <CardDescription>
                      Phone numbers and email addresses
                    </CardDescription>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={addContact}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      contact.primary
                        ? "border-orange-300"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-600">
                          Contact {index + 1}
                        </span>
                        {contact.primary && (
                          <Badge className="bg-orange-600 hover:bg-orange-600 text-xs">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {!contact.primary && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setPrimaryContact(contact.id)}
                            className="h-8 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Set Primary
                          </Button>
                        )}
                        {contacts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeContact(contact.id)}
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Phone Number *</Label>
                        <Input
                          value={contact.phoneNumber}
                          onChange={(e) =>
                            updateContact(
                              contact.id,
                              "phoneNumber",
                              e.target.value,
                            )
                          }
                          placeholder="+1 (555) 123-4567"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Email *</Label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            updateContact(contact.id, "email", e.target.value)
                          }
                          placeholder="contact@example.com"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Alternate Email</Label>
                        <Input
                          type="email"
                          value={contact.alternateEmail || ""}
                          onChange={(e) =>
                            updateContact(
                              contact.id,
                              "alternateEmail",
                              e.target.value,
                            )
                          }
                          placeholder="alternate@example.com"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">
                          Emergency Contact Name
                        </Label>
                        <Input
                          value={contact.emergencyContactName || ""}
                          onChange={(e) =>
                            updateContact(
                              contact.id,
                              "emergencyContactName",
                              e.target.value,
                            )
                          }
                          placeholder="Jane Doe"
                          className="mt-1 h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">
                          Emergency Contact Phone
                        </Label>
                        <Input
                          value={contact.emergencyContactPhone || ""}
                          onChange={(e) =>
                            updateContact(
                              contact.id,
                              "emergencyContactPhone",
                              e.target.value,
                            )
                          }
                          placeholder="+1 (555) 987-6543"
                          className="mt-1 h-9"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              const userToSave: User = {
                ...user,
                personId: person.id,
                person: {
                  ...person,
                  addresses: addresses,
                  contacts: contacts,
                },
              };
              onCreateUser(userToSave);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
