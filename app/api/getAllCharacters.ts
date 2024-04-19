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
  created: Date;
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

export const getAllCharacters = async (page: number) => {
  try {
    console.log('pahe', page);
    const res = await fetch(`${process.env.BASE_URL}/character/?page=${page}`, {
      method: 'GET',
      next: { tags: ['characters-data'] },
    });
    console.log('res', res);
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
};
