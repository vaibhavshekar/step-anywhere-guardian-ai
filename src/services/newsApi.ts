
const NEWS_API_KEY = '092c3e4c0b414b9597c07d6eb3318fa1';
const NEWS_BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const searchCityNews = async (cityName: string): Promise<NewsResponse> => {
  try {
    const query = `${cityName} safety OR ${cityName} travel OR ${cityName} security OR ${cityName} crime`;
    const url = `${NEWS_BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data: NewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching city news:', error);
    throw error;
  }
};
