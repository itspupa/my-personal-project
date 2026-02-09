export interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do',
    description: 'Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline\'s actions and understand their unique personalities.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
    description: 'Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to our lives.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Inspiration',
    title: 'Finding Motivation: How to Stay Inspired Through Life\'s Challenges',
    description: 'This article explores strategies to maintain motivation when faced with personal or professional challenges. From setting small goals to practicing mindfulness and self-care, discover ways to keep moving forward.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'The Science of the Cat\'s Purr: How It Benefits Cats and Humans Alike',
    description: 'Discover the fascinating science behind the cat\'s purr, including its potential healing properties for both cats and humans. Learn how this unique sound is produced and why it matters.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop',
    category: 'General',
    title: 'The Art of Cat Photography: Capturing Your Feline\'s Best Moments',
    description: 'Learn professional tips and tricks for photographing cats, from lighting techniques to capturing their playful personalities. Make your cat the star of every photo.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop',
    category: 'Cat',
    title: 'Caring for Senior Cats: A Guide to Their Golden Years',
    description: 'As cats age, their needs change. This comprehensive guide covers everything you need to know about caring for senior cats, from diet adjustments to health monitoring.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
];
