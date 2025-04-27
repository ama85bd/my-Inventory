import { TypeOf, boolean, number, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: 'First Name is required',
    }),
    phone: string({
      required_error: 'Phone no is required',
    }),
    fatherHusbandName: string({
      required_error: 'Father / Husband Name is required',
    }),
    motherName: string({
      required_error: 'Mother Name is required',
    }),
    image: string({
      required_error: 'Image is required',
    }),
    profession: string({
      required_error: 'Profession is required',
    }),
    designation: string({
      required_error: 'Profession is required',
    }),
    officeAddress: string({
      required_error: 'Profession is required',
    }),
    presentAddress: string({
      required_error: 'Present address is required',
    }),
    permanentAddress: string({
      required_error: 'Permanent address is required',
    }),
    expertiseFields: string({
      required_error: 'Expertise fields is required',
    }),
    isAdmin: boolean({
      required_error: 'isActive is required',
    }),
    isActive: boolean({
      required_error: 'isActive is required',
    }),
    isMember: boolean({
      required_error: 'isMember is required',
    }),
    isLifeMember: boolean({
      required_error: 'isLifeMember is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    confirmPassword: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
