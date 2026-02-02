// carousel.dto.ts
export type CarouselItemDto = {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  actionLabel: string
}


// carousel.mock.ts
export const CAROUSEL_ITEMS: CarouselItemDto[] = [
  {
    id: "1",
    title: "Grandmaster Weekly",
    subtitle: "Study the best games of the week",
    imageUrl: "/images/news1.jpg",
    actionLabel: "Read More",
  },
  {
    id: "2",
    title: "Daily Puzzle is Live",
    subtitle: "Can you find the winning move?",
    imageUrl: "/images/news2.jpg",
    actionLabel: "Solve Now",
  },
  {
    id: "3",
    title: "New Engine Update",
    subtitle: "Stronger AI and faster analysis",
    imageUrl: "/images/news3.jpg",
    actionLabel: "Check It Out",
  },
]
