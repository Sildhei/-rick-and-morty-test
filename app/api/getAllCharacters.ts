export interface ICharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface IExtendedCharacterData {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: number | null;
  };
  results: ICharacterData[];
}

export interface getAllCharactersProps {
  page?: number;
  name?: string;
  status?: string;
}

export const getAllCharacters = async ({ page, name }: getAllCharactersProps) => {

  try {
    let url = `${process.env.BASE_URL}/character/?page=${page}`;
    if (name) {
      url += `&name=${name}`;
    }

    const res = await fetch(url, {
      method: 'GET',
      next: { tags: ['characters-data'] },
    });
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
