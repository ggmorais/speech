import config from 'config';

export default async () => {
  const token = localStorage.getItem('@speech/token');

  if (token.length < 10) return false;

  const valide = await fetch(config.api + '/users/validation', {
    headers: {
      authorization: token
    }
  })

  const status = valide.status;
  return status === 401 ? false : true;
}