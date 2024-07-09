import { useRef, useState } from "react";
import "./App.css";
import fundo from "./assets/fundo.png";
import fundoPc from "./assets/bg-pc.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function App() {
  const [names, setNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const addMoreButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const addName = () => {
    if (inputRef.current?.value) {
      const newName = inputRef.current.value.trim(); // Remove espaços em branco no início e no fim
      if (newName) {
        setNames((prevNames) => [...prevNames, newName]);
        inputRef.current.value = ""; // Limpa o campo de input após adicionar
        inputRef.current.focus(); // Foca novamente no input
      }
    } else {
      toast.error("Informe um familiar antes de incluir outro!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const removeName = (index: number) => {
    if (index === 0) return; // Não permite remover o primeiro nome

    toast.success("Familiar excluído com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previne o comportamento padrão do Enter (submit do form)
      if (addMoreButtonRef.current) {
        addMoreButtonRef.current.click(); // Simula o clique no botão de adicionar
      }
    }
  };

  const confirmarPresenca = () => {
    if (names.length === 0) {
      toast.error("Informe pelo menos um familiar antes de confirmar!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // Abre o diálogo de alerta
    onOpen();
  };

  return (
    <div className="bg-rosa-300 min-h-screen h-fit pb-20 xl:bg-rosa-500 xl:min-h-[100dvh] xl:py-8 xl:h-fit xl:flex xl:items-center xl:justify-center">
      <img
        className="fixed xl:hidden top-0 left-0 w-full h-screen z-0 bg-fixed bg-cover bg-no-repeat bg-center"
        src={fundo}
        alt=""
      />
      <img
        className="fixed brightness-50 hidden xl:block top-0 left-0 w-full h-screen z-0 bg-fixed bg-cover bg-no-repeat bg-center"
        src={fundoPc}
        alt=""
      />
      <ToastContainer />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar presença
            </AlertDialogHeader>

            <AlertDialogBody>
              Confirme se os nomes estão corretos:
              {names.map((name, index) => (
                <h1 key={index}>{name}</h1>
              ))}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Editar
              </Button>
              <Button colorScheme="green" onClick={onClose} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className="relative h-fit min-h-[100dvh] xl:h-fit xl:rounded-md xl:w-[30vw] xl:bg-rosa-300 z-10 w-full flex items-center justify-start flex-col py-8">
        <h1 className="text-center font-madina titulo text-rosa-500 xl:text-7xl font-thin w-[90%] text-8xl">
          Mariana
        </h1>
        <h3 className="idade text-rosa-500 text-4xl xl:text-2xl -mt-4">
          18 Anos
        </h3>
        <div className="bg-rosa-500 h-[1px] w-[90%] my-4">&nbsp;</div>

        <p className="text-rosa-500 seasons text-2xl xl:text-lg my-2">
          Rua Coroados, 275 - Cajamar/SP
        </p>
        <p className="text-rosa-500 text-3xl seasons xl:text-2xl my-2">19:00</p>

        <div className="bg-rosa-500 h-[1px] w-[90%] my-4">&nbsp;</div>
        <p className="seasons text-rosa-500 text-2xl xl:text-lg">
          Confirme sua presença abaixo:
        </p>

        {/* Render input fields based on names state */}
        <div className="flex flex-col items-center">
          {names.map((name, index) => (
            <div
              key={index}
              className="relative w-[90%] flex items-center my-2"
            >
              <input
                className="bg-[#e9c9c6] w-full px-4 py-2 outline-2 outline-rosa-500 placeholder:text-rosa-500 seasons text-2xl xl:text-lg rounded-md"
                type="text"
                placeholder={`Familiar ${index + 1}`}
                value={name}
                readOnly
              />
              {index !== 0 && ( // Mostra o ícone de lixeira apenas se não for o primeiro input
                <FaRegTrashAlt
                  className="text-red-700 text-2xl cursor-pointer absolute right-2 xl:-right-8"
                  onClick={() => removeName(index)}
                />
              )}
            </div>
          ))}

          <input
            ref={inputRef}
            className="bg-[#e9c9c6] w-[90%] px-4 py-2 my-4 outline-2 outline-rosa-500 placeholder:text-rosa-500 seasons text-2xl xl:text-lg rounded-md"
            type="text"
            placeholder="Digite o nome do familiar..."
            onKeyUp={onEnter}
          />
          <button
            ref={addMoreButtonRef}
            onClick={addName}
            className="text-xl xl:text-sm text-inter text-rosa-500 border-[1px] border-rosa-500 p-2 rounded-md hover:text-rosa-300 hover:bg-rosa-500 transition-all font-semibold"
          >
            + Adicionar pessoa
          </button>
        </div>

        <button
          onClick={confirmarPresenca}
          className="bg-rosa-500 w-[90%] my-4 py-4 text-rosa-300 seasons rounded-md text-3xl hover:opacity-70 active:translate-y-1 transition-all xl:text-lg xl:py-2"
        >
          Confirmar presença
        </button>
      </div>
    </div>
  );
}

export default App;
