import config from 'config';

export default async () => {
  const valide = await fetch(config.api + '/users/validation', {
    headers: {
      authorization: localStorage.getItem('@speech/token')
    }
  })

  const status = valide.status;
  return status === 401 ? false : true;
}