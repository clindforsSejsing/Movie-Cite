import fetch from "node-fetch";

const MovieApi = 'https://lernia-kino-cms.herokuapp.com/api';

export async function getMovies() {
  try{
  const response = await fetch(MovieApi + '/movies');
  const load = await response.json();
  return load.data;
  }catch{error}{
    console.log('Not working 😢');
  }
}

export async function movieID(id) {
  try{
  const res = await fetch(MovieApi + '/movies/' + id);
  const load = await res.json();
  return load.data;
  }catch(error){
    console.log('Not working 😢');
  }
}  