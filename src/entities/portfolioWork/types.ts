export interface PortfolioWork {
  id: number;
  user_id: number;
  title: string;
  task?: string;
  solution?: string;
  image?: string;
  technologies?: string[];
  link?: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioWorkCreateRequest {
  title: string;
  task?: string;
  solution?: string;
  image?: string;
  technologies?: string[];
  link?: string;
}

export interface PortfolioWorkUpdateRequest {
  title?: string;
  task?: string;
  solution?: string;
  image?: string;
  technologies?: string[];
  link?: string;
}
