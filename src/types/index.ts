export interface InfoProps {
  properties: PropertiesProps;
  geometry?: GeometryProps;
}

export interface GeometryProps {
  type: string;
  coordinates: number[];
}

export interface PropertiesProps {
  cluster: boolean;
  name: string;
  free_bikes: number;
  address: string;
}

export interface ViewportTypes {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}
