import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase"

export interface ImageMetadata {
  url: string
  caption?: string
  alt?: string
}

export interface ImageUploaderProps {
  images: ImageMetadata[]
  onChange: (images: ImageMetadata[]) => void
  maxImages?: number
}

export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      toast.error("Storage service not available")
      return
    }

    // Check if adding these files would exceed the max images limit
    if (images.length + acceptedFiles.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`)
      return
    }

    setUploading(true)
    const newImages: ImageMetadata[] = []

    try {
      for (const file of acceptedFiles) {
        // Create a unique file path using timestamp and original name
        const timestamp = new Date().getTime()
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase()
        const filePath = `article-images/${timestamp}-${cleanFileName}`

        // Upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("article-assets")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false
          })

        if (error) {
          throw error
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from("article-assets")
          .getPublicUrl(data.path)

        newImages.push({
          url: publicUrl,
          caption: "",
          alt: file.name,
        })
      }

      onChange([...images, ...newImages])
      toast.success("Images uploaded successfully")
    } catch (error) {
      console.error("Error uploading images:", error)
      toast.error("Failed to upload images. Please try again.")
    } finally {
      setUploading(false)
    }
  }, [images, onChange, maxImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"]
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || images.length >= maxImages
  })

  const updateMetadata = (index: number, field: keyof ImageMetadata, value: string) => {
    const updatedImages = [...images]
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value,
    }
    onChange(updatedImages)
  }

  const removeImage = async (index: number) => {
    const supabase = getSupabaseBrowserClient()
    const imageToRemove = images[index]
    
    try {
      // Extract the file path from the URL
      const url = new URL(imageToRemove.url)
      const filePath = url.pathname.split("/").slice(-2).join("/")

      // Delete the file from Supabase Storage
      if (supabase) {
        await supabase.storage
          .from("article-assets")
          .remove([filePath])
      }
    } catch (error) {
      console.error("Error removing image from storage:", error)
    }

    // Remove from state regardless of storage deletion success
    const updatedImages = images.filter((_, i) => i !== index)
    onChange(updatedImages)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : 
            images.length >= maxImages ? "border-gray-200 bg-gray-50 cursor-not-allowed" : 
            "border-gray-300 hover:border-primary"}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading images...</p>
        ) : images.length >= maxImages ? (
          <p className="text-gray-500">Maximum number of images reached</p>
        ) : isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag and drop images here, or click to select files</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="relative aspect-video">
              <Image
                src={image.url}
                alt={image.alt || ""}
                fill
                className="object-cover rounded"
              />
            </div>

            <div className="space-y-2">
              <div>
                <Label htmlFor={`alt-${index}`}>Alt Text</Label>
                <Input
                  id={`alt-${index}`}
                  value={image.alt || ""}
                  onChange={(e) => updateMetadata(index, "alt", e.target.value)}
                  placeholder="Describe the image"
                />
              </div>

              <div>
                <Label htmlFor={`caption-${index}`}>Caption</Label>
                <Textarea
                  id={`caption-${index}`}
                  value={image.caption || ""}
                  onChange={(e) => updateMetadata(index, "caption", e.target.value)}
                  placeholder="Add a caption"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 