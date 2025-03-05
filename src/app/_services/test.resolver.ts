import { ResolveFn } from '@angular/router';

export const testResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
