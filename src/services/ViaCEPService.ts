import type { ViaCEPResponse } from '../interfaces/ViaCEPResponse';

export class ViaCEPService {
  private static readonly BASE_URL = 'https://viacep.com.br/ws';

  static async getAddress(cep: string): Promise<ViaCEPResponse> {
    const response = await fetch(`${this.BASE_URL}/${cep}/json/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}
