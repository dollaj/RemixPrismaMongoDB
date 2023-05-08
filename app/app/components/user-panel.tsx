import { Film } from "~/utilsMVS/Films"
import { SavedFilm } from "./user-saved-films"
import { prisma } from "~/utils/prisma.server";
import { getUserFilms } from "~/utils/users.server";

interface props {
  films: Film[]
}

export function UserPanel({ films }: props) {
    films = Array.from(films)
    return (
      <div className="w-1/6 bg-gray-200 flex flex-col">
        <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
          <h2 className="text-xl text-gray-600 font-semibold">Plan to Watch</h2>
        </div>
        <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10 text-center">
          {
            films.map(film => <SavedFilm film={film} className="h-24 w-24 mx-auto flex-shrink-0"/>)
          }
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