import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import WalletConnect from './WalletConnect';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Create AI Art', href: '/creating' },
  { name: 'Explore', href: '/explore' },
  { name: 'How it Works', href: '/how-it-works' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Docs', href: 'https://aryart.gitbook.io', target: '_blank', rel: 'noopener noreferrer' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AryArt</span>
            <img
              className="h-10 w-auto"
              src="/images/themes/aryart-logo.png"
              alt="AryArt Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              target={item.target}
              rel={item.rel}
              className="text-sm font-semibold leading-6 text-white hover:text-primary-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => window.open('https://app.uniswap.org', '_blank')}
              className="inline-flex items-center rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500"
            >
              Buy $Ary
            </button> */}
            <WalletConnect />
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AryArt</span>
              <img
                className="h-10 w-auto"
                src="/images/themes/aryart-logo.png"
                alt="AryArt Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    target={item.target}
                    rel={item.rel}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <div className="flex items-center gap-4">
                  {/* <button
                    onClick={() => window.open('https://app.uniswap.org', '_blank')}
                    className="w-full inline-flex items-center rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500"
                  >
                    Buy $Ary
                  </button> */}
                  <WalletConnect />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
