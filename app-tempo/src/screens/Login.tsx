import { useEffect } from "react";
import { UsuarioService } from "../service/CRUD";

const usuarioService = new UsuarioService

useEffect(() =>{

    usuarioService.listarTodos().then((response));
}[])