import { Entertainer } from '../types/entertainer';

export const API_URL = 'https://final-backend-tate-abefe0hyetajagbd.eastus-01.azurewebsites.net/Entertainer/Summary'; // <-- replace with your actual backend URL


export interface EntertainerSummary {
  entertainerID: number;
  entStageName: string;
  timesBooked: number;
  lastBookedDate: string | null;
}

export const fetchEntertainersSummary = async (): Promise<EntertainerSummary[]> => {
  const response = await fetch(`${API_URL}/summary`);
  if (!response.ok) throw new Error('Failed to fetch entertainer summary');
  return await response.json();
};



export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  const response = await fetch(`${API_URL}/GetAllEntertainers`);
  if (!response.ok) throw new Error('Failed to fetch entertainers');
  return await response.json();
};



export const addEntertainer = async (newEntertainer: Entertainer): Promise<Entertainer> => {
  const response = await fetch(`${API_URL}/AddEntertainer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEntertainer),
  });

  if (!response.ok) throw new Error('Failed to add entertainer');
  return await response.json();
};



export const updateEntertainer = async (
  entertainerID: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  const response = await fetch(`${API_URL}/UpdateEntertainer/${entertainerID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEntertainer),
  });

  if (!response.ok) throw new Error('Failed to update entertainer');
  return await response.json();
};



export const deleteEntertainer = async (entertainerID: number): Promise<void> => {
  const response = await fetch(`${API_URL}/DeleteEntertainer/${entertainerID}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete entertainer');
};
