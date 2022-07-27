import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const getAll = () => request.get(`${baseUrl}/data/games`);
