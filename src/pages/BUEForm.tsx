
function BUEForm() {

    return (
        <>

            <form>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-9">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-white">Name</label>
                                <div className="mt-2">
                                    <input id="name" type="text" name="name" autoComplete="name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <label htmlFor="email-address" className="block text-sm/6 font-medium text-white">Email address</label>
                                <div className="mt-2">
                                    <input id="email-address" type="email" name="email-address" autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="phone" className="block text-sm/6 font-medium text-white">Phone number</label>
                                <div className="mt-2">
                                    <input id="phone" type="tel" name="phone" autoComplete="tel" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="age" className="block text-sm/6 font-medium text-white">Age</label>
                                <div className="mt-3">
                                    <input id="age" type="number" name="age" min="1" max="120" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-white">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                </div>
            </form>

        </>
    )
}

export default BUEForm
