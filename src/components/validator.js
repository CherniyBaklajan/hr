const required = () => ({ handler: (value) => {
  if(!value) return {'error': 1, 'message': 'Обязательное поле'}
  return {'error': 0}
}});

export const validator = {
  required,
}
