import { DashBoardRepository } from "./dashBoardRepository"

export const DashBoardService = {
  data: async function () {
    const data = {
      produtos: await DashBoardRepository.produtosCount(),
      categorias: await DashBoardRepository.categoriasCount(),
      avaliacoes: await DashBoardRepository.avaliacoesCount(),
      carrinhos: await DashBoardRepository.avaliacoesCount()
    }
    
    return data
  }
}