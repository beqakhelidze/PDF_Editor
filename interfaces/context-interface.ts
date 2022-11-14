import { BallInterface } from './ball-interface';

export interface ContextInterface{
    coordinates: BallInterface[],
    setCoordinates: React.Dispatch<React.SetStateAction<BallInterface[]>>,
    uri: string,
    setUri: React.Dispatch<React.SetStateAction<string>>,
}