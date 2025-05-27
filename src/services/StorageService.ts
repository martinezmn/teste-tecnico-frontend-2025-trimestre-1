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
    const addresses = StorageService.listAddress();
    localStorage.setItem(ADDRESS_KEY, JSON.stringify([address, ...addresses]));
  }

  static editAddressLabel(index: number, label: string): void {
    const addresses = StorageService.listAddress();
    addresses[index].label = label;
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
  }

  static deleteAddress(index: number): void {
    const addresses = StorageService.listAddress();
    addresses.splice(index, 1);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
  }

  static getAddressTable() {
    const addresses = StorageService.listAddress();
    const cities = new Set<string>();
    const states = new Set<string>();
    const users = new Set<string>();
    console.log('pre');
    try {
      addresses.forEach((address) => {
        if (address.address.localidade) {
          cities.add(address.address.localidade);
        }
        if (address.address.estado) {
          states.add(address.address.estado);
        }
        if (address.username) {
          users.add(address.username);
        }
      });
    } catch (error) {
      console.error('Error processing addresses:', error);
    }
    return {
      addresses,
      cities: Array.from(cities),
      states: Array.from(states),
      users: Array.from(users),
    };
  }
}
