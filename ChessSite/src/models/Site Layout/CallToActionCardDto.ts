


export type CallToActionCardDto = {
  id: number
  title: string
  description: string
  siteDir: string
}


export const CALL_TO_ACTION_CARDS: CallToActionCardDto[] = [
  {
    id: 1,
    title: "Jogo Local",
    description: "Enfrente um amigo na mesma máquina e jogue sem limites.",
    siteDir: "/play/local",
  },
  {
    id: 2,
    title: "Contra o Computador",
    description: "Treine suas estratégias contra a A.I. em diferentes níveis.",
    siteDir: "/play/ai",
  },
  {
    id: 3,
    title: "Desafio Diário",
    description: "Resolva um novo desafio todos os dias e evolua seu jogo.",
    siteDir: "/challenges/daily",
  },
]
