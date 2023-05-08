import { Film } from "~/utilsMVS/Films"

interface props {
  film: Film
  className?: string
  onClick?: (...args: any) => any
}

export function SavedFilm({ film, onClick, className }: props) {
  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      <h2>
        {film.title.charAt(0).toUpperCase()}
      </h2>
    </div>
  )
}