import Input from './Input';
import viacepLogo from '../assets/viacep.png';
import Button from './Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ViaCEPService } from '../services/ViaCEPService';
import { useState } from 'react';

export default function SearchForm() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');

  const getAddresses = () => {
    const addresses = localStorage.getItem('addresses');
    if (addresses) {
      return JSON.parse(addresses);
    }
    return [];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    return ViaCEPService.getAddress(form.get('cep') as string);
  };

  const { data: addresses } = useQuery({
    queryFn: getAddresses,
    queryKey: ['addresses'],
  });

  const { mutate: searchAddress } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: (response) => {
      console.log('Address found:', response);
      localStorage.setItem(
        'addresses',
        JSON.stringify([...addresses, response]),
      );
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setErrorMessage('');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="ViaCEP Logo"
          src={viacepLogo}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Buscador de endereços
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e) => searchAddress(e)} className="space-y-6">
          <Input label="Nome de usuário" name="username" required />
          <Input label="Nome de exibição" name="nickname" required />
          <Input label="CEP" name="cep" required />
          <Button label="Buscar" type="submit" />
          {errorMessage && (
            <p className="text-sm text-red-700">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
