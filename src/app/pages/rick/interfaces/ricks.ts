export interface Ricks {
  info: Info;
  results: Rick[];
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Rick {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Species;
  location: Species;
  image: string;
  episode: string[];
  url: string;
  created: string;
  data?: Rick;
}

export interface Species {
  name: string;
  url: string;
}
