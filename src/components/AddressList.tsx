import { useQuery } from '@tanstack/react-query';
import { StorageService } from '../services/StorageService';

export default function AddressList() {
  const { data: addresses, isLoading } = useQuery({
    queryFn: StorageService.listAddress,
    queryKey: ['addresses'],
  });

  return (
    <div className="max-w-5xl mx-auto py-20">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <select>
          <option>Todos Usuários</option>
        </select>
        <select>
          <option>Todas Cidades</option>
        </select>
        <select>
          <option>Todos Estados</option>
        </select>
        <input
          type="text"
          className="p-2 border rounded-lg w-80"
          placeholder="Buscar por endereço"
        />
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Endereço
            </th>
            <th scope="col" className="px-6 py-3">
              Usuário
            </th>
            <th scope="col" className="px-6 py-3">
              CEP
            </th>
            <th scope="col" className="px-6 py-3">
              Cidade
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            addresses?.map((address, index) => (
              <tr key={index} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {address.label}
                </th>
                <td className="px-6 py-4">{address.username}</td>
                <td className="px-6 py-4">{address.address.cep}</td>
                <td className="px-6 py-4">{address.address.localidade}</td>
                <td className="px-6 py-4">{address.address.estado}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Editar
                  </a>
                  {', '}
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Excluir
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
