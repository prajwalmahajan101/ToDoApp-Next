import Link from 'next/link'

const AppBar = () => {
    return (
        <nav
            className="relative flex h-[100px] w-full shirnk-0 items-center
            px-5 bg-dark-layer-1 text-dark-gray-7"
        >
            <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
                <Link
                    href={'/dashboard'}
                    className={'flex-1 mx-auto min-w-[200]'}
                >
                    <h1 className={'text-3xl'}>To Do App</h1>
                </Link>

                <div className="hidden sm:flex  flex items-center space-x-4 flex-1 justify-end">
                    <div>
                        <a
                            href="https://github.com/prajwalmahajan101"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
                        >
                            Git Repo
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default AppBar
