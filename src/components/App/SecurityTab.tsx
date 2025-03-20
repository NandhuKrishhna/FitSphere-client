import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import useUpdatePassword from "@/hooks/App/useUpdatePassword";
import toast from "react-hot-toast";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecurityTab: React.FC = () => {
  const { handleUpdatePassword, isUpdatingPassword } = useUpdatePassword();
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordUpdate = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    handleUpdatePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
    
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Password Update</CardTitle>
        <CardDescription className="text-gray-400">Change your account password</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PasswordField
            id="currentPassword"
            label="Current Password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          />

          <PasswordField
            id="newPassword"
            label="New Password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
          />

          <Button
            onClick={handlePasswordUpdate}
            disabled={
              !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword
            }
            className="w-full"
          >
            {isUpdatingPassword ? <Loader className="animate-spin mr-2" size={15} /> : null}
            Update Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ id, label, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={id} className="text-gray-300">
        {label}
      </Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700 text-white"
      />
    </div>
  );
};

export default SecurityTab;