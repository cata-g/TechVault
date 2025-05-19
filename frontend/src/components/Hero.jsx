import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Hero() {
    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20">
                <div className="mx-auto max-w-7xl pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-10">
                    <div className="px-6 lg:px-0">
                        <div className="mx-auto max-w-2xl">
                            <div className="max-w-lg">
                                <div className="mt-24 sm:mt-32 lg:mt-16">
                                    <a href="#" className="inline-flex space-x-6">
                    <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                      New Courses
                    </span>
                                        <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                      <span>500+ happy students</span>
                      <ChevronRightIcon className="size-5 text-gray-400" aria-hidden="true" />
                    </span>
                                    </a>
                                </div>
                                <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                                    TechVault.
                                </h1>
                                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                                    Learn Coding the fun way
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <a
                                        href="#"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Join Now
                                    </a>
                                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                                        Our social media <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                        <div
                            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 md:-mr-20 lg:-mr-36"
                            aria-hidden="true"
                        />
                        <div className="shadow-lg md:rounded-3xl">
                            <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
                                <div
                                    className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-white ring-inset md:ml-20 lg:ml-36"
                                    aria-hidden="true"
                                />
                                <div className="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                                    <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                                        <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                                            <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                                <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                                    <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                                                        NotificationSetting.jsx
                                                    </div>
                                                    <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                                </div>
                                            </div>
                                            <div className="px-4 pt-6 pb-14">
                                                <pre className="text-sm text-white font-mono whitespace-pre-wrap">
                                                    <code>
                                                    <span className="text-indigo-400">function App</span>() &#123;<br/>
                                                        &nbsp;&nbsp;<span className="text-indigo-400">return</span> (<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">div</span> className="<span
                                                        className="text-emerald-300">App</span>"&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Navbar</span> /&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Router</span>&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Routes</span>&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Route</span> path="<span
                                                        className="text-emerald-300">/signup</span>" element=&lt;<span
                                                        className="text-indigo-400">SignupPage</span> /&gt; /&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Route</span> path="<span
                                                        className="text-emerald-300">/dashboard</span>" element=&lt;<span
                                                        className="text-indigo-400">Dashboard</span> /&gt; /&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Route</span> path="<span
                                                        className="text-emerald-300">/courses/:id</span>" element=&lt;<span
                                                        className="text-indigo-400">CoursePage</span> /&gt; /&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-indigo-400">Route</span> path="<span
                                                        className="text-emerald-300">/activities/:activityId</span>" element=&lt;<span
                                                        className="text-indigo-400">ActivityPage</span> /&gt; /&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-indigo-400">Routes</span>&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-indigo-400">Router</span>&gt;<br/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-indigo-400">div</span>&gt;<br/>
                                                        &nbsp;&nbsp;);<br/>
                                                        &#125;
                                                    </code>
                                                    </pre>

                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32"/>
            </div>
        </div>
    )
}
