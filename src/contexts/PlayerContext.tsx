import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex : number;
  isPlaying : boolean;
  isLooping : boolean;
  play:(episode : Episode) =>void;
  playList: (list:Episode[], index:number)=>void;
  togglePlay: () => void;
  toggleLoop: () => void;
  playNext: ()=>void;
  playPrevious : ()=>void;
  setPlayingState : (state: boolean) =>void;
  hasNext:boolean;
  hasPrevious:boolean;
};

type PlayerContextProviderProps= {
  children: ReactNode
}

export const PlayerContext = createContext( {} as PlayerContextData);


export function PlayerContextProvider( {children} : PlayerContextProviderProps){
  
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  function play (episode : Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function setPlayingState(state : boolean){
    setIsPlaying(state);
  }

  const hasPrevious = (currentEpisodeIndex - 1) >= 0;
  const hasNext = (currentEpisodeIndex +1) < episodeList.length;

  function playNext(){
    const nextEpisodeIndex = currentEpisodeIndex+1;

    if(hasNext)
      setCurrentEpisodeIndex(nextEpisodeIndex);
  }

  function playPrevious(){
    const previousEpisodeIndex = currentEpisodeIndex-1;
    
    if(hasPrevious)
      setCurrentEpisodeIndex(previousEpisodeIndex);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        play,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}


export const usePlayer = ()=> {
  return useContext(PlayerContext);
}