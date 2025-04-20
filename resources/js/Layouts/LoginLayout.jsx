import React from 'react';

export default function LoginLayout({ children }) {
    return (
        <div className="flex min-h-screen justify-center items-center bg-white sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className='hidden lg:flex w-2/3 items-center justify-center bg-white'>
                <img src="/images/login.svg" alt="ERP Illustrator" className='w-2/3'/>
                {/* <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div> */}
            </div>

            <div className='flex lg:min-h-screen w-[350px] md:w-[530px] lg:w-[670px] lg:mx-0 mx-10 flex-col justify-center items-center p-8 bg-primaryPurple rounded-xl lg:rounded-r-none'>
                <div className="mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                </div>
            </div>

        </div>

    );
}
