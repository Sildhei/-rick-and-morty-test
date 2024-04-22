import { act, fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { CharactersMock } from '../../__mocks__/CharactersMock';
import { getCharacterEpisodes } from '../../app/api/getCharacterEpisodes';
import EpisodesSection from '@/app/components/EpisodesSection/EpisodesSection';
import { EpisodesMock } from '@/__mocks__/EpisodesMock';
import { selectedCharactersMock } from '@/__mocks__/SelectedCharactersMock';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(CharactersMock),
  })
) as jest.Mock;

jest.mock('../../app/api/getCharacterEpisodes', () => ({
  getCharacterEpisodes: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: jest.fn(() => ({
    get: jest.fn(key => {
      const params = new URLSearchParams('page=8');
      return params.get(key);
    }),
  })),
}));

describe('Home', () => {
  beforeEach(async () => {
    render(await Home({ searchParams: { page: '8' } }));
  });

  //Se testea el correcto renderizado de los 3 títulos (Character #1, Character #2 y Select two characters to see their episodes..)
  it('Renderizado de HomePage', async () => {
    const headingElements = screen.getAllByRole('heading');
    await expect(headingElements).toHaveLength(3);
  });

  //Se testea que no se muestren los episodios al no haber personajes seleccionados
  it('Episodios no visibles', async () => {
    const episodesTitle = screen.queryByText('Rick Sanchez - Only Episodes');
    expect(episodesTitle).not.toBeInTheDocument();
  });

  //Se testea el renderizado de los nombres de los personajes del mock
  it('Muestro de personajes', async () => {
    const firstCharacter = screen.getByText('Rick Sanchez');
    const secondCharacter = screen.getByText('Morty Smith');
    expect(firstCharacter).toBeInTheDocument();
    expect(secondCharacter).toBeInTheDocument();
  });

  //Se testea que el número de página activa coincida con lo definido en searchParams(page: 8)
  it('Correcto paginado', async () => {
    const pagination = await screen.findByTestId('page-number');
    await expect(pagination.textContent).toEqual('8 of 42');
  });

  //Se testea que al seleccionar dos personajes se muestren los episodios
  it('Muestreo de episodios', async () => {
    const firstCharacter = screen.getByText('Rick Sanchez');
    const secondCharacter = screen.getByText('Morty Smith');

    act(() => {
      fireEvent.click(firstCharacter);
      fireEvent.click(secondCharacter);
      render(<EpisodesSection episodes={EpisodesMock} selectedCharacters={selectedCharactersMock}/>);
    });

    expect(getCharacterEpisodes).toHaveBeenCalled();
    expect(getCharacterEpisodes).toHaveBeenCalled();

    const firstCharacterEpisodesList = screen.getByText('Rick Sanchez - Only Episodes');
    expect(firstCharacterEpisodesList).toBeInTheDocument();
  });
});