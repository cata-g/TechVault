'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Home', href: '/' },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href='/';
    };

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Toggle menu</span>
                        {mobileMenuOpen ? (
                            <XMarkIcon className="size-6" aria-hidden="true" />
                        ) : (
                            <Bars3Icon className="size-6" aria-hidden="true" />
                        )}
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button
                        onClick={handleLogout}
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600 transition"
                    >
                        Logout <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="lg:hidden px-6 pb-4 space-y-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left rounded-md px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    )
}
