"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mail, MapPin, Phone, Home, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
  status: string;
  phone: string;
  address: string;
  city: string;
  avatar: string | null;
  avatarPublicId?: string | null;
  authProvider: string;
  googleId?: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  user: UserProfile;
  /** Backend upload endpoint (PATCH/POST). Change to match your API. */
  uploadUrl?: string;
  /** FormData field name the backend expects. */
  fieldName?: string;
  method?: "POST" | "PATCH" | "PUT";
  /** Called with the updated avatar url after a successful upload. */
  onUploaded?: (avatarUrl: string | null) => void;
};

const MAX_SIZE_MB = 5;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const label = (v: string) =>
  v
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

function InfoRow({
  icon: Icon,
  name,
  children,
}: {
  icon: React.ElementType;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{name}</p>
        <p className="text-sm font-medium wrap-break-words">{children}</p>
      </div>
    </div>
  );
}

export default function ProfileComponent({
  user,
  uploadUrl = "/api/users/avatar",
  fieldName = "file",
  method = "PATCH",
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(user.avatar);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB} MB.`);
      return;
    }

    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(fieldName, file);

      const res = await fetch(uploadUrl, {
        method,
        body: formData, // don't set Content-Type; the browser adds the boundary
        credentials: "include",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Upload failed. Please try again.");
      }

      const body = await res.json().catch(() => null);
      // Adjust to your response shape
      const newUrl: string | null = body?.data?.avatar ?? preview;

      setAvatar(newUrl);
      onUploaded?.(newUrl);
      handleCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={preview ?? avatar ?? undefined} alt={user.name} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
          >
            <Camera className="h-4 w-4" />
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSelect}
          />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="secondary">{label(user.role)}</Badge>
            <Badge
              variant="outline"
              className={cn(
                user.status === "ACTIVE"
                  ? "border-green-200 bg-green-100 text-green-800"
                  : "border-red-200 bg-red-100 text-red-800",
              )}
            >
              {label(user.status)}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                user.emailVerified
                  ? "border-green-200 bg-green-100 text-green-800"
                  : "border-amber-200 bg-amber-100 text-amber-800",
              )}
            >
              {user.emailVerified ? "Email verified" : "Email not verified"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {(file || error) && (
        <div className="mx-6 mb-4 space-y-3 rounded-lg border bg-muted/40 p-3">
          {file && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="min-w-0 truncate text-sm">{file.name}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Save photo"}
                </Button>
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      )}

      <Separator />

      <CardContent className="grid grid-cols-1 gap-5 pt-6 sm:grid-cols-2">
        <InfoRow icon={Mail} name="Email">
          {user.email}
        </InfoRow>
        <InfoRow icon={Phone} name="Phone">
          {user.phone}
        </InfoRow>
        <InfoRow icon={Home} name="Address">
          {user.address}
        </InfoRow>
        <InfoRow icon={MapPin} name="City">
          {user.city}
        </InfoRow>
        <InfoRow icon={CalendarDays} name="Member since">
          {formatDate(user.createdAt)}
        </InfoRow>
        <InfoRow icon={CalendarDays} name="Last updated">
          {formatDate(user.updatedAt)}
        </InfoRow>
      </CardContent>
    </Card>
  );
}
