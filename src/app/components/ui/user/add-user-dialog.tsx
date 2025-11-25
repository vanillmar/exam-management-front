import React, { useState } from 'react';
import useSWR from 'swr';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming shadcn has Skeleton component
import { Alert, AlertDescription } from "@/components/ui/alert"; // For error handling
import { User } from "@/types/user"; 
import { Role } from "@/types/role";
import { Switch } from "@/components/ui//switch";
import { getRoles } from '@/services/roles';
import { PasswordInput } from '@/components/ui/user/password-input';

// Fetcher function for SWR
const fetcher = async () => {
    const res = await getRoles();
    return res.data;
};
interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (newUser: Omit<User, 'id' | 'BaseAuditableEntity'>) => void; // Omit auto-generated fields
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose, onAddUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

  // Fetch roles using SWR
  const { data: roles, error, isLoading: isRolesLoading } = useSWR<Role[]>('getRoles', fetcher);

  const handleRoleToggle = (roleId: number, checked: boolean) => {
    setSelectedRoleIds(prev =>
      checked ? [...prev, roleId] : prev.filter(id => id !== roleId)
    );
  };

  const handleSubmit = () => {
    const selectedRoles = roles?.filter(role => selectedRoleIds.includes(role.id)) || [];
    const newUser = {
      username,
      email,
      password,
      roles: selectedRoles,
      notifications,
      avatar,
    };
    onAddUser(newUser);
    onClose();
    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
    setNotifications(false);
    setAvatar(null);
    setSelectedRoleIds([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
                Password
            </Label>
            <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Roles</Label>
            <div className="col-span-3 space-y-2">
              {isRolesLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertDescription>Error loading roles: {error.message}</AlertDescription>
                </Alert>
              ) : roles && roles.length > 0 ? (
                roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role.id}`}
                      checked={selectedRoleIds.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleToggle(role.id, checked as boolean)}
                    />
                    <Label htmlFor={`role-${role.id}`}>
                      {role.name} {role.description ? `(${role.description})` : ''}
                    </Label>
                  </div>
                ))
              ) : (
                <p>No roles available.</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Notifications</Label>
            <Switch
              checked={notifications}
              onCheckedChange={(checked) => setNotifications(checked)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar URL (optional)
            </Label>
            <Input
              id="avatar"
              value={avatar || ''}
              onChange={(e) => setAvatar(e.target.value || null)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!username || !email || isRolesLoading}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;