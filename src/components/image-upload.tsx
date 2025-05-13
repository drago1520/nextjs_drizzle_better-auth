'use client';

import * as React from 'react';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { uploadImage } from '@/utils/upload-image';
import { deleteImage } from '@/utils/delete-image';

type ImageUploadProps = {
  className?: string;
  /**
   * @description form.watch('imgUrl') if using react-hook-form
   */
  imgUrl: string;
  /**
   * @description form.setValues() || field.onChange if using react-hook-form
   */
  setImgUrl: (imgUrl: string) => void;
  imgUrlInputProps: React.ComponentProps<'input'>;
};

//TODO Toast error message
export default function ImageUpload({ className, imgUrl, setImgUrl, imgUrlInputProps }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgId, setImgId] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };
  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please use only .jpeg, .jpg, .webp, .png or .svg file types');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const result = await uploadImage([file]);

      if ('error' in result) {
        throw new Error(result.error);
      }

      // Update with server URL
      setImgUrl(result.imgUrl || '');
      setImgId(result.imgId || '');
    } catch (e) {
      //TODO Log to PostHog
      const err = e as Error;
      console.error(err);
      setError(err.name);
      setImgUrl('');
    } finally {
      setIsUploading(false);
    }
  };

  //TODO delete img from Cloudflare
  const handleRemoveImage = async () => {
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    const result = await deleteImage(imgId);
    if (!result.success) setError(result.error);
    setImgUrl('');
  };

  const handleAvatarClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await upload(file);
      if (fileInputRef.current) {
        // Create a new DataTransfer object and add our file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Set the files property of the input element
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        {/* prettier-ignore */}
        <Button 
          variant="secondary"
          type='button' 
          className={cn(
            'bg-input border-muted size-12 cursor-pointer rounded-full border-2 border-dashed p-0 transition-colors', 
            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/20 hover:border-muted-foreground',
            imgUrl && 'border-primary/50 border-solid', 
            isUploading && 'opacity-70', 
            className
          )} 
          disabled={isUploading} 
          onClick={handleAvatarClick}>
          <Avatar className="size-full">
            {isUploading ? (
              <div className="bg-muted/20 flex h-full w-full items-center justify-center">
                {/* TODO optimistic upload */}
                <Loader2 className="text-primary size-6 animate-spin" />
              </div>
            ) : (
              <>
                <AvatarImage src={imgUrl || ''} alt="Profile" />
                <AvatarFallback className="text-muted-foreground">
                  <Upload className="size-6" />
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </Button>

        {imgUrl && !isUploading && (
          <Button type="button" size="icon" variant="secondary" className="hover:bg-destructive absolute -right-1.5 -bottom-1 size-6 rounded-full hover:text-white" onClick={handleRemoveImage}>
            <X className="size-3" />
          </Button>
        )}

        {/* perf: don't send the image file to my backend again when submiting the form */}
        {!imgUrl && <Input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />}
        <Input type="hidden" disabled={isUploading} {...imgUrlInputProps} />
      </div>
      <p className="text-muted-foreground text-sm">
        {/* prettier-ignore */}
        {isUploading ? 'Uploading...' : isDragging ? 'Drop image here.' : error ? <span className="text-destructive">{error}</span> : 'Click or drag & drop to upload'}
      </p>
    </div>
  );
}
