import api from './index';

// Types based on the API context
export interface Circuit {
  id: number;
  name: string;
  location: string;
}

export interface CircuitDetails {
  circuit: Circuit;
  fastestLaps: FastestLap[];
}

export interface FastestLap {
  driverName: string;
  teamName: string;
  lapTime: string;
  raceName: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  nationality: string;
  status: string;
  teamName: string;
}

export interface DriverDetails {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  nationality: string;
  raceWin: number;
  raceStart: number;
  dateOfBirth: string;
  imageUrl: string;
  debutYear: number;
  status: string;
  podiums: number;
  poles: number;
  fastestLaps: number;
  teamName: string;
}

export interface Team {
  id: number;
  name: string;
  country: string;
  foundedYear: number;
}

export interface TeamDetails {
  name: string;
  country: string;
  foundedYear: number;
  baseLocation: string;
  description: string;
  teamPrincipal: string;
  logoUrl: string;
  engineSuppliers: string;
  drivers: Driver[];
}

export interface Race {
  id: number;
  country: string;
  name: string;
  date: string;
  circuitName: string;
}

export interface RaceResult {
  id: number;
  position: number;
  points: number;
  gridPosition: number;
  status: string;
  lapsCompleted: number;
  fastestLap: number;
  pitStops: number;
  driverName: string;
  driverNumber: number;
  teamName: string;
  raceName: string;
  raceDate: string;
  circuitName: string;
  circuitLocation: string;
}

// Circuit API calls
export const circuitAPI = {
  getCircuits: () => api.get<Circuit[]>('/circuit'),
  // Fix: return the new structure for circuit details
  getCircuitDetails: (circuitId: number) => api.get('/circuit/details?circuitId=' + circuitId),
};

// Driver API calls
export const driverAPI = {
  getDrivers: (params?: { status?: string; nationality?: string; teamId?: number }) => 
    api.get<Driver[]>('/driver', { params }),
  getDriverDetails: (driverId: number) => 
    api.get<DriverDetails>(`/driver/details?driverId=${driverId}`),
  addDriver: (driver: any) => api.post('/driver', driver),
  updateDriver: (id: number, driver: any) => api.put(`/driver?id=${id}`, driver),
};

// Team API calls
export const teamAPI = {
  getTeams: () => api.get<Team[]>('/team'),
  getTeamDetails: (teamId: number) => 
    api.get<TeamDetails>(`/team/details?teamId=${teamId}`),
  addTeam: (team: any) => api.post('/team', team),
  updateTeam: (id: number, team: any) => api.put(`/team?id=${id}`, team),
};

// Race API calls
export const raceAPI = {
  getRacesByYear: (year: number) => 
    api.get<Race[]>(`/race/race-by-year?year=${year}`),
  getRacesByCircuit: (circuitId: number) => 
    api.get<Race[]>(`/race/race-by-circuit?circuitId=${circuitId}`),
};

// Race Result API calls
export const raceResultAPI = {
  getRaceResults: (raceId: number) => 
    api.get<RaceResult[]>(`/raceresult?raceId=${raceId}`),
  importRaceResults: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/raceresult/import-race-results', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 