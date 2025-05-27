import type { ViaCEPResponse } from './ViaCEPResponse';

export interface Address {
  username: string;
  label: string;
  address: ViaCEPResponse;
}
