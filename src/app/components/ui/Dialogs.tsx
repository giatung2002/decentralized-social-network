import React, { Fragment, ReactNode, ReactElement } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <HeadlessDialog as="div" className="relative z-10" onClose={() => onClose()}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {children}
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    )
  }
  
  export function DialogContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>
  }
  
  export function DialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="text-lg font-medium leading-6 text-gray-900">{children}</div>
  }
  
  export function DialogTitle({ children }: { children: React.ReactNode }) {
    return (
      <HeadlessDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        {children}
      </HeadlessDialog.Title>
    );
  }
  
  export function DialogTrigger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return <div onClick={onClick}>{children}</div>
  }