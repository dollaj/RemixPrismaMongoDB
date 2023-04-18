import { Link } from "react-router-dom"

export default function Index() {
  return (
    <div className="h-screen w-full bg-slate-600 text-center">
      <p className="text-xs">tailwind funziona</p>
      <h2 className="text-2xl font-bold text-blue-300">welcome to Movie Mania!</h2>
      <button className="border-2 rounded-lg m-2 p-1 bg-white"><Link to={"/login"}>login</Link></button>
    </div>
  )
}
