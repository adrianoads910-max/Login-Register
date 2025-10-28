import { LogIn } from "lucide-react"
import { List } from "lucide-react"
import { UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

export const HomePage = () => {
    return (
       <main>
         <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./banner.jpg')" }}>
        <div className="bg-[#ffffffcc] rounded-2xl shadow-2xl p-8 max-w-2xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">
          
          {/* Lado Esquerdo */}

          <div className="lg:w-1/2 p-4 flex flex-col items-center justify-center space-y-4">

            {/* <h3 className="text-lg font-semibold mb-4 text-gray-700">Bem vindo:</h3> */}

            <Link to="/register" className="w-full py-3 px-4 text-lg rounded-md bg-red-300 text-slate-950 hover:bg-red-600 hover:text-white transition shadow-md flex items-center justify-center gap-2"><UserPlus className="w-5 h-5" /> Cadastre-se</Link>

            <Link to="/login" className="w-full py-3 px-4 text-lg rounded-md bg-blue-300 text-slate-950 hover:bg-blue-600 hover:text-white transition shadow-md flex items-center justify-center gap-2"><LogIn className="w-5 h-5" /> Login</Link>

          </div>

          {/* Lado Direito */}

          <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Bem-vindo!</h2>
            <p className="text-gray-600">Cadastre-se, conecte-se. Faça login!</p>
          </div>
        </div>
    </div>

       </main>
    )

}