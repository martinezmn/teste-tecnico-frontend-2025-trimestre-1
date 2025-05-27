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

  static getAddressTable() {
    const addresses = StorageService.listAddress();
    const cities = new Set<string>();
    const states = new Set<string>();
    const users = new Set<string>();
    addresses.forEach(({ username, address }) => {
      if (address.localidade) {
        cities.add(address.localidade);
      }
      if (address.estado) {
        states.add(address.estado);
      }
      if (username) {
        users.add(username);
      }
    });
    return {
      addresses,
      cities: Array.from(cities),
      states: Array.from(states),
      users: Array.from(users),
    };
  }
}
