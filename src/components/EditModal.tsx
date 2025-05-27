import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import type { Address } from '../interfaces/Address';
import Input from './Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StorageService } from '../services/StorageService';
import { useState } from 'react';

interface EditModalProps {
  address: Address & { index: number };
  onClose: () => void;
}

export default function EditModal(props: EditModalProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [addressLabel, setAddressLabel] = useState(props.address.label);

  const handleSubmit = async () => {
    if (!props.address) {
      throw new Error('Endereço não encontrado');
    }
    StorageService.editAddressLabel(props.address.index, addressLabel);
    props.onClose();
  };

  const handleDelete = async () => {
    if (!props.address) {
      throw new Error('Endereço não encontrado');
    }
    StorageService.deleteAddress(props.address.index);
    props.onClose();
  };

  const { mutate: deleteAddress } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const { mutate: saveAddress } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    props.address && (
      <Dialog
        open={!!props.address}
        onClose={props.onClose}
        className="relative z-10"
      >
        {errorMessage}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start">
                  <div className="mt-0 mx-4 w-full">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Editar endereço
                    </DialogTitle>
                    <div className="mt-5">
                      <Input
                        label="Nome de exibição"
                        name="label"
                        value={addressLabel || props.address.label}
                        onChange={setAddressLabel}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => deleteAddress()}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => saveAddress()}
                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-gray-300 ring-1 ring-inset hover:bg-gray-50 shadow-xs sm:ml-3 sm:w-auto"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={props.onClose}
                  className="mt-3 inline-flex w-full rounded-md px-3 py-2 text-sm font-semibold sm:mt-0"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  );
}
