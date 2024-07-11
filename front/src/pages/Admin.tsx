import { useEffect, useState } from "react";
import fundo from "../assets/bg-pc.jpg";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

type Convidados = {
  id: string
  nome: string
}

export default function Admin() {
  const [convidados, setConvidados] = useState<Convidados[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [textPesquisa, setTextPesquisa] = useState("");
  const [valuePesquisa, setValuePesquisa] = useState<Convidados[]>([]);

  function getConvidados() {
    axios
      .get(process.env.URL_BASE ?? "")
      .then((response) => {
        setConvidados(response.data);
        setValuePesquisa([]);
      })
      .then(() => setIsLoading(false))
      .catch((err) => console.error(err));
  }

  function deleteConvidado(id: string) {
    axios
      .delete(`${process.env.URL_BASE ?? ""}/${id}`)
      .then(() =>
        toast.success("Convidado excluído com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      )
      .then(() => getConvidados())
      .catch((err) => console.error(err));
  }

  function pesquisarConvidado() {
    axios
      .get(`${process.env.URL_BASE ?? ""}/pesquisa/${textPesquisa}`)
      .then((response) => setValuePesquisa(response.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getConvidados();
  }, []);

  let contentToRender;
  if (isLoading) {
    contentToRender = <Spinner />;
  } else if (textPesquisa !== "" && valuePesquisa.length > 0) {
    contentToRender = valuePesquisa.map((resultado, index) => (
      <div
        key={index}
        className="w-[90%] flex items-center justify-between my-2 border-[1px] border-rosa-500 px-2 py-2 rounded-md"
      >
        <p className="seasons font-bold text-2xl text-rosa-500">
          {resultado.nome ?? "Sem resultados."}
        </p>
        <FaRegTrashAlt
          className="text-red-700 text-2xl cursor-pointer"
          onClick={() => deleteConvidado(resultado.id)}
        />
      </div>
    ));
  } else {
    contentToRender = convidados.map((convidado, index) => (
      <div
        key={index}
        className="w-[90%] flex items-center justify-between my-2 border-[1px] border-rosa-500 px-2 py-2 rounded-md"
      >
        <p className="seasons font-bold text-2xl text-rosa-500">
          {convidado.nome ?? "Sem resultados"}
        </p>
        <FaRegTrashAlt
          className="text-red-700 text-2xl cursor-pointer"
          onClick={() => deleteConvidado(convidado.id)}
        />
      </div>
    ));
  }

  return (
    <div className="min-h-svh relative w-full flex items-center justify-center">
      <ToastContainer />
      <img
        className="fixed top-0 left-0 w-full h-screen z-0 bg-fixed bg-contain object-cover bg-no-repeat bg-center"
        src={fundo}
        alt=""
      />
      <div className="w-[80vw] min-h-[90dvh] shadow-sm bg-rosa-300 rounded-xl flex items-center justify-start py-4 px-2 flex-col z-10 relative">
        <h1 className="text-3xl font-semibold seasons text-rosa-500 text-center ">
          Verificar os convidados
        </h1>
        <p className="text-xl seasons font-bold text-rosa-500 my-2">
          Quantidade de convidados: {convidados.length}
        </p>
        <div className="flex items-center justify-between w-[90%] bg-rosa-400 my-4 py-3 px-2">
          <input
            value={textPesquisa}
            onChange={(e) => setTextPesquisa(e.target.value)}
            type="text"
            placeholder="Buscar por nome..."
            className="w-full bg-transparent text-rosa-500 placeholder:text-rosa-500 outline-none seasons text-2xl"
          />
          <FaSearch
            onClick={pesquisarConvidado}
            className="text-rosa-500 text-2xl bg-[#e9c9c6] w-10 h-10 p-1 rounded-md hover:opacity-75 active:translate-y-1 transition-all cursor-pointer"
          />
        </div>
        {contentToRender}
      </div>
    </div>
  );
}
