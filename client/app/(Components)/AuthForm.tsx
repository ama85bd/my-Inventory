'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { FIELD_NAMES, FIELD_TYPES } from '../constant';
import CustomFileUpload from './CustomFileUpload';
import { useState } from 'react';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const isSignIn = type === 'SIGN_IN';

  const uploadFile = async () => {
    if (!file) return null;

    const timestamp = Date.now();
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
    const finalName = `${file.name.slice(
      0,
      file.name.lastIndexOf('.')
    )}_userID${timestamp}${fileExtension}`;

    const formData = new FormData();
    formData.append('file', file, finalName);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/notice/fileupload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer TOKEN`, // replace with real token
          'x-refresh': `REFRESH_TOKEN`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    return finalName;
  };

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const fileName = await uploadFile();
      const payload = { ...data, fileName };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/notice`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
    } catch (err: unknown) {
      console.log(err);
    }

    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: isSignIn
          ? 'You have successfully signed in.'
          : 'You have successfully signed up.',
      });

      router.push('/');
    } else {
      toast({
        title: `Error ${isSignIn ? 'signing in' : 'signing up'}`,
        description: result.error ?? 'An error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>
      <p className='text-light-100'>
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all fields and upload a valid university ID to gain access to the library'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-6'
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='capitalize'>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'image' ? (
                      <CustomFileUpload
                        label='Upload Notice Document'
                        accept='.jpg,.jpeg,.png,.pdf,.xlsx,.doc,.docx'
                        onFileSelect={setFile}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className='form-input'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type='submit' className='form-btn'>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      <p className='text-center text-base font-medium'>
        {isSignIn ? 'New to BookWise? ' : 'Already have an account? '}

        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className='font-bold text-primary'
        >
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};
export default AuthForm;
