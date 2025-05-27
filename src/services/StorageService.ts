import type { Address } from '../interfaces/Address';

const ADDRESS_KEY = 'addresses';

export class StorageService {
  static listAddress(): Address[] {
    const addresses = localStorage.getItem(ADDRESS_KEY);
    if (addresses) {
      return JSON.parse(addresses);
    }
    return [];
  }

  static addAddress(address: Address): void {
    const addresses = this.listAddress();
    localStorage.setItem(ADDRESS_KEY, JSON.stringify([address, ...addresses]));
  }
}
