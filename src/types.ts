export interface ISWCharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
}

export interface IFetchedList<T> {
  list: Array<T>;
  isLoading: boolean;
  error?: string;
  abortLoading?: () => void;
}
