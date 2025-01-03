export interface Location {
    lat: number;
    lon: number;
    timestamp?: string;
}
  
export const getGeolocation = (
    onSuccess: (location: Location, accuracy: number) => void,
    onError: (error: string) => void
  ): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const newLocation: Location = {
            lat: latitude,
            lon: longitude,
            timestamp: new Date().toISOString(),
          };
  
          onSuccess(newLocation, accuracy);
        },
        (error) => {
          onError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      onError("Geolocation is not supported by your browser.");
    }
};