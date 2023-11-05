"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/components/ui/use-toast";
import { ProjectImage } from "@/models/project";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrashIcon } from "@radix-ui/react-icons";

export default function ProjectImages({ projectId }) {
  const supabase = createClientComponentClient();
  const inputRef = useRef();
  const [trigger, setTrigger] = useState();
  // const [images, setImages] = useState();

  useEffect(() => {
    async function getImages() {
      const { data: imageData } = await supabase
        .from("project_images")
        .select("*")
        .order("created_at", { ascending: true })
        .eq("project_id", projectId);
      const imageDataWithLinks = await Promise.all(
        imageData.map(async (img) => {
          const { path } = img;
          const { data } = await supabase.storage
            .from("images")
            .createSignedUrl(path, 3600);
          return {
            ...img,
            url: data.signedUrl,
          };
        })
      );

      setImages(ProjectImage.fromAll(imageDataWithLinks));
    }
    getImages();
  }, [trigger]);

  const triggerUpload = () => {
    inputRef.current.click();
  };
  const handleUpload = async (e) => {
    const [file] = e.target.files;
    const filePath = uuid() + file.name;
    try {
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (uploadError) {
        throw Error();
      }
      const { error: insertError } = await supabase
        .from("project_images")
        .insert({ project_id: projectId, path: filePath });
      if (insertError) {
        throw Error();
      }
      setTrigger(filePath);
    } catch (err) {
      toast({
        title: "Unable to upload images",
        variant: "destructive",
      });
    }
  };

  const toggleImagePrimary = async (id, check) => {
    if (check && images.find(({ isPrimary }) => isPrimary)) {
      toast({
        title: "Cannot have more than one primary image",
        variant: "destructive",
      });
      return;
    }
    const { error } = await supabase
      .from("project_images")
      .update({ is_primary: check })
      .eq("id", id);
    if (error) {
      toast({
        title: "Unable to update status, please try again",
        variant: "destructive",
      });
      return;
    }
    setTrigger(uuid());
  };

  const deleteImage = async ({ id, path }) => {
    const { error } = await supabase.storage.from("images").remove([path]);
    if (error) {
      toast({
        title: "Unable to delete image, please try again",
        variant: "destructive",
      });
      return;
    }
    const { error: deleteError } = await supabase
      .from("project_images")
      .delete()
      .eq("id", id);
    if (deleteError) {
      toast({
        title: "Unable to delete image, please try again",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Deleted image",
    });
    setTrigger(uuid());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Text size="5" weight={"medium"}>
          Images
        </Text>
        <Button onClick={triggerUpload}>Upload</Button>
        <input
          type="file"
          name="image"
          onChange={handleUpload}
          className="hidden"
          ref={inputRef}
          accept="image/png, image/jpeg"
        />
      </div>
      <Card>
        <CardContent className="min-h-[300px] ">
          <div className="pt-6 my-auto">
            {!images?.length ? (
              <div className="flex items-center justify-center">
                <Text>No images are added</Text>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {images.map(({ id, isPrimary, path, url }) => (
                  <div className="relative" key={id}>
                    <div className="absolute top-0 right-0 flex items-center gap-2 p-2 bg-slate-600">
                      <Label htmlFor="primary" className="">
                        Primary
                      </Label>
                      <Switch
                        checked={isPrimary}
                        onCheckedChange={(check) => {
                          toggleImagePrimary(id, check);
                        }}
                        id="primary"
                      />
                      <TrashIcon
                        color="red"
                        className="w-5 h-5 ml-2 cursor-pointer"
                        onClick={() => {
                          deleteImage({ id, path });
                        }}
                      />
                    </div>
                    <img src={url} className="h-72" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
