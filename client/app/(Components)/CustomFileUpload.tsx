'use client';

import { useRef, useState } from 'react';

interface Props {
  label: string;
  accept: string;
  onFileSelect: (file: File) => void;
  variant?: 'dark' | 'light';
}

const CustomFileUpload = ({
  label,
  accept,
  onFileSelect,
  variant = 'light',
}: Props) => {
  const [filename, setFilename] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      onFileSelect(file);
    }
  };

  const styles = {
    label: variant === 'dark' ? 'text-white' : 'text-gray-700',
    input: 'hidden',
    button:
      variant === 'dark' ? 'bg-dark-300 text-white' : 'bg-gray-200 text-black',
  };

  return (
    <div className='mb-4'>
      <label
        htmlFor='custom-file-upload'
        className={`block mb-1 font-medium ${styles.label}`}
      >
        {label}
      </label>
      <input
        id='custom-file-upload'
        type='file'
        accept={accept}
        className={styles.input}
        ref={fileInputRef}
        onChange={handleChange}
      />
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className={`px-4 py-2 rounded ${styles.button}`}
      >
        Choose File
      </button>
      {filename && (
        <p className='mt-1 text-sm text-green-700'>Selected: {filename}</p>
      )}
    </div>
  );
};

export default CustomFileUpload;
