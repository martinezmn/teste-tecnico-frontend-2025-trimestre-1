import Input from './Input';
import viacepLogo from '../assets/viacep.png';
import Button from './Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ViaCEPService } from '../services/ViaCEPService';
import { useState, type FormEvent } from 'react';
import { StorageService } from '../services/StorageService';
import type { Address } from '../interfaces/Address';

export default function SearchForm() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<Address> => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    target.reset();
    return {
      username: form.get('username') as string,
      label: form.get('nickname') as string,
      address: await ViaCEPService.getAddress(form.get('cep') as string),
    };
  };

  const { mutate: searchAddress } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: (response) => {
      setErrorMessage('');
      StorageService.addAddress(response);
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
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
