export function UserPanel() {
    return (
      <div className="w-1/6 bg-gray-200 flex flex-col">
        <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
          <h2 className="text-xl text-gray-600 font-semibold">My List</h2>
        </div>
        <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10 text-center">
          <p>No movies added</p>
        </div>
        <div className="text-center p-6 bg-gray-300">
          <button
            type="submit"
            className="bg-zinc-200 rounded-xl font-semibold p-1.5 mt-2 transition duration-300 ease-in-out hover:-translate-y-1"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }