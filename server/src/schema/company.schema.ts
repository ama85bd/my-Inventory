import { TypeOf, object, string } from 'zod';

const paramsGetCompanies = {
  params: object({
    isActive: string({
      required_error: 'Is Active is required',
    }),
  }),
};

export const getCompaniesSchema = object({
  ...paramsGetCompanies,
});

export type GetCompanies = TypeOf<typeof getCompaniesSchema>;
