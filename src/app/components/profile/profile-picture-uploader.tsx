"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { getCroppedImg } from "@/lib/cropImage";
import Image from "next/image";
import { updateAvatar } from "@/services/user";
import { useSession } from "next-auth/react";

export default function ProfilePictureUploader({ currentImage, userId }: Readonly<{ currentImage?: string; userId: string }>) {
   const { update } = useSession();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const uploadCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setUploading(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append("file", croppedBlob, "profile.jpg");

      const data = await updateAvatar(userId, formData);
      // 👇 Update avatar in NextAuth session
      await update({ avatar: data.url });
      setPreview(data.url);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="w-40 h-40 overflow-hidden rounded-full mx-auto">
        <CardContent className="p-0">
          <Image src={preview} alt="Profile" width={160} height={160} className="object-cover w-full h-full" />
        </CardContent>
      </Card>

      <div className="text-center">
        <input id="file-input" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        <Button asChild>
          <label htmlFor="file-input">Upload Photo</label>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crop your photo</DialogTitle>
          </DialogHeader>

          {imageSrc && (
            <div className="relative w-full h-80 bg-muted rounded-md overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-4 mt-4">
            <span className="text-sm text-muted-foreground">Zoom</span>
            <Slider value={[zoom]} onValueChange={(v) => setZoom(v[0])} min={1} max={3} step={0.1} className="w-2/3" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={uploadCroppedImage} disabled={uploading}>
              {uploading ? "Uploading..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
