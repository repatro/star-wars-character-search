export interface ISWCharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  films: Array<string>;
}

export interface ISWFilm {
  title: string;
  episode_id: number;
  url: string;
}

export interface IFetchedData {
  isLoading: boolean;
  error?: string;
  abortLoading?: () => void;
}

export interface IFetchedList<T> extends IFetchedData {
  list: Array<T>;
}

export interface IFetchedEntity<T> extends IFetchedData {
  entity?: T;
}
