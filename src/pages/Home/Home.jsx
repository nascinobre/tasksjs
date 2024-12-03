import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  deleteTask,
  getTasks,
  newTask,
  updateTask,
} from "../../firebase/firestore";
import { useEffect, useState } from "react";

function Home() {
  const { autenticado } = useAuth();
  const { handleSubmit, register } = useForm();
  const [tarefas, setTarefas] = useState([]);

  async function carregartarefas() {
    const resultados = await getTasks();
    setTarefas(resultados);
  }

  async function adiconartarefa(dados) {
    await newTask(dados);
    carregartarefas();
  }

  async function removertarefa(id) {
    await deleteTask(id);
    carregartarefas();
  }

  async function editartarefa(id, task) {
    const status= window.prompt("digite status da tarefa", task.status)
    await updateTask(id, {status});
    carregartarefas();
  }

  useEffect(() => {
    carregartarefas();
  }, []);

  if (!autenticado) return <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <Container>
        <h1>Tarefas</h1>

        <table border="2">
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa?.status}</td>
                <td>{tarefa?.data}</td>
                <td>
                  <button onClick={()=>{removertarefa(tarefa.id)}}>excluir</button>
                </td>
                <td>
                  <button onClick={()=>{editartarefa(tarefa.id, tarefa)}}>editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={handleSubmit(adiconartarefa)}>
          <div>
            <label htmlFor="titulo">titulo</label>
            <input type="text" id="titulo" {...register("titulo")} />
          </div>
          <div>
            <label htmlFor="descricao">descricao</label>
            <input type="text" id="descricao" {...register("descricao")} />
          </div>
          <div>
            <label htmlFor="status">status</label>
            <input type="text" id="status" {...register("status")} />
          </div>
          <div>
            <label htmlFor="data">data</label>
            <input type="text" id="data" {...register("data")} />
          </div>

          <button>adicionar</button>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
