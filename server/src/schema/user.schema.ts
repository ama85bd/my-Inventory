import { TypeOf, boolean, number, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: 'First Name is required',
    }),
    phone: string({
      required_error: 'Phone no is required',
    }),
    username: string({
      required_error: 'Username is required',
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

export const createCompanySchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    address: string({
      required_error: 'Address no is required',
    }),
    type: string({
      required_error: 'Type is required',
    }),
    phone: string({
      required_error: 'Phone is required',
    }),
    country: string({
      required_error: 'Country is required',
    }),
    username: string({
      required_error: 'Country is required',
    }),
    currency: string({
      required_error: 'Country is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>;

export const createPermissionGroupSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
  }),
});

export type CreatePermissionGroupInput = TypeOf<
  typeof createPermissionGroupSchema
>;

export const createUserGroupSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
  }),
});

export type CreateUserGroupInput = TypeOf<typeof createUserGroupSchema>;
