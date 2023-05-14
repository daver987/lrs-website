export interface Tour {
  title: string
  body: string
  image: string
  altText: string
}

export const ourTours = [
  {
    id: 1,
    title: 'Niagara Falls',
    body: "Experience the breathtaking majesty of Niagara Falls, one of the world's most awe-inspiring natural wonders. A must-visit for anyone traveling to Toronto, let us transport you to this stunning site where the thunderous roar and vibrant beauty will create lasting memories.",
    iconName: 'game-icons:waterfall',
  },
  {
    id: 2,
    title: 'Niagara Winery Tour',
    body: "Indulge in the exquisite flavors of Niagara's renowned wineries with our exclusive wine tours. Partnering with the region's finest vineyards, we provide unforgettable experiences and lasting memories, ensuring a delightful day for wine connoisseurs and casual enthusiasts alike.",
    iconName:
      'streamline:food-drinks-cocktail-glass-cook-alcohol-food-cocktail-drink-cooking-alcoholic-beverage-glass',
  },
  {
    id: 3,
    title: 'Toronto City Tour',
    body: "Discover the vibrant sights and sounds of Toronto with our immersive city tours. Our knowledgeable guides will take you to the city's most iconic attractions and landmarks, ensuring an enriching and memorable experience that goes beyond the ordinary.",
    iconName: 'healthicons:city-outline',
  },
  {
    id: 4,
    title: 'Custom Tours',
    body: "For a personalized and intimate tour experience, let us create a tailor-made itinerary for your group or family. Whether it's a bachelor/bachelorette party, special celebration, or any other occasion, our custom tours provide the perfect transportation solution for a truly unforgettable experience.",
    iconName: 'icon-park-twotone:connection-point-two',
  },
]
